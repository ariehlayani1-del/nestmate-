import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Alert } from 'react-native';
import { Colors } from '../constants/theme';

const CRITERIA = [
  { key: 'rythme', icon: '🌙', label: 'Rythme de vie', question: 'Les horaires de chacun sont compatibles ?' },
  { key: 'organisation', icon: '🧹', label: 'Organisation', question: 'La répartition des tâches fonctionne ?' },
  { key: 'ambiance', icon: '🤝', label: 'Ambiance', question: 'L\'entente générale est bonne ?' },
  { key: 'communication', icon: '💬', label: 'Communication', question: 'On se parle facilement en cas de problème ?' },
];

const MOODS = [
  { emoji: '😊', label: 'Tout va bien', key: 'good' },
  { emoji: '😐', label: 'Quelques ajustements', key: 'neutral' },
  { emoji: '😟', label: 'Ça coince', key: 'bad' },
];

export default function CheckInScreen({ onNext, onBack, jour = 30 }: { onNext: () => void; onBack: () => void; jour?: 30 | 90 }) {
  const [scores, setScores] = useState({ rythme: 0, organisation: 0, ambiance: 0, communication: 0 });
  const [mood, setMood] = useState<string | null>(null);
  const [text, setText] = useState('');

  const handleScore = (criteriaKey: string, value: number) => {
    setScores(prev => ({ ...prev, [criteriaKey]: value }));
  };

  const allScoresFilled = Object.values(scores).every(score => score > 0);
  const isValid = allScoresFilled && mood !== null;

  const handleValidate = () => {
    Alert.alert('Merci ! Ton check-in a bien été enregistré 🙌', '', [{ text: 'OK', onPress: onNext }]);
  };

  const badgeColor = jour === 90 ? Colors.teal : '#FF9500';
  const badgeBg = jour === 90 ? 'rgba(58, 191, 165, 0.15)' : 'rgba(255, 149, 0, 0.15)';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 18, paddingTop: 50, paddingBottom: 28, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
          {/* Badge */}
          <View style={{ alignSelf: 'flex-start', backgroundColor: badgeBg, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginBottom: 12 }}>
            <Text style={{ fontSize: 11, fontWeight: '700', color: badgeColor, letterSpacing: 0.5, textTransform: 'uppercase' }}>Check-in J+{jour}</Text>
          </View>

          <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 6 }}>Comment se passe ta coloc ?</Text>
          <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 16 }}>Tes réponses sont anonymes et aident à améliorer les matchings futurs</Text>
        </View>

        {/* Évaluation par critère */}
        <View style={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 8 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Évaluation</Text>

          {CRITERIA.map(criteria => (
            <View key={criteria.key} style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 12, shadowColor: Colors.navy, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
              {/* Criteria Header */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 18 }}>{criteria.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.navy }}>{criteria.label}</Text>
                  <Text style={{ fontSize: 11, color: Colors.muted, marginTop: 2 }}>{criteria.question}</Text>
                </View>
              </View>

              {/* Stars */}
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {[1, 2, 3, 4, 5].map(star => {
                  const isActive = scores[criteria.key as keyof typeof scores] >= star;
                  return (
                    <TouchableOpacity
                      key={star}
                      onPress={() => handleScore(criteria.key, star)}
                      style={{ flex: 1 }}
                    >
                      <Text style={{ fontSize: 32, textAlign: 'center', color: isActive ? '#FFD700' : Colors.gray }}>
                        {isActive ? '★' : '☆'}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </View>

        {/* Question ouverte */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>Avis personnel</Text>

          <View style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 20, shadowColor: Colors.navy, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.navy, marginBottom: 10 }}>Un mot sur ta coloc en ce moment ?</Text>
            <TextInput
              multiline
              numberOfLines={3}
              placeholder="Tout se passe bien, on a nos habitudes..."
              placeholderTextColor={Colors.muted}
              value={text}
              onChangeText={setText}
              style={{
                fontSize: 12,
                color: Colors.navy,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: Colors.border,
                paddingHorizontal: 12,
                paddingVertical: 10,
                fontFamily: 'System',
                textAlignVertical: 'top',
              }}
            />
            <Text style={{ fontSize: 10, color: Colors.muted, marginTop: 8 }}>Optionnel</Text>
          </View>
        </View>

        {/* Indicateur d'humeur globale */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>Ressenti global</Text>

          <View style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 20, shadowColor: Colors.navy, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
            <View style={{ flexDirection: 'column', gap: 10 }}>
              {MOODS.map(m => (
                <TouchableOpacity
                  key={m.key}
                  onPress={() => setMood(m.key)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    paddingHorizontal: 14,
                    paddingVertical: 12,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: mood === m.key ? Colors.teal : Colors.gray,
                    backgroundColor: mood === m.key ? 'rgba(58, 191, 165, 0.08)' : Colors.cream,
                  }}
                >
                  <Text style={{ fontSize: 24 }}>{m.emoji}</Text>
                  <Text style={{ fontSize: 13, fontWeight: mood === m.key ? '700' : '500', color: mood === m.key ? Colors.teal : Colors.navy, flex: 1 }}>
                    {m.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Bouton Valider */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 20 }}>
          <TouchableOpacity
            onPress={handleValidate}
            disabled={!isValid}
            style={{
              backgroundColor: isValid ? Colors.teal : Colors.gray,
              borderRadius: 12,
              paddingVertical: 14,
              alignItems: 'center',
              opacity: isValid ? 1 : 0.5,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.white }}>Envoyer mon check-in</Text>
          </TouchableOpacity>
        </View>

        {/* Back button for mobile */}
        <TouchableOpacity
          onPress={onBack}
          style={{ marginTop: 8, paddingHorizontal: 16, paddingBottom: 20 }}
        >
          <Text style={{ fontSize: 13, color: Colors.muted, textAlign: 'center', fontWeight: '500' }}>Retour</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
