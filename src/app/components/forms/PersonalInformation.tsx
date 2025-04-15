import React from "react";
import { personalInformation, FormErrors } from '../../types';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon, MapPinIcon } from '@heroicons/react/24/solid';

interface PersonalInformationProps {
  formData: personalInformation;
  errors?: FormErrors;
  setFormData: React.Dispatch<React.SetStateAction<personalInformation>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PersonalInformation({
  formData,
  errors = {},
  setFormData,
  handleInputChange,
}: PersonalInformationProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl shadow-xl border border-white/20 backdrop-blur-sm space-y-8 max-w-3xl mx-auto transform transition-all duration-300 hover:shadow-2xl">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          User Information
        </h2>
        <p className="text-gray-500/90 text-sm font-medium">
          Let's get to know you better. Please provide your details below.
        </p>
      </div>

      <div className="space-y-6">
        {/* First Name */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-200 to-blue-100 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-all duration-300"></div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserCircleIcon className={`h-6 w-6 ${errors.firstName ? 'text-red-400' : 'text-gray-400'} transition-colors`} />
            </div>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`block w-full pl-12 pr-4 py-4 text-lg border-2 ${
                errors.firstName 
                  ? "border-red-300 focus:border-red-500" 
                  : "border-gray-200/80 focus:border-purple-500"
              } rounded-xl bg-white/50 focus:bg-white/80 placeholder-gray-400/80 focus:ring-0 transition-all duration-200`}
              placeholder="First Name"
              required
            />
            {errors.firstName && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <ExclamationCircleIcon className="h-6 w-6 text-red-500 animate-pulse" />
              </div>
            )}
          </div>
          {errors.firstName && (
            <p className="mt-2 ml-2 text-sm text-red-600 flex items-center gap-1 animate-fade-in">
              <ExclamationCircleIcon className="h-4 w-4" />
              {errors.firstName}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-200 to-blue-100 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-all duration-300"></div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserCircleIcon className={`h-6 w-6 ${errors.lastName ? 'text-red-400' : 'text-gray-400'} transition-colors`} />
            </div>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`block w-full pl-12 pr-4 py-4 text-lg border-2 ${
                errors.lastName 
                  ? "border-red-300 focus:border-red-500" 
                  : "border-gray-200/80 focus:border-purple-500"
              } rounded-xl bg-white/50 focus:bg-white/80 placeholder-gray-400/80 focus:ring-0 transition-all duration-200`}
              placeholder="Last Name"
              required
            />
            {errors.lastName && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <ExclamationCircleIcon className="h-6 w-6 text-red-500 animate-pulse" />
              </div>
            )}
          </div>
          {errors.lastName && (
            <p className="mt-2 ml-2 text-sm text-red-600 flex items-center gap-1 animate-fade-in">
              <ExclamationCircleIcon className="h-4 w-4" />
              {errors.lastName}
            </p>
          )}
        </div>

        {/* Province */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-200 to-blue-100 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-all duration-300"></div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPinIcon className={`h-6 w-6 ${errors.province ? 'text-red-400' : 'text-gray-400'} transition-colors`} />
            </div>
            <input
              id="province"
              name="province"
              type="text"
              value={formData.province}
              onChange={handleInputChange}
              className={`block w-full pl-12 pr-4 py-4 text-lg border-2 ${
                errors.province 
                  ? "border-red-300 focus:border-red-500" 
                  : "border-gray-200/80 focus:border-purple-500"
              } rounded-xl bg-white/50 focus:bg-white/80 placeholder-gray-400/80 focus:ring-0 transition-all duration-200`}
              placeholder="Province"
              required
            />
            {errors.province && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <ExclamationCircleIcon className="h-6 w-6 text-red-500 animate-pulse" />
              </div>
            )}
          </div>
          {errors.province && (
            <p className="mt-2 ml-2 text-sm text-red-600 flex items-center gap-1 animate-fade-in">
              <ExclamationCircleIcon className="h-4 w-4" />
              {errors.province}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}