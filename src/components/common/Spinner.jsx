import React from 'react';

const Spinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizes[size]} border-4 border-[#00ff00]/20 border-t-[#00ff00] rounded-full animate-spin shadow-[0_0_30px_rgba(0,255,0,0.1)]`}></div>
    </div>
  );
};

export default Spinner;