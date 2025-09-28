import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Plus,
  Filter,
  Search,
  User,
  Phone,
} from "lucide-react";
import api from "../api/api"; // Import our central API client

// --- 1. Define the shape of the data coming from the backend ---
interface PatientStub {
  _id: string;
  name: string;
  phone?: string;
}

interface Appointment {
  _id: string;
  patient: PatientStub;
  date: string;
  time: string;
  type: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  duration: number;
  notes?: string;
}

// Helper to get today's date in YYYY-MM-DD format
const getTodayString = () => {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const adjustedToday = new Date(today.getTime() - offset * 60 * 1000);
  return adjustedToday.toISOString().split("T")[0];
};

export default function AppointmentManagement() {
  // --- 2. Set up all necessary state variables ---
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<string>(getTodayString());
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [showNewAppointment, setShowNewAppointment] = useState(false);

  // --- 3. Fetch data when the component loads, or when date/search changes ---
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          date: selectedDate,
          search: searchTerm || undefined,
        };
        const { data } = await api.get<Appointment[]>("/doctor/appointments", {
          params,
        });
        setAppointments(data);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to fetch appointments."
        );
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchAppointments();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [selectedDate, searchTerm]);

  // --- 4. Handler functions for CRUD operations ---
  const handleUpdateStatus = async (
    appointmentId: string,
    newStatus: Appointment["status"]
  ) => {
    try {
      setAppointments(
        appointments.map((apt) =>
          apt._id === appointmentId ? { ...apt, status: newStatus } : apt
        )
      );
      await api.put(`/doctor/appointments/${appointmentId}`, {
        status: newStatus,
      });
    } catch (error) {
      console.error("Failed to update status", error);
      // You could add logic here to revert the state if the API call fails
    }
  };

  // --- Helper functions and constants for rendering ---
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const timeSlots = [
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  const quickStats = {
    total: appointments.length,
    confirmed: appointments.filter((apt) => apt.status === "confirmed").length,
    pending: appointments.filter((apt) => apt.status === "pending").length,
    avgDuration: Math.round(
      appointments.reduce((acc, apt) => acc + apt.duration, 0) /
        appointments.length || 0
    ),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Appointment Management
        </h2>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === "calendar"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              Calendar
            </button>
          </div>
          <button
            onClick={() => setShowNewAppointment(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* Date Selector and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="text-sm text-gray-600">
              {quickStats.total} appointments scheduled
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="p-8 text-center">Loading appointments...</div>
      )}
      {error && <div className="p-8 text-center text-red-600">{error}</div>}

      {!loading && !error && viewMode === "list" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col items-center w-20">
                        <div className="text-lg font-bold text-gray-900">
                          {appointment.time}
                        </div>
                        <div className="text-xs text-gray-500">
                          {appointment.duration}min
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {appointment.patient.name}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-3 h-3 mr-1" />
                            {appointment.patient.phone || "N/A"}
                          </div>
                          <span className="text-sm text-gray-600">
                            {appointment.type}
                          </span>
                        </div>
                        {appointment.notes && (
                          <p className="text-sm text-gray-500 mt-1">
                            {appointment.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStatus(appointment._id, "cancelled")
                          }
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                No appointments for this day.
              </div>
            )}
          </div>
        </div>
      )}

      {!loading && !error && viewMode === "calendar" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 gap-2">
            {timeSlots.map((time) => {
              const appointment = appointments.find((apt) => apt.time === time);
              return (
                <div
                  key={time}
                  className="flex items-center border-b border-gray-100 py-3"
                >
                  <div className="w-20 text-sm font-medium text-gray-600">
                    {time}
                  </div>
                  <div className="flex-1">
                    {appointment ? (
                      <div
                        className={`p-3 rounded-lg border-l-4 ${
                          appointment.status === "confirmed"
                            ? "border-green-500 bg-green-50"
                            : appointment.status === "pending"
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-gray-500 bg-gray-50"
                        }`}
                      >
                        <p className="font-medium text-gray-900">
                          {appointment.patient.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {appointment.type} • {appointment.duration}min
                        </p>
                      </div>
                    ) : (
                      <div className="p-3 border-2 border-dashed border-gray-200 rounded-lg text-center">
                        <button className="text-sm text-gray-500 hover:text-blue-600">
                          + Available
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Today's Total</p>
              <p className="text-lg font-bold text-gray-900">
                {quickStats.total}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-lg font-bold text-gray-900">
                {quickStats.confirmed}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-lg font-bold text-gray-900">
                {quickStats.pending}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Avg Duration</p>
              <p className="text-lg font-bold text-gray-900">
                {quickStats.avgDuration}min
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
