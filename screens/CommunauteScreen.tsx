import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../constants/theme';
import { BottomNav, Tag } from '../components/UI';

const POSTS = [
  { avatar: '👩‍🍳', name: 'Marie, Rue Garibaldi', time: 'Il y a 10 min', content: 'Quelqu\'un a une perceuse à prêter ce week-end ? On accroche des tableaux 🔨', likes: 3, replies: 2, cat: 'Entraide' },
  { avatar: '🧑‍🌾', name: 'Pierre, Rue Servient', time: 'Il y a 1h', content: 'Le marché Jean Macé propose -50% sur les légumes le dimanche à 13h — vaut le détour !', likes: 12, replies: 5, cat: 'Bons plans' },
  { avatar: '👩‍💻', name: 'Sophie, Cours Gambetta', time: 'Il y a 2h', content: 'Soirée jeux de société chez nous samedi 20h — 4 places dispo, venez nombreux 🎲', likes: 8, replies: 7, cat: 'Événements' },
  { avatar: '🧑‍🎨', name: 'Lucas, Rue de la Barre', time: 'Hier', content: 'Attention travaux Rue Garibaldi jusqu\'au 15 octobre — prévoir 10 min de plus le matin', likes: 24, replies: 3, cat: 'Info quartier' },
];

const BONS_PLANS = [
  { icon: '🍕', name: 'Pizzeria La Strada', detail: '-15% sur présentation Nestmate', distance: '310m', color: '#FDECEA' },
  { icon: '🏋️', name: 'Urban Gym', detail: '1 mois offert pour les nouveaux colocataires', distance: '180m', color: '#E8F4FF' },
  { icon: '☕', name: 'Café Lumières', detail: 'Café offert le matin avant 9h', distance: '90m', color: '#FFF0E8' },
];

const CATS = ['Tout', 'Entraide', 'Bons plans', 'Événements', 'Info quartier'];

export default function CommunauteScreen({ onGroupe, onActivites, onNotifs, onProfil, onVoisinage }: any) {
  const [cat, setCat] = useState('Tout');
  const [liked, setLiked] = useState<number[]>([]);

  const filtered = cat === 'Tout' ? POSTS : POSTS.filter(p => p.cat === cat);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 18, paddingTop: 50, paddingBottom: 36, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 2 }}>Quartier 🗺️</Text>
        <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Lyon 6e · Autour de Garibaldi</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Catégories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 14, paddingVertical: 14, gap: 7 }}>
          {CATS.map(c => (
            <TouchableOpacity key={c} onPress={() => setCat(c)} style={{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 18, backgroundColor: cat === c ? Colors.navy : Colors.white }}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: cat === c ? Colors.white : Colors.navy }}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Bons plans partenaires */}
        {cat === 'Tout' || cat === 'Bons plans' ? (
          <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
            <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>🎁 AVANTAGES NESTMATE</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
              {BONS_PLANS.map((b, i) => (
                <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, width: 180 }}>
                  <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: b.color, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    <Text style={{ fontSize: 22 }}>{b.icon}</Text>
                  </View>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.navy, marginBottom: 4 }}>{b.name}</Text>
                  <Text style={{ fontSize: 11, color: Colors.teal, fontWeight: '600', marginBottom: 4 }}>{b.detail}</Text>
                  <Text style={{ fontSize: 10, color: Colors.muted }}>📍 {b.distance}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        ) : null}

        {/* Posts */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 80 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>PUBLICATIONS</Text>

          {/* Nouveau post */}
          <TouchableOpacity style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1.5, borderColor: Colors.border, borderStyle: 'dashed' }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.tealLight, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 18 }}>✏️</Text>
            </View>
            <Text style={{ fontSize: 13, color: Colors.muted, flex: 1 }}>Partager quelque chose avec le quartier…</Text>
          </TouchableOpacity>

          {filtered.map((post, i) => (
            <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.tealLight, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 18 }}>{post.avatar}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.navy }}>{post.name}</Text>
                  <Text style={{ fontSize: 10, color: Colors.muted }}>{post.time}</Text>
                </View>
                <Tag label={post.cat} color="teal" />
              </View>
              <Text style={{ fontSize: 13, color: Colors.navy, lineHeight: 19, marginBottom: 12 }}>{post.content}</Text>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <TouchableOpacity onPress={() => setLiked(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Text style={{ fontSize: 16 }}>{liked.includes(i) ? '❤️' : '🤍'}</Text>
                  <Text style={{ fontSize: 12, color: Colors.muted }}>{post.likes + (liked.includes(i) ? 1 : 0)}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Text style={{ fontSize: 16 }}>💬</Text>
                  <Text style={{ fontSize: 12, color: Colors.muted }}>{post.replies}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Text style={{ fontSize: 16 }}>↗️</Text>
                  <Text style={{ fontSize: 12, color: Colors.muted }}>Partager</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomNav items={[
        { icon: '🏠', label: 'Groupe', onPress: onGroupe },
        { icon: '🗺️', label: 'Quartier', active: true },
        { icon: '🎯', label: 'Activités', onPress: onActivites },
        { icon: '🔔', label: 'Notifs', onPress: onNotifs },
        { icon: '👤', label: 'Profil', onPress: onProfil },
      ]} />
    </SafeAreaView>
  );
}
