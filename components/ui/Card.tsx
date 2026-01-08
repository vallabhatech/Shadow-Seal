import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-dark-card border border-slate-700 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm bg-opacity-80 ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/50">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};