import React from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/theme';

const BADGES = [
  { icon: '✅', label: 'Identité vérifiée' },
  { icon: '🎓', label: 'Étudiant vérifié' },
  { icon: '💬', label: 'Réactif (répond en < 2h)' },
  { icon: '🤝', label: '3 colocations réussies' },
  { icon: '🏆', label: 'Top profil Lyon' },
];

const CRITERIA = [
  { icon: '🧹', label: 'Propreté', score: 4.2, fill: '80%' },
  { icon: '🤝', label: 'Respect', score: 4.6, fill: '92%' },
  { icon: '⏰', label: 'Fiabilité', score: 4.1, fill: '82%' },
  { icon: '😊', label: 'Ambiance', score: 4.4, fill: '88%' },
];

const REVIEWS = [
  {
    rating: 5,
    date: 'Mars 2026',
    comment: 'Super coloc, toujours à l\'heure pour le loyer, cuisine bien, je recommande !',
  },
  {
    rating: 4,
    date: 'Nov 2025',
    comment: 'Bonne ambiance générale, quelques différences sur la propreté mais ça s\'est arrangé.',
  },
  {
    rating: 5,
    date: 'Août 2025',
    comment: 'Parfait du début à la fin, j\'aurais signé pour une 2ème année sans hésiter.',
  },
];

export default function ReputationScreen({ onBack }: any) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        <View style={{ alignItems: 'center', marginBottom: 26 }}>
          <Text style={{ fontSize: 20, fontWeight: '800', color: Colors.navy, marginBottom: 18 }}>Ma Réputation</Text>
          <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.teal, justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
            <Text style={{ fontSize: 32, fontWeight: '900', color: Colors.white }}>J</Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.navy }}>Jacob</Text>
          <Text style={{ fontSize: 28, fontWeight: '900', color: Colors.navy, marginVertical: 8 }}>4.3 / 5</Text>
          <Text style={{ fontSize: 12, color: Colors.muted }}>12 avis · Membre depuis mars 2026</Text>
          <View style={{ marginTop: 14, backgroundColor: Colors.teal, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10 }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.white }}>🌟 Membre Fiable</Text>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy, marginBottom: 12 }}>Badges obtenus</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {BADGES.map((badge) => (
              <View key={badge.label} style={{ backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 14, marginRight: 10, borderWidth: 1, borderColor: Colors.gray }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy }}>{badge.icon} {badge.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{ backgroundColor: 'white', borderRadius: 18, padding: 16, marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy, marginBottom: 14 }}>Scores par critère</Text>
          {CRITERIA.map((item) => (
            <View key={item.label} style={{ marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontSize: 13, color: Colors.navy }}>{item.icon} {item.label}</Text>
                <Text style={{ fontSize: 13, color: Colors.navy }}>{item.score.toFixed(1)}/5</Text>
              </View>
              <View style={{ height: 8, width: '100%' as any, backgroundColor: Colors.gray, borderRadius: 999 }}>
                <View style={{ width: item.fill as any, height: 8, backgroundColor: Colors.teal, borderRadius: 999 }} />
              </View>
            </View>
          ))}
        </View>

        <View style={{ backgroundColor: Colors.cream, borderRadius: 18, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: '#F4A261' }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy, marginBottom: 10 }}>🔒 Avis anonymes</Text>
          <Text style={{ fontSize: 13, color: Colors.muted, lineHeight: 20 }}>Les avis sont révélés uniquement après que les deux parties ont donné leur note. Cela garantit des retours honnêtes sans pression sociale.</Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy, marginBottom: 14 }}>Derniers avis reçus</Text>
          {REVIEWS.map((review, index) => (
            <View key={`${review.date}-${index}`} style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: Colors.gray }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.gray, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy }}>??</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.navy }}>Ancien colocataire</Text>
                  <Text style={{ fontSize: 11, color: Colors.muted }}>{review.date}</Text>
                </View>
                <Text style={{ fontSize: 13, color: Colors.teal }}>{'⭐'.repeat(review.rating)}</Text>
              </View>
              <Text style={{ fontSize: 13, color: Colors.navy, lineHeight: 20 }}>{review.comment}</Text>
            </View>
          ))}
        </View>

        <View style={{ backgroundColor: '#FFF3E0', borderRadius: 18, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: '#F4A261' }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy, marginBottom: 10 }}>⚠️ Fiabilité des engagements</Text>
          <Text style={{ fontSize: 13, color: Colors.navy, marginBottom: 10 }}>0 no-show · 0 annulation tardive</Text>
          <Text style={{ fontSize: 13, color: '#2E7D32', fontWeight: '700' }}>✅ Tu honores tous tes rendez-vous. Continue comme ça !</Text>
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: Colors.cream, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 24 }}>
        <TouchableOpacity onPress={() => Alert.alert('Avis', 'Sélectionne une ancienne colocation pour laisser ton avis.')} style={{ backgroundColor: Colors.navy, paddingVertical: 14, borderRadius: 14, alignItems: 'center' }}>
          <Text style={{ color: Colors.white, fontSize: 14, fontWeight: '800' }}>📝 Laisser un avis à un ancien colocataire</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
