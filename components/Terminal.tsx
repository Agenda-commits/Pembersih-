
import React, { useEffect, useRef } from 'react';
import { SecurityLog } from '../types';

interface TerminalProps {
  logs: SecurityLog[];
}

export const Terminal: React.FC<TerminalProps> = ({ logs }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="bg-black/80 border border-green-900 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm mb-6 shadow-2xl shadow-green-900/20">
      {logs.map((log) => (
        <div key={log.id} className="mb-1 flex gap-2">
          <span className="text-gray-500">[{log.timestamp}]</span>
          <span className={`${
            log.type === 'error' ? 'text-red-500' : 
            log.type === 'warn' ? 'text-yellow-500' : 
            log.type === 'success' ? 'text-blue-400' : 'text-green-500'
          }`}>
            {log.type.toUpperCase()}:
          </span>
          <span className="text-gray-300">{log.message}</span>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};
