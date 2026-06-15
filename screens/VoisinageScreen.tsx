import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../constants/theme';
import { BottomNav, Tag } from '../components/UI';

const POINTS = [
  { icon: '🏋️', name: 'Salle de sport Urban Gym', distance: '180m', cat: 'Sport', rating: '4.6' },
  { icon: '🛒', name: 'Monoprix Part-Dieu', distance: '220m', cat: 'Courses', rating: '4.1' },
  { icon: '☕', name: 'Café Lumières', distance: '90m', cat: 'Café', rating: '4.8' },
  { icon: '🍕', name: 'Pizzeria La Strada', distance: '310m', cat: 'Restau', rating: '4.4' },
  { icon: '🚇', name: 'Métro Garibaldi', distance: '120m', cat: 'Transport', rating: null },
  { icon: '📚', name: 'Bibliothèque du 6e', distance: '400m', cat: 'Culture', rating: '4.7' },
];

export default function VoisinageScreen({ onGroupe, onActivites, onNotifs, onProfil }: any) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <View style={{ height: 200, backgroundColor: '#D6E4EC', position: 'relative', overflow: 'hidden' }}>
        <View style={{ position: 'absolute', left: '30%', top: '8%', width: 160, height: 160, borderRadius: 80, borderWidth: 1.5, borderColor: Colors.teal, backgroundColor: 'rgba(58,191,165,0.07)' }} />
        <View style={{ position: 'absolute', left: '48%', top: '42%', alignItems: 'center', zIndex: 10 }}>
          <Text style={{ fontSize: 20 }}>🏠</Text>
          <View style={{ backgroundColor: Colors.navy, borderRadius: 6, paddingHorizontal: 5, paddingVertical: 2, marginTop: 2 }}>
            <Text style={{ color: Colors.white, fontSize: 8, fontWeight: '700' }}>14 Garibaldi</Text>
          </View>
        </View>
        {POINTS.map((p, i) => (
          <TouchableOpacity key={i} onPress={() => setSelected(p.name)} style={{ position: 'absolute', left: `${15 + (i * 13) % 70}%` as any, top: `${20 + (i * 17) % 55}%` as any, width: 34, height: 34, backgroundColor: Colors.white, borderRadius: 17, alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
            <Text style={{ fontSize: 16 }}>{p.icon}</Text>
          </TouchableOpacity>
        ))}
        <View style={{ position: 'absolute', top: 12, left: 14, backgroundColor: Colors.white, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6, flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <Text style={{ color: Colors.navy, fontSize: 12, fontWeight: '700' }}>📍 Voisinage</Text>
          <Text style={{ color: Colors.muted, fontSize: 10 }}>Rayon 500m</Text>
        </View>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 14 }}>
        <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>À PROXIMITÉ</Text>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          {POINTS.map((p, i) => (
            <TouchableOpacity key={i} onPress={() => setSelected(p.name)} style={{ backgroundColor: Colors.white, borderRadius: 12, padding: 11, marginBottom: 7, flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: selected === p.name ? 1.5 : 0, borderColor: Colors.teal }}>
              <View style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: Colors.tealLight, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 18 }}>{p.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: Colors.navy, marginBottom: 4 }}>{p.name}</Text>
                <View style={{ flexDirection: 'row', gap: 6 }}>
                  <Tag label={p.cat} color="teal" />
                  <Tag label={'📍 ' + p.distance} color="navy" />
                </View>
              </View>
              {p.rating && <View style={{ backgroundColor: '#FEF3DD', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 }}>
                <Text style={{ fontSize: 11, fontWeight: '700', color: Colors.gold }}>★ {p.rating}</Text>
              </View>}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <BottomNav items={[
        { icon: '🏠', label: 'Groupe', onPress: onGroupe },
        { icon: '🗺️', label: 'Voisinage', active: true },
        { icon: '🎯', label: 'Activités', onPress: onActivites },
        { icon: '🔔', label: 'Notifs', onPress: onNotifs },
        { icon: '👤', label: 'Profil', onPress: onProfil },
      ]} />
    </SafeAreaView>
  );
}
