import React, { useState } from 'react';
import { Plus, Calendar, Clock, User, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

interface TreatmentPlan {
  id: string;
  patientName: string;
  condition: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  medications: string[];
  nextAppointment: string;
}

const treatmentPlans: TreatmentPlan[] = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    condition: 'Hypertension Management',
    startDate: '2024-01-01',
    endDate: '2024-06-01',
    status: 'active',
    progress: 65,
    medications: ['Lisinopril 10mg', 'Hydrochlorothiazide 25mg'],
    nextAppointment: '2024-01-20'
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    condition: 'Diabetes Type 2 Control',
    startDate: '2023-12-15',
    endDate: '2024-12-15',
    status: 'active',
    progress: 40,
    medications: ['Metformin 500mg', 'Glipizide 5mg'],
    nextAppointment: '2024-01-18'
  },
  {
    id: '3',
    patientName: 'Emma Davis',
    condition: 'Asthma Management',
    startDate: '2023-11-01',
    endDate: '2024-05-01',
    status: 'active',
    progress: 80,
    medications: ['Albuterol Inhaler', 'Fluticasone 110mcg'],
    nextAppointment: '2024-01-25'
  }
];

export default function TreatmentPlanning() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showNewPlanForm, setShowNewPlanForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Treatment Planning</h2>
        <button 
          onClick={() => setShowNewPlanForm(true)}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Treatment Plan</span>
        </button>
      </div>

      {/* Treatment Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {treatmentPlans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            {/* Plan Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{plan.patientName}</h3>
                  <p className="text-sm text-gray-600">{plan.condition}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(plan.status)}`}>
                {plan.status}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">{plan.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getProgressColor(plan.progress)}`}
                  style={{ width: `${plan.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Plan Details */}
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{plan.startDate} - {plan.endDate}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span>Next: {plan.nextAppointment}</span>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Medications:</p>
                <div className="space-y-1">
                  {plan.medications.map((med, index) => (
                    <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-2 mb-1">
                      {med}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-2">
              <button className="flex-1 text-sm bg-blue-50 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors">
                View Details
              </button>
              <button className="flex-1 text-sm bg-gray-50 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
                Edit Plan
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Mark Milestone</p>
              <p className="text-sm text-gray-600">Update treatment progress</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Add Notes</p>
              <p className="text-sm text-gray-600">Document observations</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Flag Concern</p>
              <p className="text-sm text-gray-600">Report complications</p>
            </div>
          </button>
        </div>
      </div>

      {/* Treatment Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Treatment Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            'Hypertension Protocol',
            'Diabetes Management',
            'Post-Surgery Care',
            'Chronic Pain Management'
          ].map((template, index) => (
            <button key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-left">
              <p className="font-medium text-gray-900">{template}</p>
              <p className="text-sm text-gray-600 mt-1">Standard care protocol</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}