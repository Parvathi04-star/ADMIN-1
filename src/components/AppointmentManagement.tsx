import React, { useState } from 'react';
import { Calendar, Clock, Plus, Filter, Search, User, Phone, MapPin } from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  date: string;
  time: string;
  type: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  duration: number;
  notes?: string;
}

const appointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    patientPhone: '+1 (555) 123-4567',
    date: '2024-01-15',
    time: '09:00',
    type: 'Consultation',
    status: 'confirmed',
    duration: 30,
    notes: 'Follow-up for hypertension'
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    patientPhone: '+1 (555) 234-5678',
    date: '2024-01-15',
    time: '10:30',
    type: 'Check-up',
    status: 'confirmed',
    duration: 45,
    notes: 'Diabetes monitoring'
  },
  {
    id: '3',
    patientName: 'Emma Davis',
    patientPhone: '+1 (555) 345-6789',
    date: '2024-01-15',
    time: '11:45',
    type: 'Lab Review',
    status: 'pending',
    duration: 15,
    notes: 'Discuss blood work results'
  },
  {
    id: '4',
    patientName: 'James Wilson',
    patientPhone: '+1 (555) 456-7890',
    date: '2024-01-15',
    time: '14:00',
    type: 'Consultation',
    status: 'confirmed',
    duration: 30,
    notes: 'New patient consultation'
  }
];

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

export default function AppointmentManagement() {
  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [showNewAppointment, setShowNewAppointment] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAppointments = appointments.filter(apt => apt.date === selectedDate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Appointment Management</h2>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Calendar
            </button>
          </div>
          <button 
            onClick={() => setShowNewAppointment(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
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
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="text-sm text-gray-600">
              {filteredAppointments.length} appointments scheduled
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search appointments..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'list' ? (
        /* List View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-bold text-gray-900">{appointment.time}</div>
                      <div className="text-xs text-gray-500">{appointment.duration}min</div>
                    </div>
                    
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-3 h-3 mr-1" />
                          {appointment.patientPhone}
                        </div>
                        <span className="text-sm text-gray-600">{appointment.type}</span>
                      </div>
                      {appointment.notes && (
                        <p className="text-sm text-gray-500 mt-1">{appointment.notes}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Calendar View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 gap-2">
            {timeSlots.map((time) => {
              const appointment = filteredAppointments.find(apt => apt.time === time);
              return (
                <div key={time} className="flex items-center border-b border-gray-100 py-3">
                  <div className="w-20 text-sm font-medium text-gray-600">{time}</div>
                  <div className="flex-1">
                    {appointment ? (
                      <div className={`p-3 rounded-lg border-l-4 ${
                        appointment.status === 'confirmed' ? 'border-green-500 bg-green-50' :
                        appointment.status === 'pending' ? 'border-yellow-500 bg-yellow-50' :
                        'border-gray-500 bg-gray-50'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{appointment.patientName}</p>
                            <p className="text-sm text-gray-600">{appointment.type} • {appointment.duration}min</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 border-2 border-dashed border-gray-200 rounded-lg text-center">
                        <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Today's Total</p>
              <p className="text-lg font-bold text-gray-900">{filteredAppointments.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-lg font-bold text-gray-900">
                {filteredAppointments.filter(apt => apt.status === 'confirmed').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-lg font-bold text-gray-900">
                {filteredAppointments.filter(apt => apt.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Avg Duration</p>
              <p className="text-lg font-bold text-gray-900">
                {Math.round(filteredAppointments.reduce((acc, apt) => acc + apt.duration, 0) / filteredAppointments.length || 0)}min
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}