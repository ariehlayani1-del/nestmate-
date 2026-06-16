import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Animated } from 'react-native';
import { Colors } from '../constants/theme';

const VILLES = [
  { nom: 'Lyon', chercheurs: 847, objectif: 1000, groupes: 12, actif: true },
  { nom: 'Paris', chercheurs: 2341, objectif: 3000, groupes: 48, actif: true },
  { nom: 'Bordeaux', chercheurs: 234, objectif: 500, groupes: 3, actif: false },
  { nom: 'Marseille', chercheurs: 412, objectif: 500, groupes: 7, actif: false },
  { nom: 'Toulouse', chercheurs: 189, objectif: 500, groupes: 2, actif: false },
];

const TEMOIGNAGES = [
  { avatar: '👩‍🎓', name: 'Léa, Lyon 6e', text: 'Groupe formé en 4 jours, on s\'entend super bien !', stars: 5 },
  { avatar: '👨‍💻', name: 'Tom, Paris 11e', text: 'L\'algo IA a vraiment bien cerné nos compatibilités.', stars: 5 },
  { avatar: '🧑‍🎨', name: 'Camille, Lyon 3e', text: 'Bien mieux que LeBonCoin, les profils sont vérifiés.', stars: 4 },
];

export default function ColdStartScreen({ onNext, onBack }: any) {
  const [villeSelectee, setVilleSelectee] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const ville = VILLES[villeSelectee];
  const pct = Math.round((ville.chercheurs / ville.objectif) * 100);
  const manquants = ville.objectif - ville.chercheurs;

  useEffect(() => {
    Animated.timing(progress, { toValue: pct / 100, duration: 800, useNativeDriver: false }).start();
  }, [villeSelectee]);

  const progressWidth = progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 50 }}>
        <TouchableOpacity onPress={onBack} style={{ marginBottom: 18 }}>
          <Text style={{ color: Colors.muted, fontSize: 13 }}>← Retour</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={{ backgroundColor: Colors.navy, borderRadius: 20, padding: 20, marginBottom: 24 }}>
          <Text style={{ fontSize: 9, color: Colors.teal, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>LANCEMENT NESTMATE</Text>
          <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 6, lineHeight: 28 }}>Rejoins le mouvement dans ta ville 🚀</Text>
          <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 18 }}>Plus on est nombreux, plus l'IA peut former des groupes compatibles rapidement.</Text>
        </View>

        {/* Sélecteur de villes */}
        <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>VILLES EN LANCEMENT</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, marginBottom: 20 }}>
          {VILLES.map((v, i) => (
            <TouchableOpacity key={i} onPress={() => { setVilleSelectee(i); progress.setValue(0); }} style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: villeSelectee === i ? Colors.navy : Colors.white, borderWidth: 1.5, borderColor: villeSelectee === i ? Colors.navy : Colors.border }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: villeSelectee === i ? Colors.white : Colors.navy }}>{v.nom} {v.actif ? '🟢' : '🟡'}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Barre de progression communautaire */}
        <View style={{ backgroundColor: Colors.white, borderRadius: 16, padding: 16, marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: '800', color: Colors.navy }}>{ville.chercheurs.toLocaleString()}</Text>
              <Text style={{ fontSize: 11, color: Colors.muted }}>chercheurs inscrits</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color: Colors.teal }}>{pct}%</Text>
              <Text style={{ fontSize: 11, color: Colors.muted }}>de l'objectif</Text>
            </View>
          </View>

          <View style={{ height: 12, backgroundColor: Colors.gray, borderRadius: 6, overflow: 'hidden', marginBottom: 8 }}>
            <Animated.View style={{ height: 12, backgroundColor: ville.actif ? Colors.teal : Colors.gold, borderRadius: 6, width: progressWidth }} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 10, color: Colors.muted }}>0</Text>
            <Text style={{ fontSize: 10, color: Colors.muted }}>Objectif : {ville.objectif.toLocaleString()} chercheurs</Text>
          </View>

          {!ville.actif && (
            <View style={{ backgroundColor: '#FFF3E0', borderRadius: 10, padding: 10, marginTop: 12 }}>
              <Text style={{ fontSize: 12, color: Colors.gold, fontWeight: '700', marginBottom: 2 }}>⏳ Ville en liste d'attente</Text>
              <Text style={{ fontSize: 11, color: Colors.navy }}>Plus que {manquants.toLocaleString()} chercheurs pour activer {ville.nom} !</Text>
            </View>
          )}

          {ville.actif && (
            <View style={{ backgroundColor: Colors.tealLight, borderRadius: 10, padding: 10, marginTop: 12 }}>
              <Text style={{ fontSize: 12, color: Colors.teal, fontWeight: '700', marginBottom: 2 }}>✅ Ville active — {ville.groupes} groupes formés</Text>
              <Text style={{ fontSize: 11, color: Colors.navy }}>Les groupes se forment en moyenne en 3-5 jours</Text>
            </View>
          )}
        </View>

        {/* File d'attente estimée */}
        <View style={{ backgroundColor: Colors.navy, borderRadius: 16, padding: 16, marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '800', color: Colors.white, marginBottom: 6 }}>📬 File d'attente estimée</Text>
          <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 14 }}>Basée sur ton profil et les chercheurs actifs à {ville.nom}</Text>
          {[
            { label: 'Chercheurs compatibles', value: '23 profils', color: Colors.teal },
            { label: 'Groupes possibles', value: '4 groupes', color: '#6C63FF' },
            { label: 'Délai estimé', value: '3-5 jours', color: Colors.gold },
          ].map((stat, i) => (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: i < 2 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.06)' }}>
              <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{stat.label}</Text>
              <Text style={{ fontSize: 12, fontWeight: '700', color: stat.color }}>{stat.value}</Text>
            </View>
          ))}
        </View>

        {/* Témoignages */}
        <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>ILS ONT DÉJÀ TROUVÉ LEUR GROUPE</Text>
        {TEMOIGNAGES.map((t, i) => (
          <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.tealLight, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 18 }}>{t.avatar}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.navy }}>{t.name}</Text>
                <View style={{ flexDirection: 'row', gap: 2 }}>
                  {[1,2,3,4,5].map(n => <Text key={n} style={{ fontSize: 11, color: n <= t.stars ? Colors.gold : '#E0D8D0' }}>★</Text>)}
                </View>
              </View>
            </View>
            <Text style={{ fontSize: 12, color: Colors.navy, lineHeight: 18, fontStyle: 'italic' }}>"{t.text}"</Text>
          </View>
        ))}

        {/* CTA */}
        <TouchableOpacity onPress={onNext} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center', marginTop: 8, marginBottom: 20 }}>
          <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>Rejoindre la liste d'attente à {ville.nom} →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
