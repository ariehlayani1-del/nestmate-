import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Colors } from '../constants/theme';

const POINTS_ACCORD = [
  { icon: '🌙', text: 'Rythme similaire — tous couche-tard' },
  { icon: '🧹', text: 'Niveau de propreté compatible' },
  { icon: '📚', text: 'Périodes d\'examens identiques (janvier + mai)' },
  { icon: '💰', text: 'Budget médian aligné — 550€/mois charges incluses' },
  { icon: '🏫', text: 'Tous à moins de 20 min de l\'université Lyon 2' },
];

const POINTS_DIVERGENCE = [
  { icon: '🐱', text: 'Amina a un chat — à confirmer avec le bailleur' },
  { icon: '🎉', text: 'Lucas aime inviter du monde le week-end — à cadrer ensemble' },
];

const MEMBERS = [
  { nom: 'Lucas', initials: 'L' },
  { nom: 'Amina', initials: 'A' },
  { nom: 'Toi', initials: 'T' },
];

const getAvatarColor = (initials: string) => {
  const colors = ['#E8F4FF', '#FFF0E8', '#F0E8FF', '#E8F5E9', '#FEF3DD'];
  return colors[(initials.charCodeAt(0) % colors.length)];
};

export default function GroupeValidationScreen({ onNext, onBack }: any) {
  const handleValidate = () => {
    Alert.alert(
      'Félicitations ! 🎉',
      'Votre groupe est validé. Vous pouvez maintenant contacter des bailleurs et consulter les annonces.',
      [{ text: 'OK', onPress: onNext }]
    );
  };

  const handleReportProblem = () => {
    Alert.alert(
      'Signalement envoyé',
      'Un modérateur va examiner votre signalement sous 24h.'
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 18, paddingTop: 50, paddingBottom: 28, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Text style={{ fontSize: 11, fontWeight: '700', color: '#4CAF50', letterSpacing: 0.5, textTransform: 'uppercase', backgroundColor: 'rgba(76, 175, 80, 0.15)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }}>
              ✅ GROUPE COMPLET
            </Text>
          </View>
          <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 6 }}>Validation du groupe 🎉</Text>
          <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 16 }}>Groupe Lyon #3 · 3 membres confirmés</Text>
        </View>

        {/* Points d'accord */}
        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
          <View style={{ backgroundColor: Colors.white, borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: Colors.navy, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.navy, marginBottom: 14 }}>✅ Ce qui vous unit</Text>

            {POINTS_ACCORD.map((point, i) => (
              <View key={i} style={{ flexDirection: 'row', gap: 12, marginBottom: i < POINTS_ACCORD.length - 1 ? 12 : 0 }}>
                <Text style={{ fontSize: 16 }}>{point.icon}</Text>
                <Text style={{ fontSize: 12, color: Colors.navy, flex: 1, lineHeight: 18 }}>{point.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Points de divergence */}
        <View style={{ paddingHorizontal: 16 }}>
          <View style={{ backgroundColor: '#FFF3E0', borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: Colors.navy, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: '#FF9500', marginBottom: 14 }}>⚠️ Points à discuter</Text>

            {POINTS_DIVERGENCE.map((point, i) => (
              <View key={i} style={{ flexDirection: 'row', gap: 12, marginBottom: i < POINTS_DIVERGENCE.length - 1 ? 12 : 0 }}>
                <Text style={{ fontSize: 16 }}>{point.icon}</Text>
                <Text style={{ fontSize: 12, color: Colors.navy, flex: 1, lineHeight: 18 }}>{point.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Membres confirmés */}
        <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Membres confirmés</Text>

          <View style={{ backgroundColor: Colors.white, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 20, flexDirection: 'row', alignItems: 'center', gap: 12, shadowColor: Colors.navy, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
            {MEMBERS.map((member, i) => (
              <View key={i} style={{ alignItems: 'center', flex: 1 }}>
                <View style={{ position: 'relative', marginBottom: 6 }}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: getAvatarColor(member.initials), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy }}>{member.initials}</Text>
                  </View>
                  <View style={{ position: 'absolute', bottom: 0, right: 0, width: 16, height: 16, borderRadius: 8, backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.white }}>
                    <Text style={{ fontSize: 10, color: Colors.white }}>✓</Text>
                  </View>
                </View>
                <Text style={{ fontSize: 11, fontWeight: '600', color: Colors.navy, textAlign: 'center' }}>{member.nom}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 20 }}>
          <TouchableOpacity
            onPress={handleValidate}
            style={{
              backgroundColor: Colors.navy,
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: 'center',
              marginBottom: 12,
              shadowColor: Colors.navy,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 3,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.white }}>Valider ce groupe et chercher un logement 🏠</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleReportProblem} style={{ paddingVertical: 12, alignItems: 'center' }}>
            <Text style={{ fontSize: 13, fontWeight: '600', color: Colors.red }}>Signaler un problème</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onBack} style={{ paddingVertical: 12, alignItems: 'center' }}>
            <Text style={{ fontSize: 13, color: Colors.muted, fontWeight: '500' }}>Retour</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
