import React, { useState } from 'react';
import { Shield, Key, Clock, CheckCircle, AlertCircle, Send } from 'lucide-react';

interface AccessRequest {
  id: string;
  patientName: string;
  requestedBy: string;
  purpose: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'denied' | 'expired';
  otp?: string;
}

const accessRequests: AccessRequest[] = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    requestedBy: 'Dr. Michael Smith',
    purpose: 'Emergency consultation',
    timestamp: '2024-01-15 14:30',
    status: 'pending'
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    requestedBy: 'Nurse Jennifer Lee',
    purpose: 'Lab results review',
    timestamp: '2024-01-15 13:15',
    status: 'approved',
    otp: '847291'
  },
  {
    id: '3',
    patientName: 'Emma Davis',
    requestedBy: 'Dr. Robert Wilson',
    purpose: 'Treatment planning',
    timestamp: '2024-01-15 12:00',
    status: 'expired'
  }
];

export default function OTPRecordAccess() {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [otpInput, setOtpInput] = useState('');
  const [showOTPGenerator, setShowOTPGenerator] = useState(false);

  const handleGenerateOTP = (requestId: string) => {
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`Generated OTP for request ${requestId}: ${otp}`);
    setShowOTPGenerator(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'denied':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'expired':
        return <Clock className="w-4 h-4 text-gray-400" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'denied':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">OTP Record Access</h2>
            <p className="text-gray-600">Secure patient record access management</p>
          </div>
        </div>
      </div>

      {/* OTP Generator Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Generate Access OTP</h3>
          <Key className="w-5 h-5 text-blue-600" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Select patient...</option>
              <option value="sarah">Sarah Johnson</option>
              <option value="michael">Michael Chen</option>
              <option value="emma">Emma Davis</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Access Purpose</label>
            <input
              type="text"
              placeholder="e.g., Emergency consultation"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Send className="w-4 h-4" />
            <span>Generate OTP</span>
          </button>
        </div>
      </div>

      {/* Access Requests */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Access Requests</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {accessRequests.map((request) => (
            <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-sm font-medium text-gray-900">{request.patientName}</h4>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      <span className="ml-1 capitalize">{request.status}</span>
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Requested by:</span> {request.requestedBy}
                    </div>
                    <div>
                      <span className="font-medium">Purpose:</span> {request.purpose}
                    </div>
                    <div>
                      <span className="font-medium">Time:</span> {request.timestamp}
                    </div>
                  </div>
                  
                  {request.otp && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Key className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">OTP: </span>
                        <code className="text-lg font-mono font-bold text-blue-900 tracking-wider">{request.otp}</code>
                        <span className="text-xs text-blue-600">(Valid for 15 minutes)</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {request.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleGenerateOTP(request.id)}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Approve
                      </button>
                      <button className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Deny
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OTP Verification */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Verify Access OTP</h3>
        
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg font-mono tracking-wider"
              maxLength={6}
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}