import React, { useState } from 'react';
import { Shield, Activity, Lock, Unlock } from 'lucide-react';
import { Button } from './ui/Button';
import { EncryptPanel } from './EncryptPanel';
import { DecryptPanel } from './DecryptPanel';
import { LogsPanel } from './LogsPanel';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'encrypt' | 'decrypt' | 'logs'>('encrypt');

  return (
    <div className="flex h-screen bg-dark overflow-hidden">
      <aside className="w-64 bg-dark-card border-r border-slate-700 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center space-x-3 border-b border-slate-700">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Shadow Seal</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('encrypt')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'encrypt' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
          >
            <Lock className="h-5 w-5" />
            <span>New Seal</span>
          </button>

          <button
            onClick={() => setActiveTab('decrypt')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'decrypt' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
          >
            <Unlock className="h-5 w-5" />
            <span>Decrypt</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'logs' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
          >
            <Activity className="h-5 w-5" />
            <span>Security Logs</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
            <div className="h-8 w-8 rounded-full bg-slate-600 flex items-center justify-center">
              <span className="text-xs font-bold">AD</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-emerald-400 flex items-center">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1" />
                Secure Session
              </p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 md:hidden flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Shadow Seal</span>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="ghost" onClick={() => setActiveTab('encrypt')}>
                <Lock className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setActiveTab('decrypt')}>
                <Unlock className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setActiveTab('logs')}>
                <Activity className="h-4 w-4" />
              </Button>
            </div>
          </header>

          <div className="space-y-6">
            {activeTab === 'encrypt' && <EncryptPanel />}
            {activeTab === 'decrypt' && <DecryptPanel />}
            {activeTab === 'logs' && <LogsPanel />}
          </div>
        </div>
      </main>
    </div>
  );
};