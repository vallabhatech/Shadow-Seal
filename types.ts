export enum AnomalyLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface LogEntry {
  id: string;
  timestamp: string;
  action: 'ENCRYPT' | 'DECRYPT' | 'LOGIN' | 'REGISTER' | 'TAMPER_DETECTED';
  status: 'SUCCESS' | 'FAILURE';
  ip: string;
  deviceId: string;
  details?: string;
  anomalyLevel?: AnomalyLevel;
}

export interface AuthState {
  token: string | null;
  user: {
    id: string;
    username: string;
  } | null;
}

export interface EncryptedSeal {
  id: string;
  filename: string;
  createdAt: string;
  ownerId: string;
  size: number;
}

export interface EncryptResult {
  cipherText: ArrayBuffer;
  iv: Uint8Array;
  salt: Uint8Array;
}
