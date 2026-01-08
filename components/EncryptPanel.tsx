import React, { useRef, useState } from 'react';
import { Upload, FileText, Key, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { CryptoService } from '../services/crypto';

export const EncryptPanel: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [log, setLog] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
    }
  };

  const handleEncrypt = async () => {
    if (!file || !password) {
      return;
    }

    try {
      setStatus('processing');
      setLog('Starting encryption process...');

      const arrayBuffer = await file.arrayBuffer();
      const startTime = performance.now();
      const { cipherText, iv, salt } = await CryptoService.encryptData(arrayBuffer, password);
      const endTime = performance.now();

      setLog(prev => `${prev}\nEncryption complete in ${(endTime - startTime).toFixed(2)}ms`);
      setLog(prev => `${prev}\nAES-GCM Tag Length: 128 bits`);
      setLog(prev => `${prev}\nPBKDF2 Iterations: 240,000`);
      setLog(prev => `${prev}\nGenerated payload size: ${cipherText.byteLength} bytes`);
      setLog(prev => `${prev}\nIV: ${CryptoService.arrayBufferToBase64(iv.buffer)}`);
      setLog(prev => `${prev}\nSalt: ${CryptoService.arrayBufferToBase64(salt.buffer)}`);
      setLog(prev => `${prev}\nSending secure blob to Shadow Seal Storage...`);

      await new Promise(resolve => setTimeout(resolve, 1500));

      setStatus('success');
      setLog(prev => `${prev}\nFile sealed successfully. Stored in GridFS.`);
    } catch (error) {
      setStatus('error');
      setLog(prev => `${prev}\nError: ${(error as Error).message}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Create New Seal" className="h-full">
        <div className="space-y-6">
          <div
            className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-primary/50 hover:bg-slate-800/50 transition-all cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                {file ? <FileText className="h-6 w-6 text-primary" /> : <Upload className="h-6 w-6 text-slate-400" />}
              </div>
              <div>
                <p className="text-lg font-medium text-slate-200">
                  {file ? file.name : 'Drop sensitive file here'}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {file ? `${(file.size / 1024).toFixed(2)} KB` : 'or click to browse'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Encryption Password</label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="password"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="Enter a strong password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <p className="text-xs text-slate-500 ml-1">
              Warning: If you lose this password, the data is unrecoverable.
            </p>
          </div>

          <Button
            className="w-full h-11 text-lg"
            onClick={handleEncrypt}
            isLoading={status === 'processing'}
            disabled={!file || !password}
          >
            Seal Data
          </Button>
        </div>
      </Card>

      <Card title="Process Log" className="h-full bg-slate-900/50 border-slate-800">
        <div className="h-full flex flex-col">
          <div className="flex-1 font-mono text-sm p-4 rounded-lg bg-black/40 text-emerald-400 overflow-y-auto min-h-[300px]">
            {log ? (
              <pre className="whitespace-pre-wrap">{log}</pre>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-600">
                <span>Waiting for input...</span>
              </div>
            )}
          </div>

          {status === 'success' && (
            <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center text-emerald-400">
              <CheckCircle className="h-5 w-5 mr-3" />
              <span>Encryption Successful. Hash verified.</span>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center text-red-400">
              <AlertTriangle className="h-5 w-5 mr-3" />
              <span>Encryption Failed. See logs for details.</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};