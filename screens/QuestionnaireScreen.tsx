import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../constants/theme';

const QUESTIONS = [
  { emoji: '🌙', title: 'Tes horaires de vie', sub: 'Pour éviter les conflits au quotidien', items: [
    { q: 'Couche-toi généralement', opts: ['Avant 22h', '22h–minuit', 'Après minuit'] },
    { q: 'Lève-toi le week-end', opts: ['Avant 8h', '8h–10h', 'Après 10h'] },
  ]},
  { emoji: '🧹', title: 'Ton rapport à la propreté', sub: 'Soyons honnêtes !', items: [
    { q: 'Ménage de la cuisine', opts: ['Après chaque repas', 'Une fois/jour', 'Quand ça déborde'] },
    { q: 'Rangement espaces communs', opts: ['Immédiatement', 'Dans la journée', 'Le week-end'] },
  ]},
  { emoji: '🎉', title: 'Vie sociale à la maison', sub: 'Tes habitudes avec les invités', items: [
    { q: 'Invités à la maison', opts: ['Rarement', 'Parfois', 'Souvent'] },
    { q: 'Soirées chez toi', opts: ['Jamais', '1-2/mois', 'Toutes les semaines'] },
  ]},
];

export default function QuestionnaireScreen({ onNext, onBack }: any) {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const q = QUESTIONS[page];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 50 }}>
        <TouchableOpacity onPress={page > 0 ? () => setPage(p => p-1) : onBack} style={{ marginBottom: 10 }}>
          <Text style={{ color: Colors.muted, fontSize: 13 }}>← Retour</Text>
        </TouchableOpacity>
        <View style={{ height: 4, backgroundColor: Colors.border, borderRadius: 2, marginBottom: 22, overflow: 'hidden' }}>
          <View style={{ height: 4, backgroundColor: Colors.teal, borderRadius: 2, width: `${((page+1)/QUESTIONS.length)*100}%` as any }} />
        </View>
        <Text style={{ fontSize: 38, marginBottom: 8 }}>{q.emoji}</Text>
        <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.navy, marginBottom: 4 }}>{q.title}</Text>
        <Text style={{ fontSize: 11, color: Colors.muted, marginBottom: 16 }}>{q.sub}</Text>
        {q.items.map((item, ii) => (
          <View key={ii} style={{ backgroundColor: Colors.white, borderRadius: 13, padding: 14, marginBottom: 10 }}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: Colors.navy, marginBottom: 10 }}>{item.q}</Text>
            <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
              {item.opts.map(opt => {
                const key = `${page}-${ii}`;
                const on = answers[key] === opt;
                return (
                  <TouchableOpacity key={opt} onPress={() => setAnswers(prev => ({ ...prev, [key]: opt }))} style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: on ? Colors.navy : Colors.gray }}>
                    <Text style={{ fontSize: 11, fontWeight: '600', color: on ? Colors.white : Colors.navy }}>{opt}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
        <TouchableOpacity onPress={page < QUESTIONS.length-1 ? () => setPage(p => p+1) : onNext} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center', marginTop: 10 }}>
          <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>{page < QUESTIONS.length-1 ? 'Question suivante →' : 'Terminer le questionnaire'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
