import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Colors } from '../constants/theme';

const STEPS = [
  { label: 'Candidat', icon: '🟡', color: '#FFD700' },
  { label: 'Pré-match', icon: '🟠', color: '#FF9500' },
  { label: 'Match', icon: '🟢', color: '#4CAF50' },
  { label: 'Signé', icon: '🔵', color: '#2196F3' },
];

const CURRENT_STEP = 1; // 0-indexed, so step 2 (Pré-match)

const MEMBERS = [
  { id: 1, nom: 'Lucas', initials: 'L', filiere: 'Droit', statut: 'Confirmé', badge: '🟢' },
  { id: 2, nom: 'Amina', initials: 'A', filiere: 'Médecine', statut: 'Confirmée', badge: '🟢' },
  { id: 3, nom: 'Toi', initials: 'T', filiere: 'Info', statut: 'En attente', badge: '🟡' },
];

const BACKUP_PROFILES = [
  { nom: 'Jade', compatibilite: 87 },
  { nom: 'Romain', compatibilite: 81 },
];

const getAvatarColor = (initials: string) => {
  const colors = ['#E8F4FF', '#FFF0E8', '#F0E8FF', '#E8F5E9', '#FEF3DD'];
  return colors[(initials.charCodeAt(0) % colors.length)];
};

export default function GroupeStatutScreen({ onBack }: any) {
  const handleConfirm = () => {
    Alert.alert('Confirmation envoyée ! 🎉', 'En attente des autres membres.');
  };

  const handleChangeGroupe = () => {
    Alert.alert('Nouveau groupe', 'Un nouveau groupe va être recherché.');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 18, paddingTop: 50, paddingBottom: 28, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
          <Text style={{ fontSize: 12, fontWeight: '700', color: 'rgba(255,255,255,0.45)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Groupe Lyon #3</Text>
          <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white }}>Mon Groupe</Text>
        </View>

        {/* Stepper Horizontal */}
        <View style={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            {STEPS.map((step, i) => (
              <React.Fragment key={i}>
                {/* Step Indicator */}
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: i <= CURRENT_STEP ? step.color : Colors.gray,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>{step.icon}</Text>
                  </View>
                  <Text style={{ fontSize: 10, fontWeight: '600', color: i <= CURRENT_STEP ? step.color : Colors.muted, textAlign: 'center' }}>
                    {step.label}
                  </Text>
                </View>

                {/* Connector Line */}
                {i < STEPS.length - 1 && (
                  <View
                    style={{
                      flex: 1,
                      height: 3,
                      backgroundColor: i < CURRENT_STEP ? STEPS[i + 1].color : Colors.gray,
                      marginBottom: 20,
                      marginHorizontal: -2,
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Membres du groupe */}
        <View style={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 8 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Membres du groupe</Text>

          {MEMBERS.map(member => (
            <View key={member.id} style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 12, shadowColor: Colors.navy, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
              {/* Avatar */}
              <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: getAvatarColor(member.initials), alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.navy }}>{member.initials}</Text>
              </View>

              {/* Member Info */}
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.navy }}>{member.nom}</Text>
                <Text style={{ fontSize: 11, color: Colors.muted, marginTop: 2 }}>{member.filiere}</Text>
              </View>

              {/* Status Badge */}
              <View style={{ backgroundColor: member.badge === '🟢' ? 'rgba(76, 175, 80, 0.12)' : 'rgba(255, 193, 7, 0.12)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }}>
                <Text style={{ fontSize: 10, fontWeight: '700', color: member.badge === '🟢' ? '#4CAF50' : '#FFD700' }}>
                  {member.badge} {member.statut}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Info Bloc */}
        <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
          <View style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 16, shadowColor: Colors.navy, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
            <Text style={{ fontSize: 12, color: Colors.navy, lineHeight: 18, marginBottom: 16 }}>
              Il manque votre confirmation pour passer en Match. Les 3 membres doivent confirmer.
            </Text>

            {/* Primary Button */}
            <TouchableOpacity onPress={handleConfirm} style={{ backgroundColor: Colors.teal, borderRadius: 10, paddingVertical: 12, alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 13 }}>Confirmer ma participation</Text>
            </TouchableOpacity>

            {/* Secondary Button */}
            <TouchableOpacity onPress={handleChangeGroupe} style={{ borderRadius: 10, paddingVertical: 12, alignItems: 'center', borderWidth: 2, borderColor: Colors.navy }}>
              <Text style={{ color: Colors.navy, fontWeight: '700', fontSize: 13 }}>Je veux un autre groupe</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Backup Profiles */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 20 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Profils en attente (2)</Text>

          {BACKUP_PROFILES.map((profile, i) => (
            <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: Colors.navy, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: Colors.navy }}>{profile.nom}</Text>
              <View style={{ backgroundColor: Colors.tealLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 }}>
                <Text style={{ fontSize: 11, fontWeight: '700', color: Colors.teal }}>{profile.compatibilite}%</Text>
              </View>
            </View>
          ))}

          <Text style={{ fontSize: 11, color: Colors.muted, marginTop: 10, lineHeight: 16, textAlign: 'center' }}>
            Ces profils peuvent intégrer le groupe si un membre se retire.
          </Text>
        </View>

        {/* Back Button */}
        <TouchableOpacity onPress={onBack} style={{ paddingHorizontal: 16, paddingBottom: 20 }}>
          <Text style={{ fontSize: 13, color: Colors.muted, textAlign: 'center', fontWeight: '500' }}>Retour</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
