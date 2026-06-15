import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../constants/theme';
import { BottomNav, Tag, ScoreBar } from '../components/UI';

const AVIS = [
  { from: '👩‍🎓', name: 'Léa M.', score: 5, comment: 'Super coloc, très propre et ponctuel !', date: 'Juil. 2025', tags: ['Propreté', 'Ponctualité'] },
  { from: '👨‍🔬', name: 'Hugo T.', score: 4, comment: 'Agréable à vivre, un peu timide au début mais vraiment sympa.', date: 'Avr. 2025', tags: ['Ambiance', 'Respect'] },
];

const Stars = ({ n }: { n: number }) => (
  <View style={{ flexDirection: 'row', gap: 2 }}>
    {[1,2,3,4,5].map(i => <Text key={i} style={{ fontSize: 12, color: i <= n ? Colors.gold : '#E0D8D0' }}>★</Text>)}
  </View>
);

export default function ProfilReputationScreen({ onGroupe, onActivites, onNotifs, onVoisinage }: any) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={{ backgroundColor: Colors.navy, paddingBottom: 44, paddingTop: 50, paddingHorizontal: 18, alignItems: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginBottom: 20 }}>
          <View style={{ width: 72, height: 72, borderRadius: 36, borderWidth: 3, borderColor: Colors.teal, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(58,191,165,0.15)', marginBottom: 10 }}>
            <Text style={{ fontSize: 30 }}>🧑</Text>
          </View>
          <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 2 }}>Lucas M.</Text>
          <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>Lyon · DCG étudiant · 23 ans</Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <Tag label="✓ Identité vérifiée" color="teal" />
            <Tag label="✓ Étudiant vérifié" color="navy" />
          </View>
        </View>
        <View style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginHorizontal: 16, marginBottom: 14 }}>
          <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>RÉPUTATION NESTMATE</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <Text style={{ fontSize: 38, fontWeight: '800', color: Colors.navy }}>4.7</Text>
            <View>
              <Stars n={5} />
              <Text style={{ fontSize: 10, color: Colors.muted, marginTop: 3 }}>Basé sur 2 colocations</Text>
            </View>
          </View>
          <ScoreBar label="🧹 Propreté" value={4.8} max={5} />
          <ScoreBar label="💬 Communication" value={4.5} max={5} color="#6C63FF" />
          <ScoreBar label="⏰ Ponctualité" value={4.9} max={5} color={Colors.gold} />
          <ScoreBar label="🤝 Respect des règles" value={4.6} max={5} color={Colors.green} />
        </View>
        <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10, marginHorizontal: 16 }}>AVIS DES COLOCS</Text>
        {AVIS.map((a, i) => (
          <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 13, padding: 14, marginHorizontal: 16, marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 8 }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.tealLight, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16 }}>{a.from}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: Colors.navy }}>{a.name}</Text>
                <Stars n={a.score} />
              </View>
              <Text style={{ fontSize: 10, color: Colors.muted }}>{a.date}</Text>
            </View>
            <Text style={{ fontSize: 11, color: Colors.navy, lineHeight: 17, marginBottom: 8 }}>{a.comment}</Text>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              {a.tags.map(t => <Tag key={t} label={t} color="teal" />)}
            </View>
          </View>
        ))}
      </ScrollView>
      <BottomNav items={[
        { icon: '🏠', label: 'Groupe', onPress: onGroupe },
        { icon: '🗺️', label: 'Voisinage', onPress: onVoisinage },
        { icon: '🎯', label: 'Activités', onPress: onActivites },
        { icon: '🔔', label: 'Notifs', onPress: onNotifs },
        { icon: '👤', label: 'Profil', active: true },
      ]} />
    </SafeAreaView>
  );
}
