import React from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/theme';

const suggestions = [
  { label: '📍 Élargir la zone de recherche (+5 km)', message: 'Zone élargie à 10 km autour de Lyon 2' },
  { label: '💰 Augmenter le budget de 50€', message: 'Budget mis à jour : 750€ max' },
  { label: '👥 Accepter les groupes de 4 personnes', message: 'Taille du groupe élargie' },
];

export default function AucunGroupeScreen({ onBack }: any) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 24 }}>
          <Text style={{ fontSize: 64, marginBottom: 12 }}>🔍</Text>
          <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.navy, textAlign: 'center' }}>Aucun groupe trouvé pour l'instant</Text>
          <Text style={{ fontSize: 13, color: Colors.muted, marginTop: 8, textAlign: 'center' }}>Pas de panique — voici ce que tu peux faire</Text>
        </View>

        <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: Colors.teal }}>
          <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.navy, marginBottom: 10 }}>📐 Ajuster mes filtres</Text>
          {suggestions.map((item) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => Alert.alert('Suggestion', item.message)}
              style={{ paddingVertical: 10, borderTopWidth: item.label === suggestions[0].label ? 0 : 1, borderTopColor: '#E5E0D8' }}
            >
              <Text style={{ fontSize: 13, color: Colors.navy }}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: '#F4A261' }}>
          <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.navy, marginBottom: 8 }}>🔔 Être notifié dès qu'un groupe se forme</Text>
          <Text style={{ fontSize: 13, color: Colors.muted, lineHeight: 18, marginBottom: 12 }}>On t'envoie une notification dès qu'un groupe compatible avec ton profil apparaît.</Text>
          <TouchableOpacity onPress={() => Alert.alert('Alerte activée', '✅ Alerte activée ! Tu seras notifié dès qu’un groupe compatible se forme.')} style={{ backgroundColor: '#F4A261', paddingVertical: 12, borderRadius: 12, alignItems: 'center' }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.white }}>Activer l'alerte</Text>
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 18, borderWidth: 1, borderColor: Colors.navy }}>
          <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.navy, marginBottom: 8 }}>⏳ Rejoindre la liste d'attente</Text>
          <Text style={{ fontSize: 13, color: Colors.muted, lineHeight: 18, marginBottom: 12 }}>67 étudiants sont déjà en attente à Lyon. Le matching se déclenche automatiquement dès qu'un groupe compatible se forme.</Text>
          <View style={{ height: 8, backgroundColor: Colors.gray, borderRadius: 999, marginBottom: 10 }}>
            <View style={{ width: '67%', height: 8, backgroundColor: Colors.teal, borderRadius: 999 }} />
          </View>
          <Text style={{ fontSize: 12, color: Colors.muted, marginBottom: 12 }}>67/100</Text>
          <TouchableOpacity onPress={() => Alert.alert('Liste d’attente', 'Tu es maintenant #68 sur la liste d’attente à Lyon 🎯')} style={{ backgroundColor: Colors.navy, paddingVertical: 12, borderRadius: 12, alignItems: 'center' }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.white }}>Rejoindre la liste</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: Colors.cream, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 24 }}>
        <TouchableOpacity onPress={() => Alert.alert('Matching', 'Matching relancé... Aucun nouveau groupe pour l\'instant. Réessaie dans quelques heures.')} style={{ borderWidth: 1.5, borderColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center' }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.teal }}>🔄 Relancer le matching maintenant</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
