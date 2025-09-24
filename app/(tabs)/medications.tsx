import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pill, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function MedicationsScreen() {
  const medications = [
    {
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      time: '8:00 AM',
      taken: true,
      nextDue: null,
    },
    {
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      time: '8:00 AM & 8:00 PM',
      taken: true,
      nextDue: '8:00 PM',
    },
    {
      name: 'Aspirin',
      dosage: '81mg',
      frequency: 'Once daily',
      time: '6:00 PM',
      taken: false,
      nextDue: '6:00 PM',
    },
    {
      name: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'Once daily',
      time: '8:00 AM',
      taken: true,
      nextDue: null,
    },
  ];

  const handleMarkTaken = (medicationName: string) => {
    console.log(`Marking ${medicationName} as taken`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>My Medications</Text>
          <Text style={styles.subtitle}>Today's Schedule</Text>
        </View>

        {medications.map((med, index) => (
          <View key={index} style={styles.medicationCard}>
            <View style={styles.medicationHeader}>
              <View style={styles.medicationInfo}>
                <Pill size={32} color="#2563EB" />
                <View style={styles.medicationDetails}>
                  <Text style={styles.medicationName}>{med.name}</Text>
                  <Text style={styles.medicationDosage}>{med.dosage}</Text>
                </View>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: med.taken ? '#10B981' : '#F59E0B' }
              ]}>
                {med.taken ? (
                  <CheckCircle size={20} color="#FFFFFF" />
                ) : (
                  <AlertCircle size={20} color="#FFFFFF" />
                )}
              </View>
            </View>

            <View style={styles.medicationBody}>
              <View style={styles.scheduleRow}>
                <Clock size={20} color="#64748B" />
                <Text style={styles.scheduleText}>
                  {med.frequency} at {med.time}
                </Text>
              </View>

              {med.nextDue && (
                <View style={styles.nextDueRow}>
                  <Text style={styles.nextDueLabel}>Next dose due:</Text>
                  <Text style={styles.nextDueTime}>{med.nextDue}</Text>
                </View>
              )}

              {!med.taken && (
                <TouchableOpacity
                  style={styles.markTakenButton}
                  onPress={() => handleMarkTaken(med.name)}
                >
                  <CheckCircle size={24} color="#FFFFFF" />
                  <Text style={styles.markTakenText}>Mark as Taken</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        <View style={styles.reminderSection}>
          <Text style={styles.reminderTitle}>Medication Reminders</Text>
          <Text style={styles.reminderText}>
            You will receive notifications 30 minutes before each scheduled dose.
          </Text>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748B',
    fontWeight: '500',
  },
  medicationCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  medicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  medicationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  medicationDetails: {
    marginLeft: 16,
    flex: 1,
  },
  medicationName: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 18,
    color: '#2563EB',
    fontWeight: '600',
  },
  statusBadge: {
    padding: 8,
    borderRadius: 20,
    minWidth: 40,
    alignItems: 'center',
  },
  medicationBody: {
    gap: 12,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scheduleText: {
    fontSize: 16,
    color: '#475569',
    fontWeight: '500',
  },
  nextDueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  nextDueLabel: {
    fontSize: 16,
    color: '#92400E',
    fontWeight: '600',
  },
  nextDueTime: {
    fontSize: 18,
    color: '#92400E',
    fontWeight: 'bold',
  },
  markTakenButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
    minHeight: 56,
  },
  markTakenText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reminderSection: {
    backgroundColor: '#EFF6FF',
    padding: 20,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  reminderTitle: {
    fontSize: 18,
    color: '#1E40AF',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reminderText: {
    fontSize: 16,
    color: '#1E40AF',
    lineHeight: 24,
  },
});