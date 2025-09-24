import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, MapPin, User, Plus } from 'lucide-react-native';

export default function AppointmentsScreen() {
  const upcomingAppointments = [
    {
      date: 'Today, Nov 15',
      time: '11:00 AM',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      location: 'Heart Center, Room 205',
      type: 'Follow-up',
    },
    {
      date: 'Mon, Nov 18',
      time: '2:30 PM',
      doctor: 'Dr. Michael Chen',
      specialty: 'Primary Care',
      location: 'Main Building, Room 102',
      type: 'Annual Check-up',
    },
    {
      date: 'Wed, Nov 20',
      time: '9:00 AM',
      doctor: 'Dr. Lisa Williams',
      specialty: 'Endocrinologist',
      location: 'Diabetes Center, Room 301',
      type: 'Consultation',
    },
  ];

  const recentAppointments = [
    {
      date: 'Mon, Nov 11',
      doctor: 'Dr. Robert Davis',
      specialty: 'Orthopedist',
      status: 'Completed',
    },
    {
      date: 'Fri, Nov 8',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      status: 'Completed',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>My Appointments</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Schedule New</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          {upcomingAppointments.map((appointment, index) => (
            <View key={index} style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <View style={styles.dateTime}>
                  <Text style={styles.appointmentDate}>{appointment.date}</Text>
                  <View style={styles.timeRow}>
                    <Clock size={18} color="#2563EB" />
                    <Text style={styles.appointmentTime}>{appointment.time}</Text>
                  </View>
                </View>
                <View style={[
                  styles.typeBadge,
                  { backgroundColor: index === 0 ? '#EF4444' : '#2563EB' }
                ]}>
                  <Text style={styles.typeText}>{appointment.type}</Text>
                </View>
              </View>

              <View style={styles.appointmentBody}>
                <View style={styles.doctorRow}>
                  <User size={20} color="#64748B" />
                  <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>{appointment.doctor}</Text>
                    <Text style={styles.doctorSpecialty}>{appointment.specialty}</Text>
                  </View>
                </View>

                <View style={styles.locationRow}>
                  <MapPin size={20} color="#64748B" />
                  <Text style={styles.locationText}>{appointment.location}</Text>
                </View>

                {index === 0 && (
                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.primaryButton}>
                      <Text style={styles.primaryButtonText}>Join Video Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryButton}>
                      <Text style={styles.secondaryButtonText}>Reschedule</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Appointments</Text>
          {recentAppointments.map((appointment, index) => (
            <View key={index} style={styles.recentCard}>
              <View style={styles.recentInfo}>
                <Text style={styles.recentDate}>{appointment.date}</Text>
                <Text style={styles.recentDoctor}>{appointment.doctor}</Text>
                <Text style={styles.recentSpecialty}>{appointment.specialty}</Text>
              </View>
              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>Completed</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    color: '#000000',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    minHeight: 48,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  appointmentCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dateTime: {
    flex: 1,
  },
  appointmentDate: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  appointmentTime: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '600',
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  appointmentBody: {
    gap: 12,
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  doctorSpecialty: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationText: {
    fontSize: 16,
    color: '#475569',
    fontWeight: '500',
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 56,
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    minHeight: 56,
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 64,
  },
  recentInfo: {
    flex: 1,
  },
  recentDate: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 2,
  },
  recentDoctor: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  recentSpecialty: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  completedBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  completedText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});