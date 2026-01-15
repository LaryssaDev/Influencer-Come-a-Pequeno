import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-gray-800">
      <div 
        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
