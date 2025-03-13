import React from 'react';

export const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  min,
  max,
  step,
  placeholder = '',
  suffix,
  helpText,
  error,
  className = ''
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      {label && (
        <label className="block text-gray-700 mb-2 font-medium">{label}</label>
      )}
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className={`w-full p-3 border ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'} rounded-lg focus:ring-2 focus:border-transparent transition-all pr-${suffix ? '14' : '3'}`}
        />
        {suffix && (
          <div className="absolute right-3 top-3 text-gray-500">{suffix}</div>
        )}
      </div>
      {helpText && (
        <div className="mt-2 text-sm text-gray-500">{helpText}</div>
      )}
      {error && (
        <div className="mt-2 text-sm text-red-500">{error}</div>
      )}
    </div>
  );
};
