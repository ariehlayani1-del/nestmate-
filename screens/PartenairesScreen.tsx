import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../constants/theme';
import { BottomNav, Tag } from '../components/UI';

const CATEGORIES = ['Tous', 'Sport', 'Restauration', 'Loisirs', 'Bien-être', 'Culture'];

const PARTENAIRES = [
  {
    icon: '🎾', nom: 'Padel Arena Lyon', cat: 'Sport',
    offre: '-20% sur toutes les réservations', detail: '2h de padel pour 4 personnes à 32€ au lieu de 40€',
    distance: '450m', note: '4.8', avis: 124, color: '#E8F4FF',
    disponible: true, promo: 'Offre groupe',
  },
  {
    icon: '🍕', nom: 'Pizzeria La Strada', cat: 'Restauration',
    offre: '-15% sur présentation Nestmate', detail: 'Pizza + boisson offerte pour tout le groupe',
    distance: '310m', note: '4.6', avis: 89, color: '#FDECEA',
    disponible: true, promo: 'Populaire',
  },
  {
    icon: '🧗', nom: 'Urban Climb', cat: 'Sport',
    offre: '1 séance découverte offerte', detail: 'Pour les nouveaux colocataires — valable 30 jours',
    distance: '600m', note: '4.9', avis: 203, color: '#E8F5E9',
    disponible: true, promo: 'Nouveau',
  },
  {
    icon: '🎳', nom: 'Bowling République', cat: 'Loisirs',
    offre: '2 parties pour le prix d\'1', detail: 'Le mercredi soir uniquement — sur réservation',
    distance: '1.2km', note: '4.3', avis: 67, color: '#F0E8FF',
    disponible: false, promo: 'Mercredi',
  },
  {
    icon: '🍜', nom: 'Wok & Roll', cat: 'Restauration',
    offre: 'Menu groupe à 12€', detail: 'Entrée + plat + dessert pour les groupes de 3+',
    distance: '220m', note: '4.7', avis: 156, color: '#FFF3E0',
    disponible: true, promo: 'Best deal',
  },
  {
    icon: '🧘', nom: 'Studio Zen', cat: 'Bien-être',
    offre: '1 mois offert', detail: 'Pour tout nouveau groupe Nestmate — yoga & méditation',
    distance: '380m', note: '4.5', avis: 43, color: '#FEF3DD',
    disponible: true, promo: 'Exclusif',
  },
  {
    icon: '🎭', nom: 'Escape Game Lyon', cat: 'Loisirs',
    offre: '-25% pour les groupes de 4', detail: 'Toutes les salles disponibles — durée 1h',
    distance: '800m', note: '4.8', avis: 312, color: '#E8F4FF',
    disponible: true, promo: 'Groupe',
  },
  {
    icon: '🎬', nom: 'Cinéma Pathé', cat: 'Culture',
    offre: 'Place à 7€50', detail: 'Au lieu de 13€ — sur présentation du badge Nestmate',
    distance: '950m', note: '4.4', avis: 528, color: '#F0E8FF',
    disponible: true, promo: 'Toujours dispo',
  },
];

const PROMO_COLORS: Record<string, any> = {
  'Offre groupe': 'teal',
  'Populaire': 'gold',
  'Nouveau': 'green',
  'Mercredi': 'navy',
  'Best deal': 'red',
  'Exclusif': 'gold',
  'Groupe': 'teal',
  'Toujours dispo': 'navy',
};

export default function PartenairesScreen({ onGroupe, onActivites, onNotifs, onProfil }: any) {
  const [cat, setCat] = useState('Tous');
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = cat === 'Tous' ? PARTENAIRES : PARTENAIRES.filter(p => p.cat === cat);

  if (selected !== null) {
    const p = PARTENAIRES[selected];
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Header */}
          <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 18, paddingTop: 50, paddingBottom: 44, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
            <TouchableOpacity onPress={() => setSelected(null)} style={{ marginBottom: 16 }}>
              <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>← Retour</Text>
            </TouchableOpacity>
            <View style={{ width: 64, height: 64, borderRadius: 18, backgroundColor: p.color, alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <Text style={{ fontSize: 32 }}>{p.icon}</Text>
            </View>
            <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 4 }}>{p.nom}</Text>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: Colors.gold }}>★ {p.note}</Text>
              <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>({p.avis} avis)</Text>
              <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>· 📍 {p.distance}</Text>
            </View>
          </View>

          <View style={{ padding: 16 }}>
            {/* Offre Nestmate */}
            <View style={{ backgroundColor: Colors.teal, borderRadius: 16, padding: 16, marginBottom: 16 }}>
              <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>OFFRE EXCLUSIVE NESTMATE</Text>
              <Text style={{ fontSize: 20, fontWeight: '800', color: Colors.white, marginBottom: 6 }}>{p.offre}</Text>
              <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 18 }}>{p.detail}</Text>
            </View>

            {/* Comment en profiter */}
            <View style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 14 }}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.navy, marginBottom: 12 }}>Comment en profiter ?</Text>
              {[
                { step: '1', text: 'Réserve directement depuis l\'app' },
                { step: '2', text: 'Présente ton badge Nestmate à l\'accueil' },
                { step: '3', text: 'Profite de la réduction automatiquement' },
              ].map((s, i) => (
                <View key={i} style={{ flexDirection: 'row', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                  <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.tealLight, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.teal }}>{s.step}</Text>
                  </View>
                  <Text style={{ fontSize: 13, color: Colors.navy, flex: 1, paddingTop: 4 }}>{s.text}</Text>
                </View>
              ))}
            </View>

            {/* Infos pratiques */}
            <View style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 14 }}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.navy, marginBottom: 12 }}>Infos pratiques</Text>
              {[
                ['📍', 'Distance', p.distance],
                ['⏰', 'Horaires', 'Lun-Dim 9h-22h'],
                ['👥', 'Groupe minimum', '2 personnes'],
                ['📅', 'Validité', 'Toute l\'année'],
              ].map(([icon, label, val]) => (
                <View key={label} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.gray }}>
                  <Text style={{ fontSize: 12, color: Colors.muted }}>{icon} {label}</Text>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: Colors.navy }}>{val}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* CTA */}
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 34, backgroundColor: Colors.cream }}>
          <TouchableOpacity style={{ backgroundColor: p.disponible ? Colors.teal : Colors.gray, borderRadius: 12, paddingVertical: 14, alignItems: 'center' }}>
            <Text style={{ color: p.disponible ? Colors.white : Colors.muted, fontWeight: '700', fontSize: 14 }}>
              {p.disponible ? '📅 Réserver maintenant' : '⏳ Indisponible aujourd\'hui'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 18, paddingTop: 50, paddingBottom: 36, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 2 }}>Partenaires 🤝</Text>
        <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Offres exclusives pour les colocataires Nestmate</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 14, paddingVertical: 14, gap: 7 }}>
        {CATEGORIES.map(c => (
          <TouchableOpacity key={c} onPress={() => setCat(c)} style={{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 18, backgroundColor: cat === c ? Colors.navy : Colors.white }}>
            <Text style={{ fontSize: 11, fontWeight: '600', color: cat === c ? Colors.white : Colors.navy }}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}>
        <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>{filtered.length} OFFRES DISPONIBLES</Text>
        {filtered.map((p, i) => (
          <TouchableOpacity key={i} onPress={() => setSelected(PARTENAIRES.indexOf(p))} activeOpacity={0.85} style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 10, flexDirection: 'row', gap: 12, opacity: p.disponible ? 1 : 0.6 }}>
            <View style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: p.color, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Text style={{ fontSize: 24 }}>{p.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.navy }}>{p.nom}</Text>
                <Tag label={p.promo} color={PROMO_COLORS[p.promo] || 'teal'} />
              </View>
              <Text style={{ fontSize: 12, color: Colors.teal, fontWeight: '600', marginBottom: 4 }}>{p.offre}</Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Text style={{ fontSize: 11, color: Colors.gold }}>★ {p.note}</Text>
                <Text style={{ fontSize: 11, color: Colors.muted }}>📍 {p.distance}</Text>
                {!p.disponible && <Text style={{ fontSize: 11, color: Colors.red }}>Indispo aujourd'hui</Text>}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomNav items={[
        { icon: '🏠', label: 'Groupe', onPress: onGroupe },
        { icon: '🤝', label: 'Partenaires', active: true },
        { icon: '🎯', label: 'Activités', onPress: onActivites },
        { icon: '🔔', label: 'Notifs', onPress: onNotifs },
        { icon: '👤', label: 'Profil', onPress: onProfil },
      ]} />
    </SafeAreaView>
  );
}
