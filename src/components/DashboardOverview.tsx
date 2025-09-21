import React from 'react';
import { Users, Calendar, Clock, TrendingUp, Activity, AlertCircle } from 'lucide-react';

const stats = [
  {
    title: 'Total Patients',
    value: '1,247',
    change: '+12%',
    changeType: 'positive',
    icon: Users,
    color: 'blue'
  },
  {
    title: "Today's Appointments",
    value: '18',
    change: '+3',
    changeType: 'positive',
    icon: Calendar,
    color: 'green'
  },
  {
    title: 'Pending Reviews',
    value: '7',
    change: '-2',
    changeType: 'negative',
    icon: Clock,
    color: 'yellow'
  },
  {
    title: 'Critical Alerts',
    value: '3',
    change: '+1',
    changeType: 'warning',
    icon: AlertCircle,
    color: 'red'
  }
];

const recentActivities = [
  { id: 1, patient: 'Sarah Johnson', action: 'Completed consultation', time: '10 minutes ago', type: 'consultation' },
  { id: 2, patient: 'Michael Chen', action: 'Lab results reviewed', time: '25 minutes ago', type: 'lab' },
  { id: 3, patient: 'Emma Davis', action: 'Prescription updated', time: '1 hour ago', type: 'prescription' },
  { id: 4, patient: 'James Wilson', action: 'Appointment scheduled', time: '2 hours ago', type: 'appointment' },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last week</span>
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
            <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { time: '09:00 AM', patient: 'Sarah Johnson', type: 'Consultation', status: 'confirmed' },
              { time: '10:30 AM', patient: 'Michael Chen', type: 'Follow-up', status: 'confirmed' },
              { time: '11:45 AM', patient: 'Emma Davis', type: 'Check-up', status: 'pending' },
              { time: '02:00 PM', patient: 'James Wilson', type: 'Consultation', status: 'confirmed' },
              { time: '03:30 PM', patient: 'Lisa Brown', type: 'Lab Review', status: 'confirmed' },
            ].map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-gray-900">{appointment.time}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{appointment.patient}</p>
                    <p className="text-xs text-gray-500">{appointment.type}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  appointment.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.patient}</p>
                  <p className="text-xs text-gray-500">{activity.action}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}