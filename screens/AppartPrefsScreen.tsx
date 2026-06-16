import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Modal } from 'react-native';
import { Colors } from '../constants/theme';

export default function AppartPrefsScreen({ onNext, onBack }: any) {
  const [rooms, setRooms] = useState(3);
  const [budget, setBudget] = useState(1);
  const [typeBail, setTypeBail] = useState<'individuel' | 'unique' | null>(null);
  const [showInfoBail, setShowInfoBail] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 50 }}>
        <TouchableOpacity onPress={onBack} style={{ marginBottom: 14 }}>
          <Text style={{ color: Colors.muted, fontSize: 13 }}>← Retour</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.navy, marginBottom: 4 }}>Ton appartement idéal</Text>
        <Text style={{ fontSize: 11, color: Colors.muted, marginBottom: 18 }}>Ces infos nous aident à trouver le bon groupe pour toi</Text>

        <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>NOMBRE DE CHAMBRES</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 14 }}>
          {[2,3,4,5].map(n => (
            <TouchableOpacity key={n} onPress={() => setRooms(n)} style={{ flex: 1, backgroundColor: rooms===n ? Colors.tealLight : Colors.white, borderWidth: 1.5, borderColor: rooms===n ? Colors.teal : Colors.border, borderRadius: 10, paddingVertical: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: '800', color: rooms===n ? Colors.teal : Colors.navy }}>{n}</Text>
              <Text style={{ fontSize: 9, color: rooms===n ? Colors.teal : Colors.muted }}>chambres</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>VILLE</Text>
          <View style={{ backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.teal, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: Colors.navy, fontSize: 12 }}>Lyon</Text>
            <Text>✓</Text>
          </View>
        </View>

        <View style={{ marginBottom: 14 }}>
          <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>ARRONDISSEMENT</Text>
          <View style={{ backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11 }}>
            <Text style={{ color: '#C0B8AE', fontSize: 12 }}>Ex: Part-Dieu, Confluence...</Text>
          </View>
        </View>

        <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>BUDGET MENSUEL</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 18 }}>
          {['< 450€','450-550€','550-650€','+ 650€'].map((b,i) => (
            <TouchableOpacity key={i} onPress={() => setBudget(i)} style={{ flex: 1, backgroundColor: budget===i ? Colors.tealLight : Colors.white, borderWidth: 1.5, borderColor: budget===i ? Colors.teal : Colors.border, borderRadius: 10, paddingVertical: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 9, color: budget===i ? Colors.teal : Colors.muted, fontWeight: '600' }}>{b}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Type de bail */}
        <View style={{ marginBottom: 18 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase' }}>TYPE DE BAIL SOUHAITÉ</Text>
            <TouchableOpacity onPress={() => setShowInfoBail(true)}>
              <Text style={{ fontSize: 11, color: Colors.teal, fontWeight: '600' }}>C'est quoi ? ℹ️</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setTypeBail('individuel')} style={{ backgroundColor: typeBail === 'individuel' ? Colors.tealLight : Colors.white, borderWidth: 1.5, borderColor: typeBail === 'individuel' ? Colors.teal : Colors.border, borderRadius: 12, padding: 14, marginBottom: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: typeBail === 'individuel' ? Colors.teal : Colors.border, alignItems: 'center', justifyContent: 'center' }}>
                {typeBail === 'individuel' && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.teal }} />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.navy, marginBottom: 2 }}>📄 Bail individuel par chambre</Text>
                <Text style={{ fontSize: 11, color: Colors.muted, lineHeight: 16 }}>Chaque coloc signe son propre contrat. Plus de flexibilité si quelqu'un part.</Text>
              </View>
            </View>
            {typeBail === 'individuel' && (
              <View style={{ backgroundColor: Colors.teal + '15', borderRadius: 8, padding: 8, marginTop: 10 }}>
                <Text style={{ fontSize: 10, color: Colors.teal }}>✓ Option par défaut sur Nestmate — la plus courante en colocation</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTypeBail('unique')} style={{ backgroundColor: typeBail === 'unique' ? Colors.tealLight : Colors.white, borderWidth: 1.5, borderColor: typeBail === 'unique' ? Colors.teal : Colors.border, borderRadius: 12, padding: 14 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: typeBail === 'unique' ? Colors.teal : Colors.border, alignItems: 'center', justifyContent: 'center' }}>
                {typeBail === 'unique' && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.teal }} />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.navy, marginBottom: 2 }}>📋 Bail unique pour tout le groupe</Text>
                <Text style={{ fontSize: 11, color: Colors.muted, lineHeight: 16 }}>Tout le groupe signe ensemble. Plus de solidarité, mais engagement collectif.</Text>
              </View>
            </View>
            {typeBail === 'unique' && (
              <View style={{ backgroundColor: '#FFF3E0', borderRadius: 8, padding: 8, marginTop: 10 }}>
                <Text style={{ fontSize: 10, color: Colors.gold }}>⚠️ Si un membre part, les autres restent solidaires du loyer total</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onNext} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center', marginTop: 4 }}>
          <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>Continuer →</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal explication bail */}
      <Modal visible={showInfoBail} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{ backgroundColor: Colors.white, borderRadius: 20, padding: 24, paddingBottom: 40 }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: Colors.navy, marginBottom: 16 }}>Les types de bail en colocation</Text>

            <View style={{ backgroundColor: Colors.tealLight, borderRadius: 14, padding: 14, marginBottom: 14 }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.teal, marginBottom: 8 }}>📄 Bail individuel par chambre</Text>
              {['Chaque colocataire signe un contrat séparé avec le propriétaire','Si un coloc part, son bail s\'arrête sans impacter les autres','Plus flexible — idéal pour des groupes qui se connaissent moins','Option par défaut sur Nestmate'].map((t, i) => (
                <View key={i} style={{ flexDirection: 'row', gap: 8, marginBottom: 4 }}>
                  <Text style={{ color: Colors.teal }}>✓</Text>
                  <Text style={{ fontSize: 11, color: Colors.navy, flex: 1 }}>{t}</Text>
                </View>
              ))}
            </View>

            <View style={{ backgroundColor: '#FFF3E0', borderRadius: 14, padding: 14, marginBottom: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.gold, marginBottom: 8 }}>📋 Bail unique pour le groupe</Text>
              {['Tout le groupe signe un seul contrat collectif','Si un membre part, les autres sont solidaires du loyer total','Engagement plus fort — idéal pour des groupes déjà soudés','Le propriétaire a une garantie plus forte'].map((t, i) => (
                <View key={i} style={{ flexDirection: 'row', gap: 8, marginBottom: 4 }}>
                  <Text style={{ color: Colors.gold }}>•</Text>
                  <Text style={{ fontSize: 11, color: Colors.navy, flex: 1 }}>{t}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity onPress={() => setShowInfoBail(false)} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center' }}>
              <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>Compris !</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
