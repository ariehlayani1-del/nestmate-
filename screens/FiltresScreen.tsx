import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, Switch } from 'react-native';
import { Colors } from '../constants/theme';

const GROUP_OPTIONS = ['2 pers.', '3 pers.', '4 pers.', '5 pers.'];
const DISTANCE_OPTIONS = ['5 min', '10 min', '20 min', '30 min'];
const MOVE_OPTIONS = ['Dès maintenant', 'Dans 1 mois', 'Dans 3 mois'];

export default function FiltresScreen({ onBack }: any) {
  const [groupSize, setGroupSize] = useState('3 pers.');
  const [minBudget, setMinBudget] = useState('400');
  const [maxBudget, setMaxBudget] = useState('700');
  const [preferences, setPreferences] = useState({
    nonSmoker: true,
    animals: false,
    festive: false,
    lateNight: false,
    veryClean: false,
    sameField: false,
  });
  const [distance, setDistance] = useState('20 min');
  const [moveDate, setMoveDate] = useState('Dans 1 mois');

  const resetFilters = () => {
    setGroupSize('3 pers.');
    setMinBudget('400');
    setMaxBudget('700');
    setPreferences({
      nonSmoker: true,
      animals: false,
      festive: false,
      lateNight: false,
      veryClean: false,
      sameField: false,
    });
    setDistance('20 min');
    setMoveDate('Dans 1 mois');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 18, paddingTop: 48, paddingBottom: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={onBack}>
            <Text style={{ fontSize: 24, color: Colors.teal }}>✕</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: '800', color: Colors.white }}>Filtrer les annonces</Text>
          <TouchableOpacity onPress={resetFilters}>
            <Text style={{ fontSize: 13, color: Colors.teal, fontWeight: '700' }}>Réinitialiser</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 140 }}>
        <View style={{ marginBottom: 18 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy, marginBottom: 10 }}>Taille du groupe</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {GROUP_OPTIONS.map((option) => {
              const active = groupSize === option;
              return (
                <TouchableOpacity
                  key={option}
                  onPress={() => setGroupSize(option)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: active ? Colors.navy : '#D8D2C9',
                    backgroundColor: active ? Colors.navy : 'white',
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: '700', color: active ? Colors.white : Colors.navy }}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{ marginBottom: 18 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy, marginBottom: 10 }}>Budget mensuel (charges incluses)</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: '#E5E0D8' }}>
              <Text style={{ fontSize: 11, color: Colors.muted, marginBottom: 4 }}>Min 300€</Text>
              <TextInput
                value={minBudget}
                onChangeText={setMinBudget}
                keyboardType="numeric"
                style={{ fontSize: 14, color: Colors.navy, padding: 0 }}
              />
            </View>
            <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: '#E5E0D8' }}>
              <Text style={{ fontSize: 11, color: Colors.muted, marginBottom: 4 }}>Max 800€</Text>
              <TextInput
                value={maxBudget}
                onChangeText={setMaxBudget}
                keyboardType="numeric"
                style={{ fontSize: 14, color: Colors.navy, padding: 0 }}
              />
            </View>
          </View>
        </View>

        <View style={{ marginBottom: 18 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy, marginBottom: 10 }}>Préférences</Text>
          <View style={{ backgroundColor: 'white', borderRadius: 14, padding: 12, gap: 10 }}>
            {[
              { key: 'nonSmoker', label: '🚬 Non-fumeur uniquement' },
              { key: 'animals', label: '🐾 Animaux acceptés' },
              { key: 'festive', label: '🎉 Ambiance festive ok' },
              { key: 'lateNight', label: '🌙 Profils couche-tard' },
              { key: 'veryClean', label: '🧹 Très propre uniquement' },
              { key: 'sameField', label: '👩‍🎓 Même filière prioritaire' },
            ].map((item) => (
              <View key={item.key} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 13, color: Colors.navy }}>{item.label}</Text>
                <Switch
                  value={preferences[item.key as keyof typeof preferences]}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, [item.key]: value }))}
                  trackColor={{ false: '#D8D2C9', true: Colors.teal }}
                  thumbColor={preferences[item.key as keyof typeof preferences] ? Colors.navy : Colors.white}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={{ marginBottom: 18 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy, marginBottom: 10 }}>Distance max à mon école</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {DISTANCE_OPTIONS.map((option) => {
              const active = distance === option;
              return (
                <TouchableOpacity
                  key={option}
                  onPress={() => setDistance(option)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: active ? Colors.navy : '#D8D2C9',
                    backgroundColor: active ? Colors.navy : 'white',
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: '700', color: active ? Colors.white : Colors.navy }}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{ marginBottom: 18 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy, marginBottom: 10 }}>Disponible à partir de</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {MOVE_OPTIONS.map((option) => {
              const active = moveDate === option;
              return (
                <TouchableOpacity
                  key={option}
                  onPress={() => setMoveDate(option)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: active ? Colors.navy : '#D8D2C9',
                    backgroundColor: active ? Colors.navy : 'white',
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: '700', color: active ? Colors.white : Colors.navy }}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: Colors.cream, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 24, borderTopWidth: 1, borderTopColor: '#E5E0D8' }}>
        <TouchableOpacity onPress={onBack} style={{ backgroundColor: Colors.navy, paddingVertical: 14, borderRadius: 14, alignItems: 'center' }}>
          <Text style={{ color: Colors.white, fontSize: 14, fontWeight: '800' }}>Voir les annonces (12 résultats)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
