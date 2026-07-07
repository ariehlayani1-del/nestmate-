import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/theme';

export default function ParametresScreen({ onBack }: any) {
  const [pauseProfil, setPauseProfil] = useState(false);
  const [masquerPhotos, setMasquerPhotos] = useState(true);
  const [groupesCompatibles, setGroupesCompatibles] = useState(true);
  const [messagesGroupe, setMessagesGroupe] = useState(true);
  const [checkins, setCheckins] = useState(true);
  const [communaute, setCommunaute] = useState(false);

  const renderRow = (label: string, onPress: () => void) => (
    <TouchableOpacity key={label} onPress={onPress} style={{ paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#E5E0D8' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 14, color: Colors.navy, flex: 1 }}>{label}</Text>
        <Text style={{ fontSize: 18, color: Colors.muted }}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 18, paddingTop: 48, paddingBottom: 24 }}>
        <Text style={{ fontSize: 24, fontWeight: '800', color: Colors.white }}>Paramètres</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 18 }}>
          <View style={{ width: 46, height: 46, borderRadius: 23, backgroundColor: Colors.teal, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '800', color: Colors.navy }}>J</Text>
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: Colors.white }}>Jacob</Text>
            <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.72)' }}>jacob@email.com</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <View style={{ marginBottom: 18 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy, marginBottom: 8 }}>Mon profil</Text>
          <View style={{ backgroundColor: 'white', borderRadius: 14, paddingHorizontal: 14 }}>
            {renderRow('✏️ Modifier mon profil', () => Alert.alert('Redirection', 'Redirection vers le questionnaire'))}
            {renderRow('📍 Changer ma ville', () => Alert.alert('Matching', 'Recalcul du matching en cours...'))}
            {renderRow('💰 Modifier mon budget', () => Alert.alert('Budget', 'Budget mis à jour'))}
            {renderRow('📅 Changer mes dates', () => Alert.alert('Dates', 'Dates mises à jour, matching recalculé'))}
          </View>
        </View>

        <View style={{ marginBottom: 18 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy, marginBottom: 8 }}>Visibilité</Text>
          <View style={{ backgroundColor: 'white', borderRadius: 14, padding: 14 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <Text style={{ fontSize: 14, color: Colors.navy }}>⏸️ Mettre mon profil en pause</Text>
              <Switch value={pauseProfil} onValueChange={setPauseProfil} trackColor={{ false: '#D8D2C9', true: Colors.teal }} thumbColor={pauseProfil ? Colors.navy : Colors.white} />
            </View>
            {pauseProfil ? <Text style={{ fontSize: 12, color: '#C97A12', marginBottom: 6 }}>Ton profil est masqué. Tu ne recevras plus de propositions.</Text> : null}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
              <Text style={{ fontSize: 14, color: Colors.navy }}>👁️ Masquer mes photos aux non-vérifiés</Text>
              <Switch value={masquerPhotos} onValueChange={setMasquerPhotos} trackColor={{ false: '#D8D2C9', true: Colors.teal }} thumbColor={masquerPhotos ? Colors.navy : Colors.white} />
            </View>
          </View>
        </View>

        <View style={{ marginBottom: 18 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy, marginBottom: 8 }}>Notifications</Text>
          <View style={{ backgroundColor: 'white', borderRadius: 14, padding: 14 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontSize: 14, color: Colors.navy }}>🔔 Nouveaux groupes compatibles</Text>
              <Switch value={groupesCompatibles} onValueChange={setGroupesCompatibles} trackColor={{ false: '#D8D2C9', true: Colors.teal }} thumbColor={groupesCompatibles ? Colors.navy : Colors.white} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontSize: 14, color: Colors.navy }}>💬 Messages du groupe</Text>
              <Switch value={messagesGroupe} onValueChange={setMessagesGroupe} trackColor={{ false: '#D8D2C9', true: Colors.teal }} thumbColor={messagesGroupe ? Colors.navy : Colors.white} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontSize: 14, color: Colors.navy }}>📊 Check-ins J+30 / J+90</Text>
              <Switch value={checkins} onValueChange={setCheckins} trackColor={{ false: '#D8D2C9', true: Colors.teal }} thumbColor={checkins ? Colors.navy : Colors.white} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: Colors.navy }}>🏘️ Communauté de quartier</Text>
              <Switch value={communaute} onValueChange={setCommunaute} trackColor={{ false: '#D8D2C9', true: Colors.teal }} thumbColor={communaute ? Colors.navy : Colors.white} />
            </View>
          </View>
        </View>

        <View style={{ marginBottom: 18 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy, marginBottom: 8 }}>Confidentialité & RGPD</Text>
          <View style={{ backgroundColor: 'white', borderRadius: 14, paddingHorizontal: 14 }}>
            {renderRow('📥 Télécharger mes données', () => Alert.alert('Données', 'Un email avec tes données sera envoyé sous 48h.'))}
            {renderRow('🗑️ Supprimer mon compte', () => Alert.alert('Supprimer le compte', 'Confirmer la suppression', [
              { text: 'Annuler', style: 'cancel' },
              { text: 'Confirmer la suppression', style: 'destructive', onPress: () => Alert.alert('Compte supprimé', 'Compte supprimé. À bientôt 👋') },
            ]))}
            {renderRow('🔒 Déconnexion', () => Alert.alert('Déconnexion', 'Déconnecté avec succès'))}
          </View>
        </View>

        <View style={{ marginBottom: 18 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy, marginBottom: 8 }}>À propos</Text>
          <View style={{ backgroundColor: 'white', borderRadius: 14, paddingHorizontal: 14 }}>
            <View style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E0D8' }}>
              <Text style={{ fontSize: 14, color: Colors.navy }}>Nestmate v1.0.0 · Fait avec ❤️ à Lyon</Text>
            </View>
            {renderRow('⭐ Noter l\'application', () => Alert.alert('Merci', 'Merci pour ton soutien !'))}
            {renderRow('📧 Nous contacter', () => Alert.alert('Contact', 'contact@nestmate.fr'))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
