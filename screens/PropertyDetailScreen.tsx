import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Btn, MemberCard, Tag } from '../components/UI';
import { Colors } from '../constants/theme';
import { PROFILE_B, PROPERTIES, findBestGroupForProperty } from '../utils/matching';

export default function PropertyDetailScreen({ propertyId, onBack }: any) {
  const property = PROPERTIES.find((item) => item.id === propertyId);
  if (!property) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: Colors.navy, fontSize: 16 }}>Bien introuvable.</Text>
      </SafeAreaView>
    );
  }

  const match = findBestGroupForProperty(PROFILE_B, property);
  const compatible = match && match.score >= 70;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 18, paddingTop: 50, paddingBottom: 34, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <TouchableOpacity onPress={onBack} style={{ marginBottom: 16 }}>
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>← Retour</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 4 }}>Détail du bien</Text>
        <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{property.location} · {property.surface}</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        <View style={{ backgroundColor: Colors.white, borderRadius: 16, padding: 16, marginBottom: 14, shadowColor: Colors.navy, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 }}>
          {compatible && match && (
            <View style={{ marginBottom: 12 }}>
              <Tag label={`Groupe compatible · ${match.score}%`} color="green" />
            </View>
          )}
          <Text style={{ fontSize: 18, fontWeight: '800', color: Colors.navy, marginBottom: 10 }}>{property.title}</Text>
          <Text style={{ fontSize: 12, color: Colors.teal, fontWeight: '700', marginBottom: 12 }}>{property.price}</Text>
          <Text style={{ fontSize: 13, color: Colors.muted, lineHeight: 20 }}>{property.description}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 14, flexWrap: 'wrap', gap: 8 }}>
            <Text style={{ fontSize: 12, color: Colors.navy }}>{property.bedrooms}</Text>
            <Text style={{ fontSize: 12, color: Colors.navy }}>{property.availableSpots} place(s) libres</Text>
          </View>
        </View>

        {compatible && match ? (
          <View style={{ backgroundColor: Colors.white, borderRadius: 16, padding: 16, marginBottom: 14, shadowColor: Colors.navy, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 }}>
            <Text style={{ fontSize: 12, color: Colors.muted, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>Ce groupe pourrait vous correspondre</Text>
            <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy, marginBottom: 8 }}>{match.group?.name}</Text>
            <Text style={{ fontSize: 12, color: Colors.muted, marginBottom: 14 }}>Places restantes : {match.group?.availableSpots}</Text>
            {match.group?.members.map((member) => (
              <MemberCard key={member.name} {...member} />
            ))}
          </View>
        ) : (
          <View style={{ backgroundColor: Colors.white, borderRadius: 16, padding: 16, marginBottom: 14, shadowColor: Colors.navy, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 }}>
            <Text style={{ fontSize: 12, color: Colors.muted, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>Places disponibles</Text>
            <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy }}>{property.availableSpots} place(s) libres</Text>
          </View>
        )}
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 30, backgroundColor: Colors.cream }}>
        <Btn label="Postuler" onPress={() => {}} style={{ width: '100%' }} />
      </View>
    </SafeAreaView>
  );
}
