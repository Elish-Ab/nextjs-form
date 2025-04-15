"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear any remaining form data
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8FF] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="animate-bounce">
          <CheckCircleIcon className="mx-auto h-24 w-24 text-green-500" />
        </div>
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Submission Successful!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for submitting your company information. We have received all your files and data successfully.
          </p>
        </div>
        <div className="mt-8">
          <button
            onClick={() => router.push('/')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Start New Submission
          </button>
        </div>
      </div>
    </div>
  );
} 