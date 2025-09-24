import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, Heart, TriangleAlert as AlertTriangle, MapPin, User } from 'lucide-react-native';

export default function EmergencyScreen() {
  const emergencyContacts = [
    {
      name: 'Emergency Services',
      number: '911',
      type: 'Emergency',
      description: 'For immediate life-threatening emergencies',
      color: '#EF4444',
    },
    {
      name: 'Dr. Sarah Johnson',
      number: '(555) 123-4567',
      type: 'Primary Cardiologist',
      description: 'Heart-related concerns',
      color: '#2563EB',
    },
    {
      name: 'Jane Smith',
      number: '(555) 987-6543',
      type: 'Emergency Contact',
      description: 'Daughter - Primary contact',
      color: '#10B981',
    },
    {
      name: 'Hospital Main Line',
      number: '(555) 456-7890',
      type: 'St. Mary\'s Hospital',
      description: 'Main hospital switchboard',
      color: '#F59E0B',
    },
  ];

  const medicalInfo = [
    { label: 'Allergies', value: 'Penicillin, Shellfish' },
    { label: 'Blood Type', value: 'A+' },
    { label: 'Current Medications', value: 'Lisinopril, Metformin, Aspirin' },
    { label: 'Medical Conditions', value: 'Hypertension, Type 2 Diabetes' },
  ];

  const handleCall = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.log("Phone calls not supported on this device");
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <AlertTriangle size={32} color="#EF4444" />
          <Text style={styles.title}>Emergency Contacts</Text>
        </View>

        <View style={styles.emergencyBanner}>
          <Heart size={24} color="#FFFFFF" />
          <Text style={styles.bannerText}>
            In case of emergency, call 911 immediately or go to the nearest emergency room.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Contact</Text>
          {emergencyContacts.map((contact, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.contactCard, { borderLeftColor: contact.color }]}
              onPress={() => handleCall(contact.number)}
            >
              <View style={styles.contactLeft}>
                <View style={[styles.contactIcon, { backgroundColor: contact.color }]}>
                  {index === 0 ? (
                    <AlertTriangle size={24} color="#FFFFFF" />
                  ) : index === 1 ? (
                    <Heart size={24} color="#FFFFFF" />
                  ) : index === 2 ? (
                    <User size={24} color="#FFFFFF" />
                  ) : (
                    <MapPin size={24} color="#FFFFFF" />
                  )}
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactType}>{contact.type}</Text>
                  <Text style={styles.contactDescription}>{contact.description}</Text>
                </View>
              </View>
              <View style={styles.contactRight}>
                <View style={styles.phoneButton}>
                  <Phone size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.contactNumber}>{contact.number}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical Information</Text>
          <View style={styles.medicalCard}>
            <Text style={styles.medicalTitle}>Important Medical Details</Text>
            <Text style={styles.medicalSubtitle}>
              Share this information with emergency responders if needed
            </Text>
            {medicalInfo.map((info, index) => (
              <View key={index} style={styles.medicalRow}>
                <Text style={styles.medicalLabel}>{info.label}:</Text>
                <Text style={styles.medicalValue}>{info.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.locationSection}>
          <MapPin size={24} color="#2563EB" />
          <View style={styles.locationInfo}>
            <Text style={styles.locationTitle}>Current Location</Text>
            <Text style={styles.locationText}>
              Your location will be shared with emergency services when you call 911
            </Text>
          </View>
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
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  title: {
    fontSize: 28,
    color: '#000000',
    fontWeight: 'bold',
  },
  emergencyBanner: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    gap: 12,
  },
  bannerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    lineHeight: 24,
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
  contactCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderLeftWidth: 4,
    minHeight: 96,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactType: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '600',
    marginBottom: 2,
  },
  contactDescription: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  contactRight: {
    alignItems: 'center',
    gap: 8,
  },
  phoneButton: {
    backgroundColor: '#10B981',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactNumber: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  medicalCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  medicalTitle: {
    fontSize: 18,
    color: '#92400E',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  medicalSubtitle: {
    fontSize: 14,
    color: '#92400E',
    fontWeight: '500',
    marginBottom: 16,
    lineHeight: 20,
  },
  medicalRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  medicalLabel: {
    fontSize: 16,
    color: '#92400E',
    fontWeight: 'bold',
    width: 120,
  },
  medicalValue: {
    fontSize: 16,
    color: '#92400E',
    fontWeight: '500',
    flex: 1,
  },
  locationSection: {
    backgroundColor: '#EFF6FF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    gap: 16,
  },
  locationInfo: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    color: '#1E40AF',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#1E40AF',
    fontWeight: '500',
    lineHeight: 20,
  },
});