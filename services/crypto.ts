import { PBKDF2_ITERATIONS, AES_TAG_LENGTH, SALT_LENGTH, IV_LENGTH } from '../constants';

export class CryptoService {
  static generateSalt(): Uint8Array {
    return window.crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  }

  static generateIV(): Uint8Array {
    return window.crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  }

  static async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );

    return window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: PBKDF2_ITERATIONS,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  static async encryptData(
    data: ArrayBuffer,
    password: string
  ): Promise<{ cipherText: ArrayBuffer; iv: Uint8Array; salt: Uint8Array }> {
    const salt = this.generateSalt();
    const iv = this.generateIV();
    const key = await this.deriveKey(password, salt);

    const cipherText = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
        tagLength: AES_TAG_LENGTH,
      },
      key,
      data
    );

    return { cipherText, iv, salt };
  }

  static async decryptData(
    cipherText: ArrayBuffer,
    password: string,
    iv: Uint8Array,
    salt: Uint8Array
  ): Promise<ArrayBuffer> {
    const key = await this.deriveKey(password, salt);

    try {
      return await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv,
          tagLength: AES_TAG_LENGTH,
        },
        key,
        cipherText
      );
    } catch {
      throw new Error('Decryption failed. Incorrect password or tampered data.');
    }
  }

  static arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let index = 0; index < bytes.byteLength; index += 1) {
      binary += String.fromCharCode(bytes[index]);
    }
    return window.btoa(binary);
  }

  static base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let index = 0; index < binaryString.length; index += 1) {
      bytes[index] = binaryString.charCodeAt(index);
    }
    return bytes;
  }
}