import React from 'react';
import { AlertOctagon, CheckCircle, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card } from './ui/Card';
import { AnomalyLevel } from '../types';
import { MOCK_LOGS } from '../constants';

const data = [
  { name: '00:00', success: 40, fail: 2 },
  { name: '04:00', success: 30, fail: 1 },
  { name: '08:00', success: 20, fail: 8 },
  { name: '12:00', success: 27, fail: 3 },
  { name: '16:00', success: 18, fail: 12 },
  { name: '20:00', success: 23, fail: 5 },
];

export const LogsPanel: React.FC = () => {
  const getStatusIcon = (status: string, level?: AnomalyLevel) => {
    if (level === AnomalyLevel.CRITICAL || level === AnomalyLevel.HIGH) {
      return <AlertOctagon className="text-red-500 h-5 w-5" />;
    }

    if (status === 'FAILURE') {
      return <XCircle className="text-orange-400 h-5 w-5" />;
    }

    return <CheckCircle className="text-emerald-500 h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Anomaly Detection" className="lg:col-span-2">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Bar dataKey="success" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fail" fill="#ef4444" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fail > 10 ? '#ef4444' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Security Overview">
          <div className="space-y-4">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-red-400 text-sm font-medium">Critical Anomalies</span>
                <AlertOctagon className="h-5 w-5 text-red-500" />
              </div>
              <span className="text-2xl font-bold text-white">2</span>
              <p className="text-xs text-slate-400 mt-1">Last 24 hours</p>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-400 text-sm font-medium">Total Operations</span>
                <CheckCircle className="h-5 w-5 text-blue-500" />
              </div>
              <span className="text-2xl font-bold text-white">148</span>
              <p className="text-xs text-slate-400 mt-1">Encrypted: 1.2 GB</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Access Logs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 text-sm">
                <th className="pb-3 pl-2">Status</th>
                <th className="pb-3">Timestamp</th>
                <th className="pb-3">Action</th>
                <th className="pb-3">IP Address</th>
                <th className="pb-3">Device Fingerprint</th>
                <th className="pb-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {MOCK_LOGS.map(log => (
                <tr key={log.id} className="text-sm text-slate-300 hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 pl-2">{getStatusIcon(log.status, log.anomalyLevel as AnomalyLevel)}</td>
                  <td className="py-4 font-mono text-xs">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="py-4 font-medium text-white">{log.action}</td>
                  <td className="py-4 text-slate-400 font-mono text-xs">{log.ip}</td>
                  <td className="py-4 text-slate-400 font-mono text-xs">{log.deviceId}</td>
                  <td className="py-4">
                    {log.anomalyLevel ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {log.anomalyLevel}
                      </span>
                    ) : (
                      <span className="text-slate-500">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};