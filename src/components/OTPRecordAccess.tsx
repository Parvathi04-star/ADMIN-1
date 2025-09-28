import React, { useState, useEffect } from "react";
import {
  Shield,
  Key,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
} from "lucide-react";
import api from "../api/api"; // Import our central API client

// --- 1. Define the shape of the data from the backend ---
interface PatientStub {
  _id: string;
  name: string;
}

// This will represent the recent sharing requests
interface AccessRequest {
  _id: string;
  patient: PatientStub;
  requestingDoctor: { name: string }; // Assuming population
  status: "pending" | "verified" | "expired"; // Matching the backend model
  createdAt: string;
}

export default function OTPRecordAccess() {
  // --- 2. Set up all necessary state variables ---
  const [patients, setPatients] = useState<PatientStub[]>([]);
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State for the OTP generation form
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");

  // State for the verification step
  const [shareId, setShareId] = useState<string | null>(null);
  const [otpInput, setOtpInput] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // --- 3. Fetch initial data (patients and recent requests) ---
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // You would typically fetch your patients and recent share requests here
        const patientRes = await api.get<PatientStub[]>("/doctor/patients");
        setPatients(patientRes.data);
        // We'll need a new backend endpoint to fetch recent share requests. For now, we'll leave this part.
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to fetch initial data."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // --- 4. Handler Functions for the OTP Workflow ---
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId) {
      alert("Please select a patient.");
      return;
    }
    try {
      const { data } = await api.post("/doctor/sharing/request-otp", {
        patientId: selectedPatientId,
      });
      setShareId(data.shareId); // Save the shareId for the next step
      alert("OTP has been sent to the patient!");
      setAccessToken(null); // Clear any old access token
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shareId || otpInput.length !== 6) {
      alert(
        "Please ensure an OTP has been requested and a 6-digit code is entered."
      );
      return;
    }
    try {
      const permissions = ["labs", "prescriptions", "history"]; // Example permissions
      const { data } = await api.post("/doctor/sharing/verify-otp", {
        shareId,
        otp: otpInput,
        permissions,
      });
      setAccessToken(data.accessToken); // Success! We have the token.
      setOtpInput("");
      setShareId(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid or expired OTP.");
    }
  };

  // --- Helper functions for styling ---
  const getStatusIcon = (status: string) => {
    /* ... */
  };
  const getStatusColor = (status: string) => {
    /* ... */
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              OTP Record Access
            </h2>
            <p className="text-gray-600">
              Secure patient record access management
            </p>
          </div>
        </div>
      </div>

      {/* OTP Generator Card */}
      <form
        onSubmit={handleRequestOtp}
        className="bg-white rounded-xl shadow-sm border p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Generate Access OTP
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patient Name
            </label>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="" disabled>
                Select patient...
              </option>
              {patients.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          {/* Access Purpose input can be added here if needed */}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Generate & Send OTP</span>
          </button>
        </div>
      </form>

      {/* Access Requests (This would be populated by another API call) */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Recent Access Requests</h3>
        </div>
        {/* You would map over the 'requests' state here */}
        <div className="p-6 text-center text-gray-500">
          Recent requests list would appear here.
        </div>
      </div>

      {/* OTP Verification */}
      <form
        onSubmit={handleVerifyOtp}
        className="bg-white rounded-xl shadow-sm border p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Verify Access OTP
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          After the patient receives the OTP and gives it to you, enter it
          below.
        </p>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              disabled={!shareId} // Input is disabled until an OTP is requested
              className="w-full px-3 py-2 border rounded-lg text-center text-lg font-mono tracking-wider disabled:bg-gray-100"
              maxLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={!shareId}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
          >
            Verify
          </button>
        </div>
        {accessToken && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-800">
              Success! Secure Access Token Generated:
            </h4>
            <code className="block break-all text-sm text-green-700 mt-2">
              {accessToken}
            </code>
            <p className="text-xs text-green-600 mt-2">
              You can now share this token with the authorized party. It is
              valid for 24 hours.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
