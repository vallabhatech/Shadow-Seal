# Shadow Seal

Shadow Seal is a secure data sealing system. It performs client-side AES-GCM encryption before uploading data to the server. The server stores the encrypted blobs in MongoDB GridFS and adds an HMAC signature to prevent tampering.

## Architecture

- **Frontend**: React + Tailwind + Web Crypto API.
- **Backend**: Node.js + Express + MongoDB (GridFS).
- **Security**:
  - **Client**: PBKDF2 key derivation (240k iterations), AES-GCM (256-bit key).
  - **Server**: JWT Auth, Rate Limiting, Server-side HMAC signing of metadata.

## Installation

### Prerequisites
- Node.js (v18+)
- MongoDB running locally or Atlas URI

### Setup

1. **Server**
   ```bash
   cd server
   npm install
   cp .env.example .env
   npm start
   ```

2. **Client**
   ```bash
   # In project root
   npm install
   npm start
   ```

## API Documentation

### POST /api/auth/register
Registers a new user.
Body: `{ "username": "user", "password": "pwd" }`

### POST /api/encrypt
Uploads an encrypted file blob.
Headers: `Authorization: Bearer <token>`
Form-Data: 
- `file`: (Binary encrypted data)
- `iv`: Base64 string
- `salt`: Base64 string
- `originalName`: string

## Security Features

1. **Zero-Knowledge Storage**: The server never sees the plaintext password or the unencrypted file content.
2. **Tamper Detection**: Metadata is signed with a server secret. If the database is compromised and metadata changed, signature verification fails.
3. **Anomaly Detection**: Logs repeated failures or high-frequency requests.
