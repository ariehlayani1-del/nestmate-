import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Modal } from 'react-native';
import { Colors } from '../constants/theme';

const ETAPES = [
  { icon: '📸', title: 'Photo de ta pièce d\'identité', desc: 'Carte nationale, passeport ou titre de séjour', done: false },
  { icon: '🤳', title: 'Selfie de vérification', desc: 'Pour confirmer que c\'est bien toi', done: false },
  { icon: '✅', title: 'Validation automatique', desc: 'Résultat en moins de 2 minutes', done: false },
];

export default function VerificationIdentiteScreen({ onNext, onBack }: any) {
  const [etape, setEtape] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleEtape = () => {
    if (etape < ETAPES.length - 1) {
      setEtape(e => e + 1);
    } else {
      setVerifying(true);
      setTimeout(() => { setVerifying(false); setVerified(true); }, 2000);
    }
  };

  if (verified) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.navy, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Text style={{ fontSize: 60, marginBottom: 20 }}>✅</Text>
        <Text style={{ fontSize: 26, fontWeight: '800', color: Colors.white, marginBottom: 8, textAlign: 'center' }}>Identité vérifiée !</Text>
        <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 32, lineHeight: 20 }}>Ton badge de vérification est maintenant visible sur ton profil</Text>
        <View style={{ backgroundColor: Colors.tealLight, borderRadius: 14, padding: 16, width: '100%', marginBottom: 24 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.teal, textAlign: 'center' }}>✓ Identité vérifiée par Nestmate</Text>
        </View>
        <TouchableOpacity onPress={onNext} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center', width: '100%' }}>
          <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>Continuer →</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (verifying) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.navy, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Text style={{ fontSize: 52, marginBottom: 20 }}>🔍</Text>
        <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 8, textAlign: 'center' }}>Vérification en cours…</Text>
        <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>Moins de 2 minutes</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 50 }}>
        <TouchableOpacity onPress={onBack} style={{ marginBottom: 18 }}>
          <Text style={{ color: Colors.muted, fontSize: 13 }}>← Retour</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.navy, marginBottom: 4 }}>Vérification d'identité</Text>
        <Text style={{ fontSize: 12, color: Colors.muted, marginBottom: 20, lineHeight: 18 }}>Obligatoire pour rejoindre un groupe. Tes données sont chiffrées et supprimées après vérification.</Text>

        {/* Pourquoi */}
        <View style={{ backgroundColor: Colors.tealLight, borderRadius: 14, padding: 14, marginBottom: 20 }}>
          <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.teal, marginBottom: 8 }}>🔒 Pourquoi on vérifie ton identité ?</Text>
          {['Garantir la sécurité de tous les membres','Lutter contre les faux profils','Construire une réputation fiable dès le départ'].map((r, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 8, marginBottom: 4 }}>
              <Text style={{ color: Colors.teal, fontSize: 12 }}>✓</Text>
              <Text style={{ fontSize: 11, color: Colors.navy, flex: 1 }}>{r}</Text>
            </View>
          ))}
        </View>

        {/* Étapes */}
        {ETAPES.map((e, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 14, marginBottom: 16, opacity: i > etape ? 0.4 : 1 }}>
            <View style={{ alignItems: 'center' }}>
              <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: i < etape ? Colors.teal : i === etape ? Colors.tealLight : Colors.gray, alignItems: 'center', justifyContent: 'center', borderWidth: i === etape ? 2 : 0, borderColor: Colors.teal }}>
                <Text style={{ fontSize: 20 }}>{i < etape ? '✅' : e.icon}</Text>
              </View>
              {i < ETAPES.length - 1 && <View style={{ width: 2, height: 20, backgroundColor: i < etape ? Colors.teal : Colors.gray, marginTop: 4 }} />}
            </View>
            <View style={{ flex: 1, paddingTop: 8 }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: i <= etape ? Colors.navy : Colors.muted, marginBottom: 2 }}>{e.title}</Text>
              <Text style={{ fontSize: 11, color: Colors.muted }}>{e.desc}</Text>
            </View>
          </View>
        ))}

        {/* Partenaire */}
        <View style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 20, flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <Text style={{ fontSize: 28 }}>🛡️</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.navy, marginBottom: 2 }}>Powered by Stripe Identity</Text>
            <Text style={{ fontSize: 11, color: Colors.muted }}>Vérification sécurisée · Données supprimées après 30 jours</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleEtape} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center', marginBottom: 12 }}>
          <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>
            {etape === 0 ? 'Photographier ma pièce d\'identité →' : etape === 1 ? 'Prendre mon selfie →' : 'Lancer la vérification →'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowInfo(true)} style={{ alignItems: 'center' }}>
          <Text style={{ color: Colors.muted, fontSize: 12 }}>En savoir plus sur la confidentialité</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showInfo} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{ backgroundColor: Colors.white, borderRadius: 20, padding: 24, paddingBottom: 40 }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: Colors.navy, marginBottom: 16 }}>Confidentialité & données</Text>
            {[
              ['🔐', 'Chiffrement de bout en bout', 'Tes documents ne sont jamais stockés en clair'],
              ['🗑️', 'Suppression automatique', 'Documents supprimés 30 jours après vérification'],
              ['👁️', 'Accès limité', 'Seul l\'algorithme de vérification accède aux données'],
              ['📋', 'Conformité RGPD', 'Tu peux demander la suppression à tout moment'],
            ].map(([icon, title, desc]) => (
              <View key={title} style={{ flexDirection: 'row', gap: 12, marginBottom: 14 }}>
                <Text style={{ fontSize: 20 }}>{icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.navy, marginBottom: 2 }}>{title}</Text>
                  <Text style={{ fontSize: 11, color: Colors.muted }}>{desc}</Text>
                </View>
              </View>
            ))}
            <TouchableOpacity onPress={() => setShowInfo(false)} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center', marginTop: 8 }}>
              <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>Compris</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
