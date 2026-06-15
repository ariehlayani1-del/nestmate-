import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../constants/theme';

const INTERESTS = [
  { emoji: '🎵', label: 'Musique' }, { emoji: '🎮', label: 'Gaming' },
  { emoji: '🍳', label: 'Cuisine' }, { emoji: '🏋️', label: 'Sport' },
  { emoji: '📚', label: 'Lecture' }, { emoji: '🎨', label: 'Art' },
  { emoji: '🌿', label: 'Nature' }, { emoji: '✈️', label: 'Voyages' },
  { emoji: '🎬', label: 'Cinéma' }, { emoji: '🐾', label: 'Animaux' },
  { emoji: '🧘', label: 'Yoga' }, { emoji: '🎭', label: 'Théâtre' },
  { emoji: '🚴', label: 'Cyclisme' }, { emoji: '🍷', label: 'Gastronomie' },
  { emoji: '💻', label: 'Tech' }, { emoji: '🌱', label: 'Écologie' },
];

export default function InterestsScreen({ onNext, onBack }: any) {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (label: string) => setSelected(prev => prev.includes(label) ? prev.filter(i => i !== label) : prev.length < 5 ? [...prev, label] : prev);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 50 }}>
        <TouchableOpacity onPress={onBack} style={{ marginBottom: 12 }}>
          <Text style={{ color: Colors.muted, fontSize: 13 }}>← Retour</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.navy, marginBottom: 4 }}>Tes centres d'intérêt</Text>
        <Text style={{ fontSize: 11, color: Colors.muted, marginBottom: 16 }}>Choisis jusqu'à 5 — ils enrichissent ton score de compatibilité</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {INTERESTS.map(({ emoji, label }) => {
            const on = selected.includes(label);
            return (
              <TouchableOpacity key={label} onPress={() => toggle(label)} style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: on ? Colors.navy : Colors.white, borderWidth: 1.5, borderColor: on ? Colors.navy : Colors.border, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Text style={{ fontSize: 16 }}>{emoji}</Text>
                <Text style={{ fontSize: 11, fontWeight: '600', color: on ? Colors.white : Colors.navy }}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {selected.length > 0 && (
          <View style={{ backgroundColor: Colors.white, borderRadius: 12, padding: 12, marginBottom: 14 }}>
            <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>SÉLECTIONNÉS ({selected.length}/5)</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
              {selected.map(s => <View key={s} style={{ backgroundColor: Colors.tealLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 }}><Text style={{ color: Colors.teal, fontSize: 10, fontWeight: '600' }}>{s}</Text></View>)}
            </View>
          </View>
        )}
        <TouchableOpacity onPress={onNext} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center' }}>
          <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>Lancer l'analyse IA →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
