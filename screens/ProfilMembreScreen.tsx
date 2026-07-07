import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Colors } from '../constants/theme';

const MEMBRE = {
  prenom: 'Lucas',
  age: 22,
  filiere: 'Licence Droit',
  universite: 'Lyon 2',
  annee: '3ème année',
  bio: 'Étudiant en droit passionné de musique et de cuisine. Je cherche une coloc calme en semaine avec une bonne ambiance le week-end. Non-fumeur, j\'ai un grand respect pour les espaces communs 🙂',
  compatibilite: 87,
  initials: 'L',
  verified: true,
  reputation: {
    stars: 4,
    reviews: 4,
    memberSince: 'mars 2026',
  },
};

const HABITUDES = [
  { icon: '🌙', label: 'Rythme', value: 'Couche-tard (23h-1h)' },
  { icon: '🧹', label: 'Propreté', value: 'Très propre' },
  { icon: '🚬', label: 'Tabac', value: 'Non-fumeur' },
  { icon: '🐾', label: 'Animaux', value: 'Pas d\'allergie' },
  { icon: '🎉', label: 'Invités', value: 'Week-ends ok' },
  { icon: '🍳', label: 'Cuisine', value: 'Cuisine souvent' },
  { icon: '🏃', label: 'Sport', value: '2-3x par semaine' },
  { icon: '📚', label: 'Examens', value: 'Janvier + Mai' },
];

const INTERETS = ['🎵 Musique', '🍕 Cuisine', '⚖️ Droit', '🎬 Cinéma', '🏀 Basket'];

const REPUTATION_DETAILS = [
  { label: 'Propreté', score: 4 },
  { label: 'Respect', score: 5 },
  { label: 'Fiabilité', score: 4 },
  { label: 'Ambiance', score: 4 },
];

const getAvatarColor = (initials: string) => {
  const colors = ['#E8F4FF', '#FFF0E8', '#F0E8FF', '#E8F5E9', '#FEF3DD'];
  return colors[(initials.charCodeAt(0) % colors.length)];
};

export default function ProfilMembreScreen({ onNext, onBack }: any) {
  const handleMessage = () => {
    onNext?.('groupe_chat');
  };

  const handleReport = () => {
    Alert.alert(
      'Signalement envoyé',
      'Merci pour votre retour. Un modérateur va examiner ce signalement sous 24h.'
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 18, paddingTop: 50, paddingBottom: 28, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
          <TouchableOpacity onPress={onBack} style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 28, color: Colors.teal }}>←</Text>
          </TouchableOpacity>

          {/* Avatar + Verified Badge */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: getAvatarColor(MEMBRE.initials),
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 3,
              borderColor: Colors.teal,
            }}>
              <Text style={{ fontSize: 36, fontWeight: 'bold', color: Colors.navy }}>
                {MEMBRE.initials}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', gap: 6 }}>
              <Text style={{ fontSize: 14, backgroundColor: '#4CAF50', color: 'white', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', fontWeight: 'bold' }}>
                ✅ Vérifié
              </Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.teal }}>
                {MEMBRE.prenom}, {MEMBRE.age} ans
              </Text>
            </View>
          </View>

          {/* Filière */}
          <Text style={{ fontSize: 13, color: Colors.tealLight, marginBottom: 12, lineHeight: 18 }}>
            🎓 {MEMBRE.filiere} · {MEMBRE.universite} · {MEMBRE.annee}
          </Text>

          {/* Compatibilité Badge */}
          <View style={{ backgroundColor: Colors.teal, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, alignSelf: 'flex-start' }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.navy }}>
              {MEMBRE.compatibilite}% compatible
            </Text>
          </View>
        </View>

        {/* Bio */}
        <View style={{ backgroundColor: 'white', marginHorizontal: 16, marginTop: 20, padding: 16, borderRadius: 16, marginBottom: 20 }}>
          <Text style={{ fontSize: 13, color: Colors.navy, lineHeight: 18 }}>
            {MEMBRE.bio}
          </Text>
        </View>

        {/* Habitudes de Vie */}
        <View style={{ marginHorizontal: 16, marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.navy, marginBottom: 12 }}>
            Habitudes de vie
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {HABITUDES.map((item, idx) => (
              <View key={idx} style={{ width: '48%', backgroundColor: 'white', padding: 12, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: Colors.teal }}>
                <Text style={{ fontSize: 16, marginBottom: 4 }}>{item.icon}</Text>
                <Text style={{ fontSize: 12, color: Colors.muted, marginBottom: 4, fontWeight: '600' }}>
                  {item.label}
                </Text>
                <Text style={{ fontSize: 12, color: Colors.navy, fontWeight: 'bold' }}>
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Centres d'Intérêt */}
        <View style={{ marginHorizontal: 16, marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.navy, marginBottom: 12 }}>
            Centres d'intérêt
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {INTERETS.map((tag, idx) => (
              <View key={idx} style={{ backgroundColor: Colors.tealLight, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 }}>
                <Text style={{ fontSize: 12, color: Colors.navy, fontWeight: '600' }}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Réputation */}
        <View style={{ backgroundColor: 'white', marginHorizontal: 16, padding: 16, borderRadius: 16, marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Text style={{ fontSize: 16 }}>⭐</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.navy }}>
              {MEMBRE.reputation.stars} sur 5
            </Text>
            <Text style={{ fontSize: 12, color: Colors.muted }}>
              · {MEMBRE.reputation.reviews} avis · Membre depuis {MEMBRE.reputation.memberSince}
            </Text>
          </View>

          {REPUTATION_DETAILS.map((rep, idx) => (
            <View key={idx} style={{ marginBottom: 12, gap: 6 }}>
              <Text style={{ fontSize: 12, color: Colors.muted, fontWeight: '600' }}>
                {rep.label}
              </Text>
              <View style={{ flexDirection: 'row', gap: 2 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <View
                    key={i}
                    style={{
                      flex: 1,
                      height: 6,
                      backgroundColor: i <= rep.score ? Colors.teal : Colors.gray,
                      borderRadius: 3,
                    }}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={{ marginHorizontal: 16, gap: 12, marginBottom: 20 }}>
          <TouchableOpacity
            onPress={handleMessage}
            style={{
              backgroundColor: Colors.teal,
              paddingVertical: 14,
              borderRadius: 12,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.navy }}>
              💬 Envoyer un message
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleReport}
            style={{
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderColor: Colors.red,
              paddingVertical: 12,
              borderRadius: 12,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.red }}>
              🚩 Signaler ce profil
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
