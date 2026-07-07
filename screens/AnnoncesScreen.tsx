import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

const mockAnnonces = [
  { adresse: '12 rue Garibaldi, Lyon 6', loyer: 520, pieces: 3, dispo: 'Maintenant', score: 87 },
  { adresse: '8 cours Lafayette, Lyon 3', loyer: 450, pieces: 2, dispo: 'Dans 1 mois', score: 74 },
  { adresse: '3 rue de la République, Lyon 2', loyer: 600, pieces: 4, dispo: 'Maintenant', score: 68 },
  { adresse: '21 av. Jean Jaurès, Lyon 7', loyer: 410, pieces: 2, dispo: 'Dans 3 mois', score: 55 },
];

const getScoreColor = (score: number) => {
  if (score > 75) return '#3ECFB0';
  if (score >= 50) return '#FFA500';
  return '#999';
};

export default function AnnoncesScreen({ go }: { go: (screen: string) => void }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#F2EDE6' }}>
      <View style={{ backgroundColor: '#1D3A4A', padding: 20, paddingTop: 60 }}>
        <TouchableOpacity onPress={() => go('ia_analyse')} style={{ marginBottom: 12 }}>
          <Text style={{ color: '#3ECFB0', fontSize: 16 }}>← Retour</Text>
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>🏠 Toutes les annonces</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {mockAnnonces.map((a, i) => (
          <View key={i} style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16, elevation: 2 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1D3A4A', marginBottom: 4 }}>{a.adresse}</Text>
            <Text style={{ color: '#555', marginBottom: 4 }}>{a.pieces} pièces · {a.dispo}</Text>
            <Text style={{ color: '#1D3A4A', fontWeight: '600', marginBottom: 12 }}>{a.loyer} €/mois</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ backgroundColor: getScoreColor(a.score), borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>IA {a.score}%</Text>
              </View>
              <TouchableOpacity onPress={() => go('groupe_propose')} style={{ backgroundColor: '#1D3A4A', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8 }}>
                <Text style={{ color: '#fff', fontWeight: '600' }}>Voir le groupe →</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
