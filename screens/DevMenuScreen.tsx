import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
    { name: 'voisinage', label: '17 — Voisinage' },
    { name: 'partenaires', label: '18 — Partenaires & offres 🆕' },
    { name: 'biens_feed', label: '19 — Feed Profil B 🆕' },
    { name: 'property_detail', label: '20 — Détail du bien 🆕' },
  ]},
  { label: '👥 BLOC 2 — GROUPE', screens: [
    { name: 'groupe_statut', label: '21 — État du groupe 🆕' },
    { name: 'groupe_chat', label: '22 — Chat groupe 🆕' },
    { name: 'groupe_validation', label: '23 — Validation groupe 🆕' },
  ]},
  { label: '📋 BLOC 3 — RÉPUTATION', screens: [
    { name: 'profil_membre', label: '24 — Profil membre 🆕' },
    { name: 'reputation', label: '25 — Ma réputation 🆕' },
  ]},
  { label: '🏘️ BLOC 4 — FEED', screens: [
    { name: 'filtres', label: '25 — Filtres 🆕' },
    { name: 'aucun_groupe', label: '26 — Aucun groupe 🆕' },
  ]},
  { label: '👤 BLOC 5 — COMPTE', screens: [
    { name: 'parametres', label: '27 — Paramètres 🆕' },
  ]},
  { label: '🏘️ BLOC 6 — RÉTENTION', screens: [
    { name: 'communaute', label: '28 — Communauté quartier 🆕' },
    { name: 'cold_start', label: '29 — Cold start & liste attente 🆕' },
    { name: 'checkin', label: '30 — Check-in J+30 🆕' },
  ]},
  { label: '🏠 JOURNEY BAILLEUR', screens: [
    { name: 'depot_annonce', label: '28 — Dépôt annonce amélioré 🆕' },
    { name: 'groupes_bailleur', label: '29 — Groupes + photos masquées 🆕' },
    { name: 'dashboard_bailleur', label: '30 — Dashboard bailleur' },
  ]},
  { label: '🤝 ESPACE PARTENAIRE', screens: [
    { name: 'dashboard_partenaire', label: '30 — Dashboard partenaire 🆕' },
  ]},
];

export default function DevMenuScreen({ onGo }: { onGo: (s: string) => void }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 20, paddingTop: 50, paddingBottom: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: '800', color: Colors.white, letterSpacing: -1 }}>nest<Text style={{ color: Colors.teal }}>mate</Text></Text>
        <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 }}>DEV — 31 screens</Text>
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
