import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../constants/theme';
import { BottomNav } from '../components/UI';

const MEMBRES = [
  { avatar: '🧑', name: 'Toi (Lucas)', role: 'Admin du groupe', status: 'ok', statusText: 'Loyer payé' },
  { avatar: '👩‍🎓', name: 'Léa M.', role: 'Membre', status: 'ok', statusText: 'Loyer payé' },
  { avatar: '👨‍💻', name: 'Tom K.', role: 'Membre', status: 'wait', statusText: 'En attente' },
  { avatar: '🧑‍🎨', name: 'Camille R.', role: 'Membre', status: 'ok', statusText: 'Loyer payé' },
];

const ACTIONS = [
  { icon: '🧹', label: 'Ménage cuisine', detail: 'Tom · Cette semaine', color: '#E8F4FF' },
  { icon: '🛒', label: 'Courses communes', detail: 'Léa · Vendredi', color: '#FFF0E8' },
  { icon: '💡', label: 'Payer les charges', detail: 'Tous · 1er oct', color: '#FDECEA' },
];

export default function GroupeActifScreen({ onActivites, onProfil, onNotifs, onVoisinage, onTournante }: any) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ padding: 18 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, marginBottom: 14 }}>
          <View>
            <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.navy }}>Mon Groupe 🏠</Text>
            <Text style={{ fontSize: 11, color: Colors.muted, marginTop: 2 }}>14 Rue Garibaldi, Lyon 6e</Text>
          </View>
          <View style={{ backgroundColor: Colors.teal, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10 }}>
            <Text style={{ color: Colors.white, fontSize: 11, fontWeight: '700' }}>Actif</Text>
          </View>
        </View>
        <View style={{ backgroundColor: Colors.navy, borderRadius: 14, padding: 14, flexDirection: 'row', gap: 12, alignItems: 'center', marginBottom: 18 }}>
          <Text style={{ fontSize: 28 }}>🏢</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, fontWeight: '600', color: Colors.white, marginBottom: 2 }}>14 Rue Garibaldi, Lyon 6e</Text>
            <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>T4 · 85m² · 4 colocataires</Text>
          </View>
          <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.teal }}>480€/mois</Text>
        </View>
        <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>COLOCATAIRES</Text>
        {MEMBRES.map((m, i) => (
          <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 13, padding: 12, marginBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: Colors.tealLight, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 17 }}>{m.avatar}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: Colors.navy, marginBottom: 2 }}>{m.name}</Text>
              <Text style={{ fontSize: 9, color: Colors.muted }}>{m.role}</Text>
            </View>
            <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, backgroundColor: m.status === 'ok' ? '#E8F5E9' : '#FFF3E0' }}>
              <Text style={{ fontSize: 10, fontWeight: '600', color: m.status === 'ok' ? Colors.green : Colors.gold }}>{m.statusText}</Text>
            </View>
          </View>
        ))}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase' }}>LA TOURNANTE</Text>
          <TouchableOpacity onPress={onTournante} style={{ backgroundColor: Colors.teal, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 8 }}>
            <Text style={{ color: Colors.white, fontSize: 11, fontWeight: '600' }}>Voir le planning →</Text>
          </TouchableOpacity>
        </View>
        {ACTIONS.map((a, i) => (
          <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 11, padding: 11, marginBottom: 7, flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: i === 0 ? 8 : 0 }}>
            <View style={{ width: 34, height: 34, borderRadius: 9, backgroundColor: a.color, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 15 }}>{a.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: Colors.navy }}>{a.label}</Text>
              <Text style={{ fontSize: 9, color: Colors.muted, marginTop: 1 }}>{a.detail}</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: Colors.teal, borderRadius: 7, paddingHorizontal: 9, paddingVertical: 4 }}>
              <Text style={{ color: Colors.white, fontSize: 9, fontWeight: '600' }}>Voir</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={{ height: 80 }} />
      </ScrollView>
      <BottomNav items={[
        { icon: '🏠', label: 'Groupe', active: true },
        { icon: '🗺️', label: 'Voisinage', onPress: onVoisinage },
        { icon: '🎯', label: 'Activités', onPress: onActivites },
        { icon: '🔔', label: 'Notifs', onPress: onNotifs },
        { icon: '👤', label: 'Profil', onPress: onProfil },
      ]} />
    </SafeAreaView>
  );
}
