import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../constants/theme';
import { BottomNav, Tag } from '../components/UI';

const CATS = ['Tous','Sport','Culture','Sorties','Gastronomie','Bien-être'];
const ACTIVITES = [
  { icon: '🧗', name: 'Escalade Urban Climb', detail: 'Sam 12 oct · 14h · Lyon 7e', tags: ['Sport'], price: '18€/pers', color: '#E8F4FF' },
  { icon: '🎨', name: 'Atelier poterie Terre Vivante', detail: 'Dim 13 oct · 10h · Confluence', tags: ['Culture'], price: '35€/pers', color: '#FFF0E8' },
  { icon: '🍜', name: 'Cours de cuisine asiatique', detail: 'Ven 18 oct · 19h · Part-Dieu', tags: ['Gastronomie'], price: '45€/pers', color: '#FDECEA' },
  { icon: '🧘', name: 'Yoga en plein air', detail: 'Dim 20 oct · 9h30 · Tête d\'Or', tags: ['Bien-être'], price: 'Gratuit', color: '#F0E8FF' },
  { icon: '🎭', name: 'Théâtre des Célestins', detail: 'Jeu 24 oct · 20h30', tags: ['Culture'], price: '22€/pers', color: '#E8F5E9' },
  { icon: '🚵', name: 'VTT Monts d\'Or', detail: 'Sam 26 oct · 9h · Collonges', tags: ['Sport'], price: '25€/pers', color: '#E8F4FF' },
];

export default function ActivitesScreen({ onBack, onGroupe, onProfil, onNotifs, onVoisinage }: any) {
  const [cat, setCat] = useState('Tous');
  const filtered = cat === 'Tous' ? ACTIVITES : ACTIVITES.filter(a => a.tags.includes(cat));
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 18, paddingTop: 50, paddingBottom: 36, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 2 }}>Activités 🎯</Text>
        <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Proposées pour votre groupe</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 14, paddingVertical: 14, gap: 7 }}>
        {CATS.map(c => (
          <TouchableOpacity key={c} onPress={() => setCat(c)} style={{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 18, backgroundColor: cat===c ? Colors.navy : Colors.white }}>
            <Text style={{ fontSize: 11, fontWeight: '600', color: cat===c ? Colors.white : Colors.navy }}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}>
        {filtered.map((a, i) => (
          <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 13, padding: 12, marginBottom: 9, flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
            <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: a.color, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20 }}>{a.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.navy, marginBottom: 2 }}>{a.name}</Text>
              <Text style={{ fontSize: 10, color: Colors.muted, marginBottom: 4 }}>{a.detail}</Text>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                {a.tags.map(t => <Tag key={t} label={t} color="teal" />)}
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.navy }}>{a.price}</Text>
              <TouchableOpacity style={{ backgroundColor: Colors.teal, borderRadius: 7, paddingHorizontal: 9, paddingVertical: 4, marginTop: 6 }}>
                <Text style={{ color: Colors.white, fontSize: 9, fontWeight: '600' }}>Réserver</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <BottomNav items={[
        { icon: '🏠', label: 'Groupe', onPress: onGroupe },
        { icon: '🗺️', label: 'Voisinage', onPress: onVoisinage },
        { icon: '🎯', label: 'Activités', active: true },
        { icon: '🔔', label: 'Notifs', onPress: onNotifs },
        { icon: '👤', label: 'Profil', onPress: onProfil },
      ]} />
    </SafeAreaView>
  );
}
