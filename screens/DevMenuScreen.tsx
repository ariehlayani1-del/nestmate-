import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

const SECTIONS = [
  { label: '🔍 JOURNEY CHERCHEUR', screens: [
    { name: 'splash', label: '01 — Splash' },
    { name: 'choix', label: '02 — Choix profil' },
    { name: 'signup', label: '03 — Inscription' },
    { name: 'photo', label: '04 — Photo de profil' },
    { name: 'appart', label: '05 — Préférences logement' },
    { name: 'questionnaire', label: '06 — Questionnaire' },
    { name: 'interests', label: '07 — Centres d\'intérêt' },
    { name: 'ia_analyse', label: '08 — Analyse IA' },
    { name: 'groupe_propose', label: '09 — Groupe proposé' },
    { name: 'groupe_accepte', label: '10 — Groupe accepté 🎉' },
    { name: 'groupe_actif', label: '11 — Dashboard groupe' },
    { name: 'activites', label: '12 — Activités' },
    { name: 'notifs', label: '13 — Notifications' },
    { name: 'profil', label: '14 — Profil & Réputation' },
    { name: 'voisinage', label: '15 — Voisinage' },
  ]},
  { label: '🏠 JOURNEY BAILLEUR', screens: [
    { name: 'depot_annonce', label: '16 — Dépôt annonce' },
    { name: 'groupes_bailleur', label: '17 — Groupes proposés' },
    { name: 'dashboard_bailleur', label: '18 — Dashboard bailleur' },
  ]},
];

export default function DevMenuScreen({ onGo }: { onGo: (s: string) => void }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 20, paddingTop: 50, paddingBottom: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: '800', color: Colors.white, letterSpacing: -1 }}>nest<Text style={{ color: Colors.teal }}>mate</Text></Text>
        <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 }}>DEV — Toutes les screens</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {SECTIONS.map((section) => (
          <View key={section.label}>
            <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 2, textTransform: 'uppercase', marginTop: 20, marginBottom: 8 }}>{section.label}</Text>
            {section.screens.map((s) => (
              <TouchableOpacity key={s.name} onPress={() => onGo(s.name)} style={{ backgroundColor: Colors.white, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 13, marginBottom: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} activeOpacity={0.7}>
                <Text style={{ fontSize: 13, color: Colors.navy, fontWeight: '500' }}>{s.label}</Text>
                <Text style={{ fontSize: 18, color: Colors.teal }}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
