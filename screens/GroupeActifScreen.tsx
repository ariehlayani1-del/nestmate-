import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Modal } from 'react-native';
import { Colors } from '../constants/theme';
import { BottomNav, Tag } from '../components/UI';

const MEMBRES = [
  { avatar: '🧑', name: 'Toi (Lucas)', role: 'Admin', status: 'ok', statusText: 'Loyer payé', actif: true, derniereActivite: 'Maintenant' },
  { avatar: '👩‍🎓', name: 'Léa M.', role: 'Membre', status: 'ok', statusText: 'Loyer payé', actif: true, derniereActivite: 'Il y a 2h' },
  { avatar: '👨‍💻', name: 'Tom K.', role: 'Membre', status: 'wait', statusText: 'En attente', actif: false, derniereActivite: 'Il y a 8 jours' },
  { avatar: '🧑‍🎨', name: 'Camille R.', role: 'Membre', status: 'ok', statusText: 'Loyer payé', actif: true, derniereActivite: 'Hier' },
];

const ICEBREAKERS = [
  '🎵 Vous aimez tous la musique — qui fait la playlist ce soir ?',
  '🍳 Léa et toi cuisinez — soirée raclette la semaine prochaine ?',
  '🎮 Tom fait du gaming — tournoi Mario Kart ce week-end ?',
];

const ACTIONS = [
  { icon: '🧹', label: 'Ménage cuisine', detail: 'Tom · Cette semaine', color: '#E8F4FF' },
  { icon: '🛒', label: 'Courses communes', detail: 'Léa · Vendredi', color: '#FFF0E8' },
  { icon: '💡', label: 'Payer les charges', detail: 'Tous · 1er oct', color: '#FDECEA' },
];

export default function GroupeActifScreen({ onActivites, onProfil, onNotifs, onVoisinage, onTournante }: any) {
  const [showFantome, setShowFantome] = useState(true);
  const [showRemplacant, setShowRemplacant] = useState(false);
  const [showSlotLibre, setShowSlotLibre] = useState(false);
  const [tomRemplace, setTomRemplace] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ padding: 18 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, marginBottom: 14 }}>
          <View>
            <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.navy }}>Mon Groupe 🏠</Text>
            <Text style={{ fontSize: 11, color: Colors.muted, marginTop: 2 }}>14 Rue Garibaldi, Lyon 6e</Text>
          </View>
          <View style={{ backgroundColor: Colors.teal, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10 }}>
            <Text style={{ color: Colors.white, fontSize: 11, fontWeight: '700' }}>🟢 Confirmé</Text>
          </View>
        </View>

        {/* Alerte membre fantôme */}
        {showFantome && !tomRemplace && (
          <View style={{ backgroundColor: '#FFF3E0', borderRadius: 14, padding: 14, marginBottom: 14, borderLeftWidth: 3, borderLeftColor: Colors.gold }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.gold, marginBottom: 4 }}>⚠️ Membre inactif détecté</Text>
                <Text style={{ fontSize: 11, color: Colors.navy, lineHeight: 17 }}>Tom n'a pas répondu depuis 8 jours. Le groupe peut continuer sans lui ou demander un remplaçant.</Text>
              </View>
              <TouchableOpacity onPress={() => setShowFantome(false)}>
                <Text style={{ color: Colors.muted, fontSize: 18 }}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
              <TouchableOpacity onPress={() => setShowRemplacant(true)} style={{ flex: 1, backgroundColor: Colors.gold, borderRadius: 10, paddingVertical: 8, alignItems: 'center' }}>
                <Text style={{ color: Colors.white, fontSize: 11, fontWeight: '700' }}>Trouver un remplaçant</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowFantome(false)} style={{ flex: 1, backgroundColor: Colors.white, borderRadius: 10, paddingVertical: 8, alignItems: 'center', borderWidth: 1.5, borderColor: Colors.border }}>
                <Text style={{ color: Colors.navy, fontSize: 11, fontWeight: '600' }}>Ignorer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Slot libre */}
        {tomRemplace && (
          <View style={{ backgroundColor: Colors.tealLight, borderRadius: 14, padding: 14, marginBottom: 14 }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.teal, marginBottom: 4 }}>✓ Slot libéré — IA cherche un remplaçant</Text>
            <Text style={{ fontSize: 11, color: Colors.navy }}>Le groupe reste valide. Notification envoyée dès qu'un profil compatible est trouvé.</Text>
          </View>
        )}

        {/* Appart card */}
        <View style={{ backgroundColor: Colors.navy, borderRadius: 14, padding: 14, flexDirection: 'row', gap: 12, alignItems: 'center', marginBottom: 18 }}>
          <Text style={{ fontSize: 28 }}>🏢</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, fontWeight: '600', color: Colors.white, marginBottom: 2 }}>14 Rue Garibaldi, Lyon 6e</Text>
            <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>T4 · 85m² · 4 colocataires</Text>
          </View>
          <Text style={{ fontSize: 15, fontWeight: '800', color: Colors.teal }}>480€/mois</Text>
        </View>

        {/* Icebreakers */}
        <View style={{ backgroundColor: Colors.tealLight, borderRadius: 14, padding: 14, marginBottom: 14 }}>
          <Text style={{ fontSize: 11, fontWeight: '700', color: Colors.teal, marginBottom: 8 }}>💬 Brise-glaces du jour</Text>
          {ICEBREAKERS.map((ice, i) => (
            <TouchableOpacity key={i} style={{ backgroundColor: Colors.white, borderRadius: 10, padding: 10, marginBottom: i < ICEBREAKERS.length - 1 ? 6 : 0 }}>
              <Text style={{ fontSize: 11, color: Colors.navy }}>{ice}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Membres */}
        <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>COLOCATAIRES</Text>
        {MEMBRES.map((m, i) => {
          if (tomRemplace && m.name === 'Tom K.') return null;
          return (
            <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 13, padding: 12, marginBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 10, borderLeftWidth: !m.actif ? 3 : 0, borderLeftColor: Colors.gold }}>
              <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: m.actif ? Colors.tealLight : '#FFF3E0', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 17 }}>{m.avatar}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: Colors.navy, marginBottom: 2 }}>{m.name}</Text>
                <Text style={{ fontSize: 9, color: Colors.muted }}>{m.role} · {m.derniereActivite}</Text>
              </View>
              <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, backgroundColor: m.status === 'ok' ? '#E8F5E9' : '#FFF3E0' }}>
                <Text style={{ fontSize: 10, fontWeight: '600', color: m.status === 'ok' ? Colors.green : Colors.gold }}>{m.statusText}</Text>
              </View>
            </View>
          );
        })}

        {/* La tournante */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase' }}>LA TOURNANTE</Text>
          <TouchableOpacity onPress={onTournante} style={{ backgroundColor: Colors.teal, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 8 }}>
            <Text style={{ color: Colors.white, fontSize: 11, fontWeight: '600' }}>Voir le planning →</Text>
          </TouchableOpacity>
        </View>
        {ACTIONS.map((a, i) => (
          <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 11, padding: 11, marginBottom: 7, flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: i === 0 ? 8 : 0 }}>
            <View style={{ width: 34, height: 34, borderRadius: 9, backgroundColor: a.color, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 15 }}>{a.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: Colors.navy }}>{a.label}</Text>
              <Text style={{ fontSize: 9, color: Colors.muted, marginTop: 1 }}>{a.detail}</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: Colors.teal, borderRadius: 7, paddingHorizontal: 9, paddingVertical: 4 }}>
              <Text style={{ color: Colors.white, fontSize: 9, fontWeight: '600' }}>Voir</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Modal remplaçant */}
      <Modal visible={showRemplacant} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{ backgroundColor: Colors.white, borderRadius: 20, padding: 24, paddingBottom: 40 }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: Colors.navy, marginBottom: 4 }}>Trouver un remplaçant</Text>
            <Text style={{ fontSize: 12, color: Colors.muted, marginBottom: 20 }}>Le slot de Tom sera libéré. L'IA cherchera un profil compatible avec votre groupe.</Text>
            <View style={{ backgroundColor: Colors.tealLight, borderRadius: 12, padding: 14, marginBottom: 16 }}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.teal, marginBottom: 6 }}>✓ Le groupe reste valide</Text>
              <Text style={{ fontSize: 11, color: Colors.navy, lineHeight: 17 }}>Vous continuez à 3 pendant la recherche. Le nouveau membre devra accepter les règles du groupe.</Text>
            </View>
            <TouchableOpacity onPress={() => { setShowRemplacant(false); setShowFantome(false); setTomRemplace(true); }} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>Libérer le slot et chercher</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowRemplacant(false)} style={{ alignItems: 'center' }}>
              <Text style={{ color: Colors.muted, fontSize: 12 }}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomNav items={[
        { icon: '🏠', label: 'Groupe', active: true },
        { icon: '🗺️', label: 'Voisinage', onPress: onVoisinage },
        { icon: '🎯', label: 'Activités', onPress: onActivites },
        { icon: '🔔', label: 'Notifs', onPress: onNotifs },
        { icon: '👤', label: 'Profil', onPress: onProfil },
      ]} />
    </SafeAreaView>
  );
}
