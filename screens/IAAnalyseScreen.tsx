import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { Colors } from '../constants/theme';

const STEPS = [
  { icon: '🧬', title: 'Analyse du profil', sub: 'Valeurs, habitudes, personnalité', weight: '40%', color: Colors.teal },
  { icon: '🏠', title: 'Compatibilité logement', sub: 'Budget, quartier, disponibilité', weight: '30%', color: '#6C63FF' },
  { icon: '🎯', title: 'Intérêts communs', sub: 'Loisirs, style de vie, rythme', weight: '20%', color: Colors.gold },
  { icon: '⭐', title: 'Réputation Nestmate', sub: 'Avis des groupes précédents', weight: '10%', color: Colors.red },
];

export default function IAAnalyseScreen({ onNext }: any) {
  const progress = useRef(new Animated.Value(0)).current;
  const [activeStep, setActiveStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    Animated.timing(progress, { toValue: 1, duration: 3200, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start(() => { setDone(true); setTimeout(onNext, 600); });
    const timers = STEPS.map((_, i) => setTimeout(() => setActiveStep(i), i * 800 + 200));
    return () => timers.forEach(clearTimeout);
  }, []);

  const progressWidth = progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={{ flex: 1, backgroundColor: Colors.navy, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <View style={{ position: 'absolute', width: 300, height: 300, backgroundColor: Colors.teal, borderRadius: 150, opacity: 0.06, top: -100 }} />
      <Text style={{ fontSize: 52, marginBottom: 14 }}>🤖</Text>
      <Text style={{ fontSize: 26, fontWeight: '800', color: Colors.white, marginBottom: 8, textAlign: 'center' }}>Analyse en cours…</Text>
      <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 30, lineHeight: 18 }}>Notre algorithme croise{'\n'}des centaines de paramètres</Text>
      <View style={{ width: '100%', marginBottom: 24 }}>
        {STEPS.map((step, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 10, borderRadius: 12, marginBottom: 8, backgroundColor: i <= activeStep ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.04)' }}>
            <View style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: step.color + '28', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 14 }}>{step.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: Colors.white, marginBottom: 1 }}>{step.title}</Text>
              <Text style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>{step.sub}</Text>
            </View>
            <View style={{ paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.08)' }}>
              <Text style={{ color: step.color, fontSize: 9, fontWeight: '700' }}>{step.weight}</Text>
            </View>
            <Text style={{ fontSize: 14, marginLeft: 4 }}>{i < activeStep ? '✅' : i === activeStep ? '⏳' : '⬜'}</Text>
          </View>
        ))}
      </View>
      <View style={{ width: '100%', height: 3, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
        <Animated.View style={{ height: 3, backgroundColor: Colors.teal, borderRadius: 2, width: progressWidth }} />
      </View>
      {done && <Text style={{ color: Colors.teal, fontSize: 13, fontWeight: '700', marginTop: 12 }}>✓ Groupe trouvé !</Text>}
    </View>
  );
}
