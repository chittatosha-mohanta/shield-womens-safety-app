import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, Dimensions, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { COLORS } from '../utils/theme';

const { width, height } = Dimensions.get('window');

const SAFE_ZONES = [
  { id: 1, lat: 0, lng: 0, title: 'Police Station', type: 'police' },
  { id: 2, lat: 0, lng: 0, title: 'Hospital', type: 'hospital' },
];

const INCIDENT_ZONES = [
  { id: 1, lat: 0, lng: 0, title: 'Reported Unsafe', type: 'incident' },
];

export default function SafetyMapScreen() {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is needed for the map');
        setLoading(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(loc.coords);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleReport = () => {
    if (!location) return;
    const newIncident = {
      id: Date.now(),
      lat: location.latitude + (Math.random() - 0.5) * 0.002,
      lng: location.longitude + (Math.random() - 0.5) * 0.002,
      title: 'Reported by you',
      type: 'incident',
    };
    setIncidents([...incidents, newIncident]);
    Alert.alert('✅ Reported', 'Unsafe area reported. Thank you for keeping the community safe!');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: COLORS.textMuted, fontSize: 18 }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Safety Map</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Map */}
      {loading ? (
        <View style={styles.loadingBox}>
          <Text style={{ fontSize: 32, marginBottom: 12 }}>📍</Text>
          <Text style={{ color: COLORS.textMuted, fontSize: 14 }}>
            Getting your location...
          </Text>
        </View>
      ) : location ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          customMapStyle={darkMapStyle}
        >
          {/* Safe zone circle around user */}
          <Circle
            center={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            radius={300}
            fillColor="rgba(16,185,129,0.1)"
            strokeColor="rgba(16,185,129,0.4)"
            strokeWidth={1}
          />

          {/* User marker */}
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="You are here"
            pinColor={COLORS.purple}
          />

          {/* Incident markers */}
          {incidents.map((inc) => (
            <Marker
              key={inc.id}
              coordinate={{ latitude: inc.lat, longitude: inc.lng }}
              title={inc.title}
              pinColor={COLORS.red}
            />
          ))}
        </MapView>
      ) : (
        <View style={styles.loadingBox}>
          <Text style={{ fontSize: 32, marginBottom: 12 }}>⚠️</Text>
          <Text style={{ color: COLORS.textMuted, fontSize: 14 }}>
            Could not get location
          </Text>
        </View>
      )}

      {/* Legend */}
      <View style={styles.legend}>
        {[
          { color: COLORS.green, label: 'Safe Zone' },
          { color: COLORS.red, label: 'Incident' },
          { color: COLORS.purple, label: 'You' },
        ].map((item) => (
          <View key={item.label} style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Report Button */}
      <TouchableOpacity style={styles.reportBtn} onPress={handleReport}>
        <Text style={styles.reportBtnText}>+ REPORT UNSAFE AREA</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#0f1320' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1a1f2e' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0a0e1a' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#0d1321' }] },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24, paddingVertical: 16,
  },
  title: { fontSize: 17, fontWeight: '900', color: COLORS.text },
  map: { flex: 1 },
  loadingBox: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.bgCard,
    margin: 24, borderRadius: 16,
    borderWidth: 1, borderColor: COLORS.border,
  },
  legend: {
    flexDirection: 'row', gap: 16,
    paddingHorizontal: 24, paddingVertical: 12,
    backgroundColor: COLORS.bgCard,
    borderTopWidth: 1, borderTopColor: COLORS.border,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 11, color: COLORS.textMuted },
  reportBtn: {
    marginHorizontal: 24, marginBottom: 16,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1, borderColor: COLORS.red + '40',
    borderRadius: 999, padding: 16, alignItems: 'center',
  },
  reportBtnText: {
    color: COLORS.red, fontWeight: '700',
    fontSize: 13, letterSpacing: 1.5,
  },
});