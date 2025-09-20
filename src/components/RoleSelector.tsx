import React from 'react';
import { Shield, Stethoscope } from 'lucide-react';

interface RoleSelectorProps {
  selectedRole: 'ADMIN' | 'DOCTOR';
  onRoleChange: (role: 'ADMIN' | 'DOCTOR') => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onRoleChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Select Your Role</h3>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onRoleChange('ADMIN')}
          className={`
            relative flex flex-col items-center justify-center p-5 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
            ${selectedRole === 'ADMIN' 
              ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg' 
              : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-md'
            }
          `}
        >
          <Shield className="w-7 h-7 mb-2" />
          <span className="text-sm font-semibold">Admin</span>
          {selectedRole === 'ADMIN' && (
            <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></div>
          )}
        </button>
        
        <button
          type="button"
          onClick={() => onRoleChange('DOCTOR')}
          className={`
            relative flex flex-col items-center justify-center p-5 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
            ${selectedRole === 'DOCTOR' 
              ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-lg' 
              : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-md'
            }
          `}
        >
          <Stethoscope className="w-7 h-7 mb-2" />
          <span className="text-sm font-semibold">Doctor</span>
          {selectedRole === 'DOCTOR' && (
            <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;