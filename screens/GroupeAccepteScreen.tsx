import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/theme';

export default function GroupeAccepteScreen({ onNext }: any) {
  const scale = useRef(new Animated.Value(0.5)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.navy, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <View style={{ position: 'absolute', width: 320, height: 320, backgroundColor: Colors.teal, borderRadius: 160, opacity: 0.06, top: -100 }} />
      <Animated.View style={{ alignItems: 'center', opacity, transform: [{ scale }], width: '100%' }}>
        <Text style={{ fontSize: 56, marginBottom: 12 }}>🎉</Text>
        <Text style={{ fontSize: 30, fontWeight: '800', color: Colors.teal, marginBottom: 6, letterSpacing: -1 }}>Groupe formé !</Text>
        <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textAlign: 'center', lineHeight: 20, marginBottom: 22 }}>Tous les membres ont accepté.{'\n'}Votre aventure commence !</Text>
        <View style={{ flexDirection: 'row', marginBottom: 22 }}>
          {['👩‍🎓','👨‍💻','🧑‍🎨','🧑'].map((a, i) => (
            <View key={i} style={{ width: 54, height: 54, borderRadius: 27, backgroundColor: 'rgba(58,191,165,0.2)', borderWidth: 3, borderColor: Colors.navy, alignItems: 'center', justifyContent: 'center', marginLeft: i > 0 ? -12 : 0 }}>
              <Text style={{ fontSize: 22 }}>{a}</Text>
            </View>
          ))}
        </View>
        <View style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 4, marginBottom: 10 }}>
          {[['Appartement','14 Rue Garibaldi, Lyon 6e'],['Loyer cc','480€ / pers / mois'],['Disponibilité','1er septembre 2025'],['Score groupe','92% compatibilité']].map(([l,v]) => (
            <View key={l} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' }}>
              <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{l}</Text>
              <Text style={{ fontSize: 11, fontWeight: '600', color: Colors.white }}>{v}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity onPress={onNext} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center', width: '100%', marginTop: 8 }}>
          <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>Voir mon espace groupe</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
