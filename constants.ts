export const API_BASE_URL = 'http://localhost:5000/api'; // Adjust for production
export const PBKDF2_ITERATIONS = 240000;
export const AES_TAG_LENGTH = 128;
export const SALT_LENGTH = 16;
export const IV_LENGTH = 12;

export const MOCK_LOGS = [
  { id: '1', timestamp: new Date().toISOString(), action: 'LOGIN', status: 'SUCCESS', ip: '192.168.1.101', deviceId: 'dev_8x92', anomalyLevel: 'LOW' },
  { id: '2', timestamp: new Date(Date.now() - 100000).toISOString(), action: 'ENCRYPT', status: 'SUCCESS', ip: '192.168.1.101', deviceId: 'dev_8x92' },
  { id: '3', timestamp: new Date(Date.now() - 200000).toISOString(), action: 'DECRYPT', status: 'FAILURE', ip: '45.32.11.9', deviceId: 'dev_unknown', details: 'Invalid MAC', anomalyLevel: 'HIGH' },
  { id: '4', timestamp: new Date(Date.now() - 250000).toISOString(), action: 'DECRYPT', status: 'FAILURE', ip: '45.32.11.9', deviceId: 'dev_unknown', details: 'Rate limit exceeded', anomalyLevel: 'CRITICAL' },
];
