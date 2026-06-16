import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../constants/theme';

const QUESTIONS_CHECKIN = [
  { q: 'Comment se passe la colocation jusqu\'ici ?', opts: ['😍 Super bien', '🙂 Bien', '😐 Moyen', '😟 Difficile'] },
  { q: 'Y a-t-il des tensions dans le groupe ?', opts: ['Non, tout va bien', 'De petites frictions', 'Oui, des conflits', 'Je préfère ne pas dire'] },
  { q: 'La répartition des tâches est-elle respectée ?', opts: ['Oui, parfaitement', 'Mostly yes', 'Pas vraiment', 'Non'] },
  { q: 'Recommanderais-tu Nestmate à un ami ?', opts: ['Oui, absolument', 'Probablement', 'Pas sûr', 'Non'] },
];

export default function CheckInScreen({ onNext, onBack, jour = 30 }: any) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const allAnswered = Object.keys(answers).length === QUESTIONS_CHECKIN.length;

  if (submitted) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.navy, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Text style={{ fontSize: 56, marginBottom: 16 }}>🎉</Text>
        <Text style={{ fontSize: 24, fontWeight: '800', color: Colors.white, marginBottom: 8, textAlign: 'center' }}>Merci pour ton retour !</Text>
        <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 32, lineHeight: 20 }}>Tes réponses nous aident à améliorer l'expérience de tous les colocataires Nestmate</Text>
        <View style={{ backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: 16, width: '100%', marginBottom: 24 }}>
          <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.teal, marginBottom: 8 }}>Prochain check-in</Text>
          <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>À J+{jour === 30 ? 90 : 180} — dans {jour === 30 ? 60 : 90} jours</Text>
        </View>
        <TouchableOpacity onPress={onNext} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center', width: '100%' }}>
          <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>Retour au groupe →</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 50 }}>
        <TouchableOpacity onPress={onBack} style={{ marginBottom: 18 }}>
          <Text style={{ color: Colors.muted, fontSize: 13 }}>← Retour</Text>
        </TouchableOpacity>

        <View style={{ backgroundColor: Colors.teal, borderRadius: 14, padding: 16, marginBottom: 24, flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <Text style={{ fontSize: 32 }}>📋</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: '800', color: Colors.white, marginBottom: 2 }}>Check-in J+{jour}</Text>
            <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Comment se passe ta colocation ?</Text>
          </View>
        </View>

        <Text style={{ fontSize: 13, color: Colors.muted, marginBottom: 24, lineHeight: 18 }}>
          4 questions rapides pour s'assurer que tout va bien. Tes réponses sont anonymisées.
        </Text>

        {QUESTIONS_CHECKIN.map((q, i) => (
          <View key={i} style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy, marginBottom: 12 }}>{q.q}</Text>
            <View style={{ gap: 8 }}>
              {q.opts.map((opt, j) => {
                const selected = answers[i] === opt;
                return (
                  <TouchableOpacity key={j} onPress={() => setAnswers(prev => ({ ...prev, [i]: opt }))} style={{ backgroundColor: selected ? Colors.navy : Colors.white, borderRadius: 12, padding: 14, borderWidth: 1.5, borderColor: selected ? Colors.navy : Colors.border }}>
                    <Text style={{ fontSize: 13, fontWeight: selected ? '700' : '500', color: selected ? Colors.white : Colors.navy }}>{opt}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <TouchableOpacity onPress={() => setSubmitted(true)} disabled={!allAnswered} style={{ backgroundColor: allAnswered ? Colors.teal : Colors.gray, borderRadius: 12, paddingVertical: 13, alignItems: 'center', marginTop: 8 }}>
          <Text style={{ color: allAnswered ? Colors.white : Colors.muted, fontWeight: '700', fontSize: 14 }}>Envoyer mon retour →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
