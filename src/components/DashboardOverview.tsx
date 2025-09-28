import React, { useState, useEffect } from "react";
import { Users, Calendar, Clock, AlertCircle } from "lucide-react";
import api from "../api/api"; // Import our central API client

// --- 1. Define the shape of our data with TypeScript interfaces ---

interface Stat {
  value: number;
  change: string;
  changeType: "positive" | "negative" | "warning";
}

interface AppointmentInSchedule {
  _id: string;
  time: string;
  type: string;
  status: string;
  patient: {
    name: string;
  };
}

interface ActivityLog {
  _id: string;
  message: string;
  createdAt: string; // The backend sends a Date string
}

interface DashboardData {
  stats: {
    totalPatients: Stat;
    todaysAppointments: Stat;
    pendingReviews: Stat;
    criticalAlerts: Stat;
  };
  todaysSchedule: AppointmentInSchedule[];
  recentActivities: ActivityLog[];
}

// --- Helper function to format time from the Activity Log ---
const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

export default function DashboardOverview() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await api.get<DashboardData>(
          "/doctor/dashboard/dashboard-summary"
        );
        setDashboardData(data);
      } catch (err: any) {
        console.error("Failed to fetch dashboard data:", err);
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching data."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // --- Create an array for the stat cards from the fetched data object ---
  // This allows us to keep the .map() in the JSX and not change the UI structure.
  const statCards = dashboardData
    ? [
        {
          title: "Total Patients",
          data: dashboardData.stats.totalPatients,
          icon: Users,
          color: "blue",
        },
        {
          title: "Today's Appointments",
          data: dashboardData.stats.todaysAppointments,
          icon: Calendar,
          color: "green",
        },
        {
          title: "Pending Reviews",
          data: dashboardData.stats.pendingReviews,
          icon: Clock,
          color: "yellow",
        },
        {
          title: "Critical Alerts",
          data: dashboardData.stats.criticalAlerts,
          icon: AlertCircle,
          color: "red",
        },
      ]
    : [];

  if (loading)
    return <div className="text-center p-8">Loading Dashboard...</div>;
  if (error)
    return <div className="text-center p-8 text-red-600">Error: {error}</div>;
  if (!dashboardData)
    return <div className="text-center p-8">No dashboard data available.</div>;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.data.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span
                  className={`text-sm font-medium ${
                    stat.data.changeType === "positive"
                      ? "text-green-600"
                      : stat.data.changeType === "negative"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {stat.data.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  from last week
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Today's Schedule
            </h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {dashboardData.todaysSchedule.map((appointment) => (
              <div
                key={appointment._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-gray-900">
                    {appointment.time}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {appointment.patient.name}
                    </p>
                    <p className="text-xs text-gray-500">{appointment.type}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    appointment.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {dashboardData.recentActivities.map((activity) => (
              <div key={activity._id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatTimeAgo(activity.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
