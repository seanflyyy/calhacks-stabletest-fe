import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-96 w-96">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple"></div>
    </div>
  );
};

export default Loading;