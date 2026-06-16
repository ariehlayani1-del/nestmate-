import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Modal } from 'react-native';
import { Colors } from '../constants/theme';
import { Tag } from '../components/UI';

const OFFRES = [
  { icon: '🎾', nom: 'Réduction groupe padel', remise: '-20%', utilisations: 47, revenus: '1 880€', actif: true },
  { icon: '🎾', nom: 'Séance découverte', remise: 'Gratuit', utilisations: 23, revenus: '0€', actif: true },
];

export default function DashboardPartenaireScreen({ onBack }: any) {
  const [showNouvelleOffre, setShowNouvelleOffre] = useState(false);
  const [onglet, setOnglet] = useState<'dashboard'|'offres'|'stats'>('dashboard');
  const [nomOffre, setNomOffre] = useState('');
  const [remise, setRemise] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 18, paddingTop: 50, paddingBottom: 20 }}>
          <TouchableOpacity onPress={onBack} style={{ marginBottom: 12 }}>
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>← Retour</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <View style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: Colors.teal, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 26 }}>🎾</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: '800', color: Colors.white }}>Padel Arena Lyon</Text>
              <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>Partenaire Nestmate · Sport</Text>
            </View>
          </View>

          {/* Onglets */}
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {[['dashboard', '📊 Dashboard'], ['offres', '🎁 Mes offres'], ['stats', '📈 Stats']].map(([key, label]) => (
              <TouchableOpacity key={key} onPress={() => setOnglet(key as any)} style={{ flex: 1, paddingVertical: 7, borderRadius: 8, backgroundColor: onglet === key ? Colors.teal : 'rgba(255,255,255,0.08)', alignItems: 'center' }}>
                <Text style={{ fontSize: 11, fontWeight: '600', color: onglet === key ? Colors.white : 'rgba(255,255,255,0.5)' }}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ padding: 16 }}>
          {onglet === 'dashboard' && (
            <>
              {/* Stats rapides */}
              <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
                {[
                  { label: 'Réservations', value: '47', icon: '📅', color: Colors.teal },
                  { label: 'Ce mois', value: '12', icon: '🗓️', color: '#6C63FF' },
                  { label: 'Revenus', value: '1 880€', icon: '💰', color: Colors.green },
                ].map((s, i) => (
                  <View key={i} style={{ flex: 1, backgroundColor: Colors.white, borderRadius: 12, padding: 12, alignItems: 'center', gap: 4 }}>
                    <Text style={{ fontSize: 18 }}>{s.icon}</Text>
                    <Text style={{ fontSize: 16, fontWeight: '800', color: s.color }}>{s.value}</Text>
                    <Text style={{ fontSize: 9, color: Colors.muted, textAlign: 'center' }}>{s.label}</Text>
                  </View>
                ))}
              </View>

              {/* Badge partenaire */}
              <View style={{ backgroundColor: Colors.teal, borderRadius: 16, padding: 16, marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '800', color: Colors.white, marginBottom: 6 }}>🏅 Partenaire certifié Nestmate</Text>
                <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 18 }}>Ton établissement est visible par tous les colocataires dans un rayon de 5km. Badge affiché sur ton profil Google Maps.</Text>
              </View>

              {/* Dernières réservations */}
              <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>DERNIÈRES RÉSERVATIONS</Text>
              {[
                { groupe: 'Groupe Garibaldi', membres: 4, date: 'Aujourd\'hui 14h', offre: '-20% padel', montant: '32€' },
                { groupe: 'Groupe Martinière', membres: 3, date: 'Hier 18h30', offre: 'Séance découverte', montant: 'Gratuit' },
                { groupe: 'Groupe Brotteaux', membres: 4, date: 'Lun 20h', offre: '-20% padel', montant: '32€' },
              ].map((r, i) => (
                <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 12, padding: 12, marginBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: Colors.tealLight, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16 }}>👥</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.navy }}>{r.groupe}</Text>
                    <Text style={{ fontSize: 10, color: Colors.muted }}>{r.membres} personnes · {r.date}</Text>
                    <Text style={{ fontSize: 10, color: Colors.teal, fontWeight: '600' }}>{r.offre}</Text>
                  </View>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.navy }}>{r.montant}</Text>
                </View>
              ))}
            </>
          )}

          {onglet === 'offres' && (
            <>
              <TouchableOpacity onPress={() => setShowNouvelleOffre(true)} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center', marginBottom: 16, flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
                <Text style={{ color: Colors.white, fontSize: 18 }}>+</Text>
                <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>Créer une nouvelle offre</Text>
              </TouchableOpacity>

              <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>MES OFFRES ACTIVES</Text>
              {OFFRES.map((o, i) => (
                <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 10, borderLeftWidth: 3, borderLeftColor: o.actif ? Colors.teal : Colors.gray }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy }}>{o.icon} {o.nom}</Text>
                    <View style={{ backgroundColor: o.actif ? Colors.tealLight : Colors.gray, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 }}>
                      <Text style={{ fontSize: 10, fontWeight: '700', color: o.actif ? Colors.teal : Colors.muted }}>{o.actif ? 'Active' : 'Inactive'}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 16, marginBottom: 10 }}>
                    <View>
                      <Text style={{ fontSize: 10, color: Colors.muted }}>Remise</Text>
                      <Text style={{ fontSize: 16, fontWeight: '800', color: Colors.teal }}>{o.remise}</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 10, color: Colors.muted }}>Utilisations</Text>
                      <Text style={{ fontSize: 16, fontWeight: '800', color: Colors.navy }}>{o.utilisations}</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 10, color: Colors.muted }}>Revenus générés</Text>
                      <Text style={{ fontSize: 16, fontWeight: '800', color: Colors.green }}>{o.revenus}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: Colors.gray, borderRadius: 8, paddingVertical: 8, alignItems: 'center' }}>
                      <Text style={{ fontSize: 12, color: Colors.navy, fontWeight: '600' }}>Modifier</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: '#FDECEA', borderRadius: 8, paddingVertical: 8, alignItems: 'center' }}>
                      <Text style={{ fontSize: 12, color: Colors.red, fontWeight: '600' }}>Désactiver</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </>
          )}

          {onglet === 'stats' && (
            <>
              <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>PERFORMANCE CE MOIS</Text>
              {[
                { label: 'Vues de ton profil', value: '342', trend: '+24%', up: true },
                { label: 'Clics sur tes offres', value: '89', trend: '+12%', up: true },
                { label: 'Réservations', value: '12', trend: '-3%', up: false },
                { label: 'Taux de conversion', value: '13.5%', trend: '+2%', up: true },
                { label: 'Note moyenne', value: '4.8 ★', trend: 'Stable', up: true },
                { label: 'Revenus générés', value: '480€', trend: '+18%', up: true },
              ].map((s, i) => (
                <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 12, padding: 12, marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 13, color: Colors.navy }}>{s.label}</Text>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.navy }}>{s.value}</Text>
                    <Text style={{ fontSize: 10, color: s.up ? Colors.green : Colors.red, fontWeight: '600' }}>{s.trend}</Text>
                  </View>
                </View>
              ))}

              <View style={{ backgroundColor: Colors.navy, borderRadius: 14, padding: 14, marginTop: 8 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.white, marginBottom: 6 }}>💡 Conseil Nestmate</Text>
                <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 18 }}>Les groupes réservent surtout le jeudi soir et le week-end. Propose une offre spéciale vendredi soir pour booster tes réservations.</Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* Modal nouvelle offre */}
      <Modal visible={showNouvelleOffre} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{ backgroundColor: Colors.white, borderRadius: 20, padding: 24, paddingBottom: 40 }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: Colors.navy, marginBottom: 4 }}>Nouvelle offre</Text>
            <Text style={{ fontSize: 12, color: Colors.muted, marginBottom: 20 }}>Visible par tous les colocataires dans un rayon de 5km</Text>

            {[['NOM DE L\'OFFRE', nomOffre, setNomOffre, 'Ex: Réduction groupe padel'], ['REMISE OU AVANTAGE', remise, setRemise, 'Ex: -20% ou 1 séance offerte']].map(([label, val, setter, ph]: any) => (
              <View key={label} style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{label}</Text>
                <TextInput style={{ backgroundColor: Colors.gray, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, fontSize: 13, color: Colors.navy }} value={val} onChangeText={setter} placeholder={ph} placeholderTextColor="#C0B8AE" />
              </View>
            ))}

            <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>CATÉGORIE</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 20 }}>
              {['Sport', 'Restauration', 'Loisirs', 'Bien-être', 'Culture'].map(c => (
                <TouchableOpacity key={c} style={{ backgroundColor: Colors.gray, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 }}>
                  <Text style={{ fontSize: 11, color: Colors.navy, fontWeight: '600' }}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity onPress={() => setShowNouvelleOffre(false)} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>Publier l'offre</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowNouvelleOffre(false)} style={{ alignItems: 'center' }}>
              <Text style={{ color: Colors.muted, fontSize: 12 }}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
