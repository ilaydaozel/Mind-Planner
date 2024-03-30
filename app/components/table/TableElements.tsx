import React from 'react';

export const Th = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </div>
  );
};


export const Td = ({ children }: { children: React.ReactNode }) => {
    return <div className="px-6 py-4 whitespace-nowrap">{children}</div>;
  };

  
  
