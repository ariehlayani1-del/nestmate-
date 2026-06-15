import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors } from '../constants/theme';

export default function PhotoProfilScreen({ onNext, onBack }: any) {
  const tips = [
    { icon: '☀️', text: 'Bonne luminosité, visage bien visible' },
    { icon: '😊', text: 'Expression naturelle et souriante' },
    { icon: '🚫', text: 'Pas de lunettes de soleil ni de filtre' },
    { icon: '🔒', text: 'Photo visible uniquement après match' },
  ];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream, paddingTop: 20 }}>
      <TouchableOpacity onPress={onBack} style={{ paddingHorizontal: 24, marginBottom: 12 }}>
        <Text style={{ color: Colors.muted, fontSize: 13 }}>← Retour</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.navy, textAlign: 'center' }}>Ta photo de profil</Text>
      <Text style={{ fontSize: 11, color: Colors.muted, textAlign: 'center', marginTop: 4, marginBottom: 24 }}>Elle sera utilisée pour la vérification d'identité</Text>
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <View style={{ width: 110, height: 110, borderRadius: 55, backgroundColor: Colors.teal, alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
          <Text style={{ fontSize: 48 }}>👤</Text>
          <View style={{ position: 'absolute', bottom: 2, right: 2, width: 30, height: 30, borderRadius: 15, backgroundColor: Colors.navy, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.cream }}>
            <Text style={{ color: Colors.white, fontSize: 16 }}>+</Text>
          </View>
        </View>
        <Text style={{ fontSize: 11, color: Colors.muted }}>Appuie pour ajouter une photo</Text>
      </View>
      <View style={{ backgroundColor: Colors.white, borderRadius: 14, marginHorizontal: 24, paddingHorizontal: 14, paddingVertical: 6 }}>
        {tips.map((t, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, borderBottomWidth: i < tips.length - 1 ? 1 : 0, borderBottomColor: Colors.gray }}>
            <Text style={{ fontSize: 18 }}>{t.icon}</Text>
            <Text style={{ fontSize: 11, color: Colors.navy, flex: 1 }}>{t.text}</Text>
          </View>
        ))}
      </View>
      <View style={{ paddingHorizontal: 24, marginTop: 16 }}>
        <TouchableOpacity onPress={onNext} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center' }}>
          <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>Continuer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNext} style={{ alignItems: 'center', marginTop: 12 }}>
          <Text style={{ color: Colors.muted, fontSize: 12 }}>Passer pour l'instant</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
