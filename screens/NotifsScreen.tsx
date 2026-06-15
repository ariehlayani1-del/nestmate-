import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../constants/theme';
import { BottomNav } from '../components/UI';

const NOTIFS: Record<string, any[]> = {
  "Aujourd'hui": [
    { icon: '✅', bg: '#E8F5E9', title: 'Tom a accepté le groupe', sub: 'Votre groupe est complet ! 4/4 membres', isNew: true, btns: true },
    { icon: '💬', bg: Colors.tealLight, title: 'Nouveau message dans le groupe', sub: 'Léa : "On se fait une soirée crêpes vendredi ?"', isNew: true },
    { icon: '📋', bg: '#FFF3E0', title: 'Règlement intérieur en attente', sub: '2 membres doivent encore signer', isNew: false },
  ],
  "Cette semaine": [
    { icon: '⭐', bg: '#FEF3DD', title: 'Léa a laissé un avis sur toi', sub: '"Très ponctuel et propre. Super coloc !"', isNew: false },
    { icon: '🎯', bg: Colors.tealLight, title: 'Activité recommandée', sub: 'Escalade Urban Climb — Sam 12 oct à 14h', isNew: false },
    { icon: '🔔', bg: '#FDECEA', title: 'Rappel loyer', sub: 'Paiement à effectuer avant le 5 octobre', isNew: false },
  ],
};

export default function NotifsScreen({ onGroupe, onActivites, onProfil, onVoisinage }: any) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 18, paddingTop: 50, paddingBottom: 6 }}>
        <Text style={{ fontSize: 24, fontWeight: '800', color: Colors.navy, flex: 1 }}>Notifications</Text>
        <View style={{ backgroundColor: Colors.red, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 }}>
          <Text style={{ color: Colors.white, fontSize: 11, fontWeight: '700' }}>3</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 80 }}>
        {Object.entries(NOTIFS).map(([group, items]) => (
          <View key={group}>
            <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8, marginTop: 6 }}>{group}</Text>
            {items.map((n, i) => (
              <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 13, padding: 12, marginBottom: 8, flexDirection: 'row', alignItems: 'flex-start', gap: 10, overflow: 'hidden' }}>
                {n.isNew && <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, backgroundColor: Colors.teal }} />}
                <View style={{ width: 34, height: 34, borderRadius: 9, backgroundColor: n.bg, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Text style={{ fontSize: 15 }}>{n.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 11, color: Colors.navy, lineHeight: 16, marginBottom: 3, fontWeight: '700' }}>{n.title}</Text>
                  <Text style={{ fontSize: 10, color: Colors.muted }}>{n.sub}</Text>
                  {n.btns && (
                    <View style={{ flexDirection: 'row', gap: 7, marginTop: 8 }}>
                      <TouchableOpacity style={{ backgroundColor: Colors.teal, borderRadius: 7, paddingHorizontal: 12, paddingVertical: 4 }}>
                        <Text style={{ color: Colors.white, fontSize: 9, fontWeight: '600' }}>Voir le groupe</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ backgroundColor: Colors.gray, borderRadius: 7, paddingHorizontal: 12, paddingVertical: 4 }}>
                        <Text style={{ fontSize: 9, fontWeight: '600', color: Colors.navy }}>Ignorer</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <BottomNav items={[
        { icon: '🏠', label: 'Groupe', onPress: onGroupe },
        { icon: '🗺️', label: 'Voisinage', onPress: onVoisinage },
        { icon: '🎯', label: 'Activités', onPress: onActivites },
        { icon: '🔔', label: 'Notifs', active: true },
        { icon: '👤', label: 'Profil', onPress: onProfil },
      ]} />
    </SafeAreaView>
  );
}
