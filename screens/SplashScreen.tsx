import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { Colors } from '../constants/theme';

export default function SplashScreen({ onNext }: { onNext: () => void }) {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.85)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 6, useNativeDriver: true }),
    ]).start();
    const t = setTimeout(onNext, 2500);
    return () => clearTimeout(t);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.navy, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ position: 'absolute', width: 260, height: 260, backgroundColor: Colors.teal, borderRadius: 130, opacity: 0.07, top: -80, right: -80 }} />
      <View style={{ position: 'absolute', width: 180, height: 180, backgroundColor: Colors.teal, borderRadius: 90, opacity: 0.05, bottom: -60, left: -60 }} />
      <Animated.View style={{ opacity: fade, transform: [{ scale }], alignItems: 'center' }}>
        <View style={{ width: 72, height: 72, backgroundColor: Colors.teal, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 32 }}>🏠</Text>
        </View>
        <Text style={{ fontSize: 38, fontWeight: '800', color: Colors.white, letterSpacing: -1.5, marginBottom: 8 }}>nest<Text style={{ color: Colors.teal }}>mate</Text></Text>
        <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 40 }}>TROUVE TES COLOCATAIRES IDÉAUX</Text>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.teal }} />
          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.white, opacity: 0.4 }} />
          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.white, opacity: 0.2 }} />
        </View>
      </Animated.View>
    </View>
  );
}
