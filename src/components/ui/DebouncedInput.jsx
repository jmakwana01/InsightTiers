import React, { useState,useRef, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

export const DebouncedInput = ({
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
    debounceTime = 500,
    className = ''
  }) => {
    const [localValue, setLocalValue] = useState(value);
    const debouncedValue = useDebounce(localValue, debounceTime);
    const isInitialMount = useRef(true);
    
    // Update local value when the prop value changes, but not on first render
    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }
      
      if (value !== parseFloat(localValue)) {
        setLocalValue(value);
      }
    }, [value]);
    
    // Fire onChange only after debounce and if the value has changed
    useEffect(() => {
      if (!isInitialMount.current && debouncedValue !== value) {
        onChange({ target: { value: debouncedValue } });
      }
    }, [debouncedValue]);
    
    const handleChange = (e) => {
      const newValue = e.target.value;
      setLocalValue(newValue);
    };
    
    return (
      <div className={`mb-6 ${className}`}>
        {label && (
          <label className="block text-gray-700 mb-2 font-medium">{label}</label>
        )}
        <div className="relative">
          <input
            type={type}
            value={localValue}
            onChange={handleChange}
            min={min}
            max={max}
            step={step}
            placeholder={placeholder}
            className={`w-full p-3 border ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'} rounded-lg focus:ring-2 focus:border-transparent transition-all ${suffix ? 'pr-14' : 'pr-3'} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
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