import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../constants/theme';

export default function AppartPrefsScreen({ onNext, onBack }: any) {
  const [rooms, setRooms] = useState(3);
  const [budget, setBudget] = useState(1);
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
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>ARRONDISSEMENT</Text>
          <View style={{ backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11 }}>
            <Text style={{ color: '#C0B8AE', fontSize: 12 }}>Ex: Part-Dieu, Confluence...</Text>
          </View>
        </View>
        <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>BUDGET MENSUEL</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 14 }}>
          {['< 450€','450-550€','550-650€','+ 650€'].map((b,i) => (
            <TouchableOpacity key={i} onPress={() => setBudget(i)} style={{ flex: 1, backgroundColor: budget===i ? Colors.tealLight : Colors.white, borderWidth: 1.5, borderColor: budget===i ? Colors.teal : Colors.border, borderRadius: 10, paddingVertical: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 9, color: budget===i ? Colors.teal : Colors.muted, fontWeight: '600' }}>{b}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={onNext} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center', marginTop: 8 }}>
          <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>Continuer</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
