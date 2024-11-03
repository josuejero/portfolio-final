// src/components/common/Loading.tsx
'use client';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-gray-600 dark:text-gray-300">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default Loading;