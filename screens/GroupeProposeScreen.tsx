import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Modal } from 'react-native';
import { Colors } from '../constants/theme';
import { MemberCard, ScoreBar } from '../components/UI';

const MEMBRES = [
  { avatar: '👩‍🎓', name: 'Léa, 22 ans', tags: ['Calme', 'Matinale'], score: '96%', bg: '#E8F4FF' },
  { avatar: '👨‍💻', name: 'Tom, 24 ans', tags: ['Gaming', 'Cuisine'], score: '91%', bg: '#FFF0E8' },
  { avatar: '🧑‍🎨', name: 'Camille, 23 ans', tags: ['Art', 'Yoga'], score: '89%', bg: '#F0E8FF' },
];

const STATUTS = [
  { emoji: '🟡', label: 'Proposé', desc: 'L\'IA a formé ce groupe' },
  { emoji: '🟠', label: 'En discussion', desc: 'Vous échangez ensemble' },
  { emoji: '🟢', label: 'Confirmé', desc: 'Tout le monde a accepté' },
  { emoji: '🔵', label: 'Signé', desc: 'Bail signé' },
];

const AUTRES_RAISONS = [
  'Le budget ne correspond pas',
  'Les horaires sont incompatibles',
  'Trop loin de mon travail',
  'Je veux des profils différents',
  'Autre raison',
];

export default function GroupeProposeScreen({ onAccept, onRefuse, onMemberPress }: any) {
  const [showAutreGroupe, setShowAutreGroupe] = useState(false);
  const [selectedRaison, setSelectedRaison] = useState('');
  const [statutActuel] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      {/* Header */}
      <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 18, paddingTop: 50, paddingBottom: 44, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <Text style={{ fontSize: 9, color: Colors.teal, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>GROUPE PROPOSÉ PAR L'IA</Text>
        <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 3 }}>Ton match idéal 🎯</Text>
        <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>3 colocataires · 92% de compatibilité</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 20 }}>

        {/* Statuts */}
        <View style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 14 }}>
          <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>STATUT DU GROUPE</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {STATUTS.map((s, i) => (
              <View key={i} style={{ alignItems: 'center', flex: 1 }}>
                <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: i === statutActuel ? Colors.tealLight : Colors.gray, alignItems: 'center', justifyContent: 'center', marginBottom: 4, borderWidth: i === statutActuel ? 2 : 0, borderColor: Colors.teal }}>
                  <Text style={{ fontSize: 14 }}>{s.emoji}</Text>
                </View>
                <Text style={{ fontSize: 8, fontWeight: i === statutActuel ? '700' : '400', color: i === statutActuel ? Colors.teal : Colors.muted, textAlign: 'center' }}>{s.label}</Text>
              </View>
            ))}
          </View>
          <View style={{ height: 2, backgroundColor: Colors.gray, borderRadius: 1, marginTop: 8, overflow: 'hidden' }}>
            <View style={{ height: 2, backgroundColor: Colors.teal, width: `${((statutActuel + 1) / STATUTS.length) * 100}%` as any }} />
          </View>
        </View>

        {/* Score */}
        <View style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ width: 36, height: 36, backgroundColor: Colors.tealLight, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16 }}>🏆</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 10, color: Colors.muted, marginBottom: 2 }}>Score de compatibilité global</Text>
            <Text style={{ fontSize: 24, fontWeight: '800', color: Colors.teal }}>92%</Text>
          </View>
        </View>

        {/* Barres */}
        <View style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 14 }}>
          <ScoreBar label="🧬 Habitudes de vie" value={38} max={40} />
          <ScoreBar label="🏠 Compatibilité logement" value={28} max={30} color="#6C63FF" />
          <ScoreBar label="🎯 Intérêts communs" value={18} max={20} color={Colors.gold} />
          <ScoreBar label="⭐ Réputation Nestmate" value={8} max={10} color={Colors.red} />
        </View>

        {/* Membres */}
        <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>LES MEMBRES</Text>
        {MEMBRES.map(m => <MemberCard key={m.name} {...m} onPress={() => onMemberPress(m.name)} />)}

        {/* Icebreakers */}
        <View style={{ backgroundColor: Colors.tealLight, borderRadius: 14, padding: 14, marginBottom: 14 }}>
          <Text style={{ fontSize: 11, fontWeight: '700', color: Colors.teal, marginBottom: 8 }}>💬 Icebreakers suggérés</Text>
          {['Vous aimez tous les 3 la cuisine — qui cuisine le mieux ?', 'Léa et toi êtes tous les deux matinaux 🌅', 'Tom fait du gaming, et toi ?'].map((ice, i) => (
            <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 10, padding: 10, marginBottom: 6 }}>
              <Text style={{ fontSize: 11, color: Colors.navy }}>{ice}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Actions */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 34, backgroundColor: Colors.cream, gap: 8 }}>
        <TouchableOpacity onPress={onAccept} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 14, alignItems: 'center' }}>
          <Text style={{ color: Colors.white, fontSize: 14, fontWeight: '700' }}>✓ Rejoindre ce groupe</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity onPress={() => setShowAutreGroupe(true)} style={{ flex: 1, backgroundColor: Colors.white, borderRadius: 12, paddingVertical: 12, alignItems: 'center', borderWidth: 1.5, borderColor: Colors.border }}>
            <Text style={{ color: Colors.navy, fontSize: 12, fontWeight: '600' }}>🔄 Autre groupe</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onRefuse} style={{ flex: 1, backgroundColor: Colors.white, borderRadius: 12, paddingVertical: 12, alignItems: 'center', borderWidth: 1.5, borderColor: '#F0C0BD' }}>
            <Text style={{ color: Colors.red, fontSize: 12, fontWeight: '600' }}>✕ Refuser</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal autre groupe */}
      <Modal visible={showAutreGroupe} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{ backgroundColor: Colors.white, borderRadius: 20, padding: 24, paddingBottom: 40 }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: Colors.navy, marginBottom: 4 }}>Pourquoi tu veux un autre groupe ?</Text>
            <Text style={{ fontSize: 12, color: Colors.muted, marginBottom: 18 }}>Ça aide l'IA à mieux comprendre tes besoins</Text>
            {AUTRES_RAISONS.map((r, i) => (
              <TouchableOpacity key={i} onPress={() => setSelectedRaison(r)} style={{ backgroundColor: selectedRaison === r ? Colors.tealLight : Colors.gray, borderRadius: 10, padding: 12, marginBottom: 8, borderWidth: selectedRaison === r ? 1.5 : 0, borderColor: Colors.teal }}>
                <Text style={{ fontSize: 13, color: selectedRaison === r ? Colors.teal : Colors.navy, fontWeight: selectedRaison === r ? '700' : '500' }}>{r}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => { setShowAutreGroupe(false); onRefuse(); }} style={{ backgroundColor: selectedRaison ? Colors.teal : Colors.gray, borderRadius: 12, paddingVertical: 13, alignItems: 'center', marginTop: 8 }}>
              <Text style={{ color: selectedRaison ? Colors.white : Colors.muted, fontWeight: '700', fontSize: 14 }}>Relancer l'analyse IA →</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowAutreGroupe(false)} style={{ alignItems: 'center', marginTop: 12 }}>
              <Text style={{ color: Colors.muted, fontSize: 12 }}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
