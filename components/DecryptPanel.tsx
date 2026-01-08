import React, { useState } from 'react';
import { FileText, Key, Lock, Unlock } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

const MOCK_FILES = [
  { id: '1', name: 'confidential_Q1_report.pdf', date: '2023-10-24', size: '2.4 MB' },
  { id: '2', name: 'user_database_backup.sql', date: '2023-10-23', size: '156 MB' },
  { id: '3', name: 'secrets.env', date: '2023-10-20', size: '4 KB' },
];

export const DecryptPanel: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);

  const handleDecrypt = async () => {
    setIsDecrypting(true);
    setTimeout(() => {
      setIsDecrypting(false);
      alert('Decryption simulation complete. In a real app, the file would download now.');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card title="Encrypted Vault">
            <div className="overflow-hidden rounded-lg border border-slate-700">
              <table className="min-w-full bg-slate-800/50">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Filename</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {MOCK_FILES.map(file => (
                    <tr
                      key={file.id}
                      className={`transition-colors cursor-pointer ${selectedFile === file.id ? 'bg-primary/10' : 'hover:bg-slate-700/50'}`}
                      onClick={() => setSelectedFile(file.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-200 flex items-center">
                        <FileText className="h-4 w-4 mr-3 text-slate-500" />
                        {file.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{file.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{file.size}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {selectedFile === file.id && <Lock className="h-4 w-4 text-primary ml-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Decrypt Selection" className="h-full">
            <div className="flex flex-col h-full justify-between space-y-6">
              <div>
                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 mb-6">
                  <p className="text-sm text-slate-400 mb-1">Selected File</p>
                  <p className="text-lg font-medium text-white truncate">
                    {selectedFile ? MOCK_FILES.find(file => file.id === selectedFile)?.name : 'No file selected'}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Decryption Password</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="password"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="Enter password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      disabled={!selectedFile}
                    />
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full h-12"
                disabled={!selectedFile || !password}
                onClick={handleDecrypt}
                isLoading={isDecrypting}
              >
                <Unlock className="h-4 w-4 mr-2" />
                Unseal & Download
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};