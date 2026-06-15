import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../constants/theme';

export default function ChoixProfilScreen({ onChercheur, onBailleur }: any) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 50 }}>
        <Text style={{ fontSize: 38, marginBottom: 10 }}>👋</Text>
        <Text style={{ fontSize: 26, fontWeight: '800', color: Colors.navy, marginBottom: 6, letterSpacing: -0.5 }}>Bienvenue sur{'\n'}<Text style={{ color: Colors.teal }}>Nestmate</Text></Text>
        <Text style={{ fontSize: 13, color: Colors.muted, marginBottom: 28, lineHeight: 20 }}>Dis-nous qui tu es pour personnaliser ton expérience</Text>
        <TouchableOpacity onPress={onChercheur} activeOpacity={0.85} style={{ backgroundColor: Colors.white, borderRadius: 16, padding: 20, marginBottom: 14, overflow: 'hidden', position: 'relative', shadowColor: Colors.navy, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.09, shadowRadius: 10, elevation: 3 }}>
          <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, backgroundColor: Colors.teal }} />
          <Text style={{ fontSize: 32, marginBottom: 10 }}>🔍</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.navy, marginBottom: 4 }}>Je cherche une coloc</Text>
          <Text style={{ fontSize: 12, color: Colors.muted, lineHeight: 18, paddingRight: 24 }}>Tu cherches un appartement et des colocataires compatibles. L'IA te forme un groupe idéal.</Text>
          <Text style={{ position: 'absolute', right: 16, top: '50%', fontSize: 22, color: Colors.teal }}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onBailleur} activeOpacity={0.85} style={{ backgroundColor: Colors.white, borderRadius: 16, padding: 20, marginBottom: 14, overflow: 'hidden', position: 'relative', shadowColor: Colors.navy, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.09, shadowRadius: 10, elevation: 3 }}>
          <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, backgroundColor: Colors.navy }} />
          <Text style={{ fontSize: 32, marginBottom: 10 }}>🏠</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.navy, marginBottom: 4 }}>J'ai un appartement à louer</Text>
          <Text style={{ fontSize: 12, color: Colors.muted, lineHeight: 18, paddingRight: 24 }}>Tu es propriétaire et veux trouver un groupe de colocataires vérifiés et compatibles.</Text>
          <Text style={{ position: 'absolute', right: 16, top: '50%', fontSize: 22, color: Colors.teal }}>›</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
