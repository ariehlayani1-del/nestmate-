import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Btn, Tag } from '../components/UI';
import { Colors } from '../constants/theme';
import { PROFILE_B, PROPERTIES, findBestGroupForProperty } from '../utils/matching';

export default function BiensFeedScreen({ onBack, onOpenDetail }: any) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 18, paddingTop: 50, paddingBottom: 36, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 4 }}>Feed Profil B</Text>
        <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>Parcours des biens avec groupe compatible repéré par l'IA.</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        {PROPERTIES.map((property) => {
          const match = findBestGroupForProperty(PROFILE_B, property);
          const compatible = match && match.score >= 70;

          return (
            <View key={property.id} style={{ backgroundColor: Colors.white, borderRadius: 16, padding: 16, marginBottom: 14, shadowColor: Colors.navy, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 }}>
              <TouchableOpacity onPress={() => onOpenDetail(property.id)} activeOpacity={0.8}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '800', color: Colors.navy, marginBottom: 2 }}>{property.title}</Text>
                    <Text style={{ fontSize: 12, color: Colors.muted, marginBottom: 8 }}>{property.location} · {property.surface}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.teal }}>{property.price}</Text>
                  </View>
                  {compatible && (
                    <Tag label={`Groupe compatible · ${match.score}%`} color="green" />
                  )}
                </View>

                <Text style={{ fontSize: 12, color: Colors.muted, lineHeight: 18, marginBottom: 12 }}>{property.description}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                  <Text style={{ fontSize: 12, color: Colors.navy }}>{property.bedrooms}</Text>
                  <Text style={{ fontSize: 12, color: Colors.navy }}>{property.availableSpots} place(s) libres</Text>
                  {match && !compatible && <Text style={{ fontSize: 12, color: Colors.muted }}>Meilleur groupe: {match.score}%</Text>}
                </View>
              </TouchableOpacity>

              <Btn label="Postuler" onPress={() => onOpenDetail(property.id)} style={{ width: '100%' }} />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
