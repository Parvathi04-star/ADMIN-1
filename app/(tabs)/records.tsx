import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, Heart, Activity, Download, TrendingUp } from 'lucide-react-native';

export default function RecordsScreen() {
  const healthMetrics = [
    {
      title: 'Blood Pressure',
      current: '120/80 mmHg',
      trend: 'stable',
      lastUpdated: 'Today, 8:00 AM',
      icon: Heart,
      color: '#10B981',
    },
    {
      title: 'Blood Sugar',
      current: '95 mg/dL',
      trend: 'improving',
      lastUpdated: 'Yesterday, 7:30 AM',
      icon: Activity,
      color: '#2563EB',
    },
    {
      title: 'Weight',
      current: '175 lbs',
      trend: 'stable',
      lastUpdated: '3 days ago',
      icon: TrendingUp,
      color: '#F59E0B',
    },
  ];

  const recentResults = [
    {
      date: 'Nov 10, 2024',
      type: 'Blood Work',
      doctor: 'Dr. Sarah Johnson',
      status: 'Normal',
    },
    {
      date: 'Nov 5, 2024',
      type: 'EKG',
      doctor: 'Dr. Sarah Johnson',
      status: 'Normal',
    },
    {
      date: 'Oct 28, 2024',
      type: 'Chest X-Ray',
      doctor: 'Dr. Michael Chen',
      status: 'Normal',
    },
  ];

  const documents = [
    {
      name: 'Insurance Card',
      type: 'Insurance',
      date: 'Updated: Oct 15, 2024',
    },
    {
      name: 'Medication List',
      type: 'Medications',
      date: 'Updated: Nov 12, 2024',
    },
    {
      name: 'Emergency Contacts',
      type: 'Emergency',
      date: 'Updated: Sep 20, 2024',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Health Records</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Health Metrics</Text>
          {healthMetrics.map((metric, index) => (
            <View key={index} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <View style={styles.metricLeft}>
                  <metric.icon size={32} color={metric.color} />
                  <View style={styles.metricInfo}>
                    <Text style={styles.metricTitle}>{metric.title}</Text>
                    <Text style={styles.metricValue}>{metric.current}</Text>
                  </View>
                </View>
                <View style={[
                  styles.trendBadge,
                  { 
                    backgroundColor: metric.trend === 'improving' ? '#10B981' : 
                                   metric.trend === 'stable' ? '#2563EB' : '#F59E0B'
                  }
                ]}>
                  <Text style={styles.trendText}>
                    {metric.trend.charAt(0).toUpperCase() + metric.trend.slice(1)}
                  </Text>
                </View>
              </View>
              <Text style={styles.metricUpdate}>Last updated: {metric.lastUpdated}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Test Results</Text>
          {recentResults.map((result, index) => (
            <View key={index} style={styles.resultCard}>
              <View style={styles.resultLeft}>
                <FileText size={24} color="#2563EB" />
                <View style={styles.resultInfo}>
                  <Text style={styles.resultType}>{result.type}</Text>
                  <Text style={styles.resultDate}>{result.date}</Text>
                  <Text style={styles.resultDoctor}>{result.doctor}</Text>
                </View>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{result.status}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Important Documents</Text>
          {documents.map((doc, index) => (
            <TouchableOpacity key={index} style={styles.documentCard}>
              <View style={styles.documentLeft}>
                <FileText size={24} color="#64748B" />
                <View style={styles.documentInfo}>
                  <Text style={styles.documentName}>{doc.name}</Text>
                  <Text style={styles.documentType}>{doc.type}</Text>
                  <Text style={styles.documentDate}>{doc.date}</Text>
                </View>
              </View>
              <Download size={24} color="#2563EB" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.exportButton}>
          <Download size={24} color="#FFFFFF" />
          <Text style={styles.exportText}>Export Complete Health Record</Text>
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
    marginBottom: 24,
  },
  title: {
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
  metricCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  metricInfo: {
    marginLeft: 16,
    flex: 1,
  },
  metricTitle: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    color: '#2563EB',
    fontWeight: 'bold',
  },
  trendBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  trendText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  metricUpdate: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  resultCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 72,
  },
  resultLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  resultInfo: {
    marginLeft: 16,
    flex: 1,
  },
  resultType: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  resultDate: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 2,
  },
  resultDoctor: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  statusBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  documentCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 72,
  },
  documentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  documentInfo: {
    marginLeft: 16,
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  documentType: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
    marginBottom: 2,
  },
  documentDate: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  exportButton: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 12,
    gap: 12,
    marginTop: 16,
    minHeight: 64,
  },
  exportText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});