import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../constants/theme';
import { MemberCard, ScoreBar } from '../components/UI';

const MEMBERS = [
  { avatar: '👩‍🎓', name: 'Léa, 22 ans', tags: ['Calme', 'Matinale'], score: '96%', bg: '#E8F4FF' },
  { avatar: '👨‍💻', name: 'Tom, 24 ans', tags: ['Gaming', 'Cuisine'], score: '91%', bg: '#FFF0E8' },
  { avatar: '🧑‍🎨', name: 'Camille, 23 ans', tags: ['Art', 'Yoga'], score: '89%', bg: '#F0E8FF' },
];

export default function GroupeProposeScreen({ onAccept, onRefuse, onMemberPress }: any) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 18, paddingTop: 50, paddingBottom: 44, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <Text style={{ fontSize: 9, color: Colors.teal, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>GROUPE PROPOSÉ PAR L'IA</Text>
        <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 3 }}>Ton match idéal 🎯</Text>
        <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>3 colocataires · 92% de compatibilité</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 20 }}>
        <View style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ width: 36, height: 36, backgroundColor: Colors.tealLight, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16 }}>🏆</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 10, color: Colors.muted, marginBottom: 2 }}>Score de compatibilité global</Text>
            <Text style={{ fontSize: 24, fontWeight: '800', color: Colors.teal }}>92%</Text>
          </View>
        </View>
        <View style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 14 }}>
          <ScoreBar label="Compatibilité habitudes de vie" value={38} max={40} />
          <ScoreBar label="Compatibilité logement" value={28} max={30} color="#6C63FF" />
          <ScoreBar label="Intérêts communs" value={18} max={20} color={Colors.gold} />
          <ScoreBar label="Réputation Nestmate" value={8} max={10} color={Colors.red} />
        </View>
        <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>LES MEMBRES DU GROUPE</Text>
        {MEMBERS.map(m => <MemberCard key={m.name} {...m} onPress={() => onMemberPress(m.name)} />)}
        <View style={{ height: 100 }} />
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', gap: 8, padding: 16, paddingBottom: 34, backgroundColor: Colors.cream }}>
        <TouchableOpacity onPress={onRefuse} style={{ flex: 1, backgroundColor: Colors.white, borderWidth: 1.5, borderColor: '#F0C0BD', borderRadius: 12, paddingVertical: 14, alignItems: 'center' }}>
          <Text style={{ color: Colors.red, fontSize: 14, fontWeight: '600' }}>✕ Refuser</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onAccept} style={{ flex: 2, backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 14, alignItems: 'center' }}>
          <Text style={{ color: Colors.white, fontSize: 14, fontWeight: '700' }}>✓ Rejoindre le groupe</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
