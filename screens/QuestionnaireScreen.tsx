import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../constants/theme';

const SESSIONS = [
  {
    id: 1,
    title: 'Ton rythme de vie',
    emoji: '🌙',
    duration: '5 min',
    color: Colors.teal,
    questions: [
      { q: 'Tu rentres à la maison le soir vers quelle heure ?', opts: ['Avant 19h', '19h–21h', 'Après 21h', 'Ça varie'] },
      { q: 'Le week-end, tu te lèves plutôt...', opts: ['Avant 8h', 'Entre 8h et 10h', 'Après 10h', 'Pas de routine'] },
      { q: 'Tu travailles ou étudies depuis chez toi ?', opts: ['Jamais', 'Parfois', 'Souvent', 'Toujours'] },
      { q: 'Le soir, il t\'arrive d\'inviter des amis sans prévenir ?', opts: ['Jamais', 'Rarement', 'Parfois', 'Souvent'] },
    ],
  },
  {
    id: 2,
    title: 'Chez toi, c\'est comment ?',
    emoji: '🧹',
    duration: '5 min',
    color: '#6C63FF',
    questions: [
      { q: 'Après avoir cuisiné, tu fais la vaisselle...', opts: ['Tout de suite', 'Dans l\'heure', 'Le lendemain', 'Quand ça déborde'] },
      { q: 'Les espaces communs (salon, couloir), tu les ranges...', opts: ['Dès que c\'est en désordre', 'Une fois par jour', 'Le week-end', 'Quand quelqu\'un vient'] },
      { q: 'Tu as des allergies ou sensibilités ?', opts: ['Aucune', 'Animaux', 'Tabac', 'Produits chimiques'] },
      { q: 'Tu fumes ?', opts: ['Non', 'Parfois dehors', 'Oui dehors seulement', 'Oui'] },
    ],
  },
  {
    id: 3,
    title: 'Vivre ensemble',
    emoji: '🤝',
    duration: '5 min',
    color: Colors.gold,
    questions: [
      { q: 'Tu organises des soirées chez toi...', opts: ['Jamais', '1-2 fois/mois', 'Toutes les semaines', 'Très régulièrement'] },
      { q: 'Quelqu\'un peut dormir chez toi de temps en temps ?', opts: ['Non', 'Rarement', 'Oui parfois', 'Oui souvent'] },
      { q: 'Pour les courses communes, tu préfères...', opts: ['Chacun ses courses', 'Partager certains produits', 'Tout partager', 'Organiser une cagnotte'] },
      { q: 'Si un coloc te dérange, tu...', opts: ['En parles directement', 'Envoies un message', 'Attends que ça passe', 'Demandes à quelqu\'un d\'autre'] },
    ],
  },
];

export default function QuestionnaireScreen({ onNext, onBack }: any) {
  const [session, setSession] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sessionDone, setSessionDone] = useState<number[]>([]);
  const [showSessions, setShowSessions] = useState(true);

  const currentSession = SESSIONS[session];
  const currentQ = currentSession?.questions[qIndex];
  const totalQ = currentSession?.questions.length;
  const key = `${session}-${qIndex}`;

  const handleAnswer = (opt: string) => {
    setAnswers(prev => ({ ...prev, [key]: opt }));
  };

  const handleNext = () => {
    if (qIndex < totalQ - 1) {
      setQIndex(q => q + 1);
    } else {
      setSessionDone(prev => [...prev, session]);
      if (session < SESSIONS.length - 1) {
        setShowSessions(true);
      } else {
        onNext();
      }
    }
  };

  const startSession = (i: number) => {
    setSession(i);
    setQIndex(0);
    setShowSessions(false);
  };

  if (showSessions) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
        <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 50 }}>
          <TouchableOpacity onPress={onBack} style={{ marginBottom: 18 }}>
            <Text style={{ color: Colors.muted, fontSize: 13 }}>← Retour</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.navy, marginBottom: 4 }}>Questionnaire de compatibilité</Text>
          <Text style={{ fontSize: 12, color: Colors.muted, marginBottom: 24, lineHeight: 18 }}>3 sessions courtes de 5 min chacune. Tu peux faire des pauses entre chaque.</Text>

          {SESSIONS.map((s, i) => {
            const done = sessionDone.includes(i);
            const locked = i > 0 && !sessionDone.includes(i - 1);
            return (
              <TouchableOpacity key={i} onPress={() => !locked && startSession(i)} activeOpacity={locked ? 1 : 0.8} style={{ backgroundColor: Colors.white, borderRadius: 16, padding: 18, marginBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 14, opacity: locked ? 0.5 : 1, borderWidth: done ? 2 : 0, borderColor: Colors.teal }}>
                <View style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: done ? Colors.tealLight : Colors.gray, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 24 }}>{done ? '✅' : s.emoji}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy, marginBottom: 2 }}>Session {i + 1} — {s.title}</Text>
                  <Text style={{ fontSize: 11, color: Colors.muted }}>⏱ {s.duration} · {s.questions.length} questions</Text>
                </View>
                <Text style={{ fontSize: 20, color: locked ? Colors.muted : Colors.teal }}>{locked ? '🔒' : done ? '✓' : '›'}</Text>
              </TouchableOpacity>
            );
          })}

          {sessionDone.length === SESSIONS.length && (
            <TouchableOpacity onPress={onNext} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center', marginTop: 8 }}>
              <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>Voir mon analyse IA →</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 50 }}>
        <TouchableOpacity onPress={() => setShowSessions(true)} style={{ marginBottom: 18 }}>
          <Text style={{ color: Colors.muted, fontSize: 13 }}>← Sessions</Text>
        </TouchableOpacity>

        {/* Progress */}
        <View style={{ height: 4, backgroundColor: Colors.gray, borderRadius: 2, marginBottom: 6, overflow: 'hidden' }}>
          <View style={{ height: 4, backgroundColor: currentSession.color, borderRadius: 2, width: `${((qIndex + 1) / totalQ) * 100}%` as any }} />
        </View>
        <Text style={{ fontSize: 10, color: Colors.muted, marginBottom: 20 }}>Session {session + 1}/3 · Question {qIndex + 1}/{totalQ}</Text>

        <Text style={{ fontSize: 32, marginBottom: 10 }}>{currentSession.emoji}</Text>
        <Text style={{ fontSize: 20, fontWeight: '800', color: Colors.navy, marginBottom: 20, lineHeight: 26 }}>{currentQ.q}</Text>

        <View style={{ gap: 10, marginBottom: 20 }}>
          {currentQ.opts.map((opt, i) => {
            const selected = answers[key] === opt;
            return (
              <TouchableOpacity key={i} onPress={() => handleAnswer(opt)} style={{ backgroundColor: selected ? Colors.navy : Colors.white, borderRadius: 12, padding: 14, borderWidth: 1.5, borderColor: selected ? Colors.navy : Colors.border }}>
                <Text style={{ fontSize: 13, fontWeight: selected ? '700' : '500', color: selected ? Colors.white : Colors.navy }}>{opt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity onPress={handleNext} disabled={!answers[key]} style={{ backgroundColor: answers[key] ? Colors.teal : Colors.gray, borderRadius: 12, paddingVertical: 13, alignItems: 'center' }}>
          <Text style={{ color: answers[key] ? Colors.white : Colors.muted, fontWeight: '700', fontSize: 14 }}>
            {qIndex < totalQ - 1 ? 'Question suivante →' : 'Terminer la session ✓'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
