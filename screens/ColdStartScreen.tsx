import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Colors } from '../constants/theme';

const AUTRES_VILLES = [
  { nom: 'Paris', inscrits: 100, objectif: 100, badge: 'MATCHING ACTIF ✅', badgeColor: Colors.teal, badgeBg: 'rgba(58, 191, 165, 0.15)' },
  { nom: 'Bordeaux', inscrits: 89, objectif: 100, badge: 'BIENTÔT', badgeColor: '#FF9500', badgeBg: 'rgba(255, 149, 0, 0.15)' },
  { nom: 'Toulouse', inscrits: 54, objectif: 100, badge: 'EN COURS', badgeColor: Colors.muted, badgeBg: 'rgba(138, 159, 170, 0.15)' },
  { nom: 'Nantes', inscrits: 31, objectif: 100, badge: 'EN COURS', badgeColor: Colors.muted, badgeBg: 'rgba(138, 159, 170, 0.15)' },
  { nom: 'Marseille', inscrits: 12, objectif: 100, badge: 'EN COURS', badgeColor: Colors.muted, badgeBg: 'rgba(138, 159, 170, 0.15)' },
  { nom: 'Lille', inscrits: 8, objectif: 100, badge: 'EN COURS', badgeColor: Colors.muted, badgeBg: 'rgba(138, 159, 170, 0.15)' },
];

const ACCELERATION_ITEMS = [
  { icon: '👤', label: 'Compléter ton profil', points: '+10 pts' },
  { icon: '📨', label: 'Inviter un ami qui s\'inscrit', points: '+25 pts' },
  { icon: '✅', label: 'Vérifier ton identité', points: '+15 pts' },
];

export default function ColdStartScreen({ onNext, onBack }: any) {
  const [blinkVisible, setBlinkVisible] = useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setBlinkVisible(prev => !prev);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const handleInviteFriends = () => {
    Alert.alert('Lien copié ! Partage-le à tes amis 📱', 'Chaque inscription t\'offre des points bonus');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 18, paddingTop: 50, paddingBottom: 28, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 6 }}>Nestmate arrive dans ta ville 🚀</Text>
          <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 16 }}>Le matching IA se déclenche dès qu'on atteint 100 étudiants inscrits par ville</Text>
        </View>

        {/* Ville de l'utilisateur (Lyon) */}
        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
          <View style={{ backgroundColor: Colors.white, borderRadius: 16, padding: 16, marginBottom: 20, shadowColor: Colors.navy, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 }}>
            {/* Ville Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color: Colors.navy }}>Lyon</Text>
              {blinkVisible && (
                <View style={{ backgroundColor: '#FF9500', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 }}>
                  <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.white, letterSpacing: 0.5, textTransform: 'uppercase' }}>EN COURS</Text>
                </View>
              )}
            </View>

            {/* Large Progress Bar */}
            <View style={{ height: 10, backgroundColor: Colors.gray, borderRadius: 5, overflow: 'hidden', marginBottom: 10 }}>
              <View style={{ height: 10, backgroundColor: Colors.teal, borderRadius: 5, width: '67%' }} />
            </View>

            <Text style={{ fontSize: 12, fontWeight: '600', color: Colors.navy, marginBottom: 16 }}>67 étudiants inscrits · encore 33 pour démarrer 🎯</Text>

            <TouchableOpacity onPress={handleInviteFriends} style={{ backgroundColor: Colors.navy, borderRadius: 10, paddingVertical: 12, alignItems: 'center' }}>
              <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 13 }}>Inviter des amis</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Autres villes */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Autres villes</Text>

          {AUTRES_VILLES.map((ville, i) => (
            <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 12, shadowColor: Colors.navy, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
              {/* Ville nom */}
              <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.navy, width: 60 }}>{ville.nom}</Text>

              {/* Fine Progress Bar */}
              <View style={{ flex: 1, height: 6, backgroundColor: Colors.gray, borderRadius: 3, overflow: 'hidden' }}>
                <View style={{ height: 6, backgroundColor: Colors.teal, borderRadius: 3, width: `${(ville.inscrits / ville.objectif) * 100}%` }} />
              </View>

              {/* Nombre inscrits */}
              <Text style={{ fontSize: 11, fontWeight: '600', color: Colors.muted, width: 45, textAlign: 'right' }}>{ville.inscrits}/100</Text>

              {/* Badge */}
              <View style={{ backgroundColor: ville.badgeBg, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                <Text style={{ fontSize: 9, fontWeight: '700', color: ville.badgeColor, letterSpacing: 0.3, textTransform: 'uppercase' }}>{ville.badge}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Accélère le lancement */}
        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Accélère le lancement 💡</Text>

          <View style={{ backgroundColor: Colors.white, borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: Colors.navy, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
            {ACCELERATION_ITEMS.map((item, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: i < ACCELERATION_ITEMS.length - 1 ? 1 : 0, borderBottomColor: Colors.border }}>
                <Text style={{ fontSize: 18 }}>{item.icon}</Text>
                <Text style={{ fontSize: 12, color: Colors.navy, flex: 1 }}>{item.label}</Text>
                <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.teal }}>{item.points}</Text>
              </View>
            ))}
          </View>

          {/* Score */}
          <View style={{ backgroundColor: Colors.tealLight, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 20 }}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.teal, textAlign: 'center' }}>Tu as 35 pts · Rang #12 à Lyon 🏆</Text>
          </View>

          {/* Back button */}
          <TouchableOpacity onPress={onBack} style={{ paddingVertical: 12 }}>
            <Text style={{ fontSize: 13, color: Colors.muted, textAlign: 'center', fontWeight: '500' }}>Retour</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
