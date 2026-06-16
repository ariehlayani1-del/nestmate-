import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../constants/theme';

const SECTIONS = [
  { label: '🔍 JOURNEY CHERCHEUR', screens: [
    { name: 'splash', label: '01 — Splash' },
    { name: 'choix', label: '02 — Choix profil' },
    { name: 'signup', label: '03 — Inscription améliorée 🆕' },
    { name: 'verification', label: '04 — Vérification identité 🆕' },
    { name: 'photo', label: '05 — Photo de profil' },
    { name: 'appart', label: '06 — Préférences logement' },
    { name: 'questionnaire', label: '07 — Questionnaire 3 sessions 🆕' },
    { name: 'interests', label: '08 — Centres d\'intérêt' },
    { name: 'ia_analyse', label: '09 — Analyse IA' },
    { name: 'groupe_propose', label: '10 — Groupe + statuts + icebreakers 🆕' },
    { name: 'groupe_accepte', label: '11 — Groupe accepté 🎉' },
    { name: 'groupe_actif', label: '12 — Dashboard + membre fantôme 🆕' },
    { name: 'activites', label: '13 — Activités' },
    { name: 'notifs', label: '14 — Notifications' },
    { name: 'profil', label: '15 — Profil + avis aveugle 🆕' },
    { name: 'communaute', label: '16 — Communauté quartier 🆕' },
    { name: 'voisinage', label: '17 — Voisinage' },
    { name: 'checkin', label: '18 — Check-in J+30 🆕' },
    { name: 'cold_start', label: '19 — Cold start & liste attente 🆕' },
  ]},
  { label: '🏠 JOURNEY BAILLEUR', screens: [
    { name: 'depot_annonce', label: '20 — Dépôt annonce amélioré 🆕' },
    { name: 'groupes_bailleur', label: '21 — Groupes + photos masquées 🆕' },
    { name: 'dashboard_bailleur', label: '22 — Dashboard bailleur' },
  ]},
];

export default function DevMenuScreen({ onGo }: { onGo: (s: string) => void }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 20, paddingTop: 50, paddingBottom: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: '800', color: Colors.white, letterSpacing: -1 }}>nest<Text style={{ color: Colors.teal }}>mate</Text></Text>
        <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 }}>DEV — 22 screens</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {SECTIONS.map((section) => (
          <View key={section.label}>
            <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 2, textTransform: 'uppercase', marginTop: 20, marginBottom: 8 }}>{section.label}</Text>
            {section.screens.map((s) => (
              <TouchableOpacity key={s.name} onPress={() => onGo(s.name)} style={{ backgroundColor: Colors.white, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 13, marginBottom: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} activeOpacity={0.7}>
                <Text style={{ fontSize: 13, color: s.label.includes('🆕') ? Colors.teal : Colors.navy, fontWeight: s.label.includes('🆕') ? '700' : '500' }}>{s.label}</Text>
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
