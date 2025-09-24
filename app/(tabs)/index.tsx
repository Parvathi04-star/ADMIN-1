import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Activity, Thermometer, Users, Phone } from 'lucide-react-native';

export default function HomeScreen() {
  const vitalSigns = [
    { label: 'Blood Pressure', value: '120/80', icon: Heart, color: '#10B981' },
    { label: 'Heart Rate', value: '72 bpm', icon: Activity, color: '#EF4444' },
    { label: 'Temperature', value: '98.6°F', icon: Thermometer, color: '#F59E0B' },
  ];

  const todaysTasks = [
    { time: '8:00 AM', task: 'Take morning medications', completed: true },
    { time: '11:00 AM', task: 'Doctor appointment', completed: false },
    { time: '6:00 PM', task: 'Evening medications', completed: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good Morning!</Text>
          <Text style={styles.patientName}>John Smith</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Vital Signs</Text>
          <View style={styles.vitalGrid}>
            {vitalSigns.map((vital, index) => (
              <View key={index} style={styles.vitalCard}>
                <vital.icon size={32} color={vital.color} />
                <Text style={styles.vitalValue}>{vital.value}</Text>
                <Text style={styles.vitalLabel}>{vital.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          {todaysTasks.map((item, index) => (
            <View key={index} style={styles.taskCard}>
              <View style={styles.taskLeft}>
                <Text style={styles.taskTime}>{item.time}</Text>
                <Text style={styles.taskText}>{item.task}</Text>
              </View>
              <View style={[
                styles.taskStatus, 
                { backgroundColor: item.completed ? '#10B981' : '#F59E0B' }
              ]}>
                <Text style={styles.taskStatusText}>
                  {item.completed ? 'Done' : 'Pending'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.emergencyButton}>
          <Phone size={28} color="#FFFFFF" />
          <Text style={styles.emergencyText}>Emergency Contact</Text>
        </TouchableOpacity>
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
    marginBottom: 30,
  },
  greeting: {
    fontSize: 18,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 4,
  },
  patientName: {
    fontSize: 28,
    color: '#000000',
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
  vitalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  vitalCard: {
    backgroundColor: '#F8FAFC',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 100,
    flex: 1,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  vitalValue: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  vitalLabel: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    fontWeight: '600',
  },
  taskCard: {
    backgroundColor: '#F8FAFC',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 72,
  },
  taskLeft: {
    flex: 1,
  },
  taskTime: {
    fontSize: 18,
    color: '#2563EB',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  taskText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  taskStatus: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  taskStatusText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emergencyButton: {
    backgroundColor: '#EF4444',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    minHeight: 64,
  },
  emergencyText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});