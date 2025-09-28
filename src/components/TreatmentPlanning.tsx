import React, { useState, useEffect } from "react";
import {
  Plus,
  Calendar,
  Clock,
  User,
  FileText,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import api from "../api/api"; // Import our central API client

// --- 1. Define the shape of the data from the backend ---
interface PatientStub {
  _id: string;
  name: string;
}

interface AppointmentStub {
  _id: string;
  date: string;
  time: string;
}

interface TreatmentPlan {
  _id: string;
  patient: PatientStub;
  condition: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "paused";
  progress: number;
  medications: string[];
  nextAppointment?: AppointmentStub;
}

interface TreatmentTemplate {
  _id: string;
  name: string;
  condition: string;
}

export default function TreatmentPlanning() {
  // --- 2. Set up state for live data ---
  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>([]);
  const [templates, setTemplates] = useState<TreatmentTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State to manage the create/edit modal
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<TreatmentPlan | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [plansRes, templatesRes] = await Promise.all([
        api.get<TreatmentPlan[]>("/doctor/treatment-plans"),
        api.get<TreatmentTemplate[]>("/doctor/treatment-plans/templates"),
      ]);
      setTreatmentPlans(plansRes.data);
      setTemplates(templatesRes.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to fetch treatment data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Handler for a Quick Action (e.g., Mark Milestone) ---
  const handleUpdateProgress = async (plan: TreatmentPlan) => {
    // This would typically open a modal to input the new progress
    // For this example, we'll just increment by 10
    const newProgress = Math.min(plan.progress + 10, 100);
    try {
      setTreatmentPlans((plans) =>
        plans.map((p) =>
          p._id === plan._id ? { ...p, progress: newProgress } : p
        )
      );
      await api.put(`/doctor/treatment-plans/${plan._id}`, {
        progress: newProgress,
      });
    } catch (error) {
      console.error("Failed to update progress", error);
      fetchData(); // Revert state on error by re-fetching
    }
  };

  // --- Helper functions for styling (no change) ---
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (loading)
    return <div className="p-8 text-center">Loading Treatment Plans...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Treatment Planning</h2>
        <button
          onClick={() => setShowPlanForm(true)}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Treatment Plan</span>
        </button>
      </div>

      {/* Treatment Plans Grid (now maps over state) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {treatmentPlans.map((plan) => (
          <div
            key={plan._id}
            className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {plan.patient.name}
                  </h3>
                  <p className="text-sm text-gray-600">{plan.condition}</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                  plan.status
                )}`}
              >
                {plan.status}
              </span>
            </div>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Progress
                </span>
                <span className="text-sm text-gray-600">{plan.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getProgressColor(
                    plan.progress
                  )}`}
                  style={{ width: `${plan.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  {new Date(plan.startDate).toLocaleDateString()} -{" "}
                  {new Date(plan.endDate).toLocaleDateString()}
                </span>
              </div>
              {plan.nextAppointment && (
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>
                    Next:{" "}
                    {new Date(plan.nextAppointment.date).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Medications:
                </p>
                <div>
                  {plan.medications.map((med, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-2 mb-1"
                    >
                      {med}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t flex space-x-2">
              <button className="flex-1 text-sm bg-blue-50 text-blue-700 py-2 rounded-lg hover:bg-blue-100">
                View Details
              </button>
              <button className="flex-1 text-sm bg-gray-50 text-gray-700 py-2 rounded-lg hover:bg-gray-100">
                Edit Plan
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() =>
              treatmentPlans[0] && handleUpdateProgress(treatmentPlans[0])
            }
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50"
          >
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
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Treatment Templates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <button
              key={template._id}
              className="p-4 border rounded-lg hover:bg-blue-50 text-left"
            >
              <p className="font-medium text-gray-900">{template.name}</p>
              <p className="text-sm text-gray-600 mt-1">
                Standard care protocol
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
