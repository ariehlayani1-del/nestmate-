import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { Colors } from '../constants/theme';
import { Tag, MemberCard, BottomNav } from '../components/UI';

export function DepotAnnonceScreen({ onNext, onBack }: any) {
  const [rooms, setRooms] = useState(3);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 50 }}>
        <TouchableOpacity onPress={onBack} style={{ marginBottom: 14 }}>
          <Text style={{ color: Colors.muted, fontSize: 13 }}>← Retour</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.navy, marginBottom: 4 }}>Déposer une annonce</Text>
        <Text style={{ fontSize: 12, color: Colors.muted, marginBottom: 18 }}>Décrivez votre bien pour trouver les meilleurs colocataires</Text>
        {[['ADRESSE COMPLÈTE','14 Rue Garibaldi, Lyon 6e'],['SURFACE (m²)','85'],['LOYER CHARGES COMPRISES (€/mois)','1920'],['DISPONIBLE À PARTIR DU','01/09/2025']].map(([label, ph]) => (
          <View key={label} style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{label}</Text>
            <TextInput style={{ backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 12, color: Colors.navy }} placeholder={ph} placeholderTextColor="#C0B8AE" />
          </View>
        ))}
        <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>NOMBRE DE CHAMBRES</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 14 }}>
          {[2,3,4,5,6].map(n => (
            <TouchableOpacity key={n} onPress={() => setRooms(n)} style={{ flex: 1, backgroundColor: rooms===n ? Colors.tealLight : Colors.white, borderWidth: 1.5, borderColor: rooms===n ? Colors.teal : Colors.border, borderRadius: 10, paddingVertical: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color: rooms===n ? Colors.teal : Colors.navy }}>{n}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ backgroundColor: Colors.white, borderRadius: 12, padding: 12, marginBottom: 10 }}>
          <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>CRITÈRES SOUHAITÉS</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 7 }}>
            {['Étudiants','Non-fumeurs','Sans animaux','CDI/CDD','Garant requis'].map(c => (
              <TouchableOpacity key={c} style={{ backgroundColor: Colors.gray, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 }}>
                <Text style={{ fontSize: 10, color: Colors.navy, fontWeight: '600' }}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity onPress={onNext} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center', marginTop: 10 }}>
          <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>Publier l'annonce</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export function GroupesBailleurScreen({ onSelect, onBack }: any) {
  const GROUPES = [
    { score: '94%', members: [
      { avatar: '👩‍🎓', name: 'Léa, 22 ans', tags: ['Calme'], score: '96%', bg: '#E8F4FF' },
      { avatar: '👨‍💻', name: 'Tom, 24 ans', tags: ['Sérieux'], score: '92%', bg: '#FFF0E8' },
      { avatar: '🧑‍🎨', name: 'Camille, 23 ans', tags: ['Art'], score: '94%', bg: '#F0E8FF' },
    ], dossiers: '3/3 complets', revenus: '3x le loyer' },
    { score: '87%', members: [
      { avatar: '👨‍🔬', name: 'Hugo, 25 ans', tags: ['CDI'], score: '89%', bg: '#E8F4FF' },
      { avatar: '👩‍💼', name: 'Sofia, 23 ans', tags: ['Stage'], score: '86%', bg: '#FFF0E8' },
      { avatar: '🧑‍💻', name: 'Nico, 24 ans', tags: ['Freelance'], score: '85%', bg: '#F0E8FF' },
    ], dossiers: '3/3 complets', revenus: '2.8x le loyer' },
  ];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 18, paddingTop: 50, paddingBottom: 32, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <TouchableOpacity onPress={onBack} style={{ marginBottom: 6 }}>
          <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>← Mes annonces</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 2 }}>Groupes proposés</Text>
        <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>14 Rue Garibaldi · T4 · 1 920€/mois</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {GROUPES.map((g, i) => (
          <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 14 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.navy }}>Groupe {i+1}</Text>
              <View style={{ backgroundColor: Colors.tealLight, paddingHorizontal: 9, paddingVertical: 3, borderRadius: 8 }}>
                <Text style={{ color: Colors.teal, fontWeight: '700', fontSize: 12 }}>🏆 {g.score}</Text>
              </View>
            </View>
            {g.members.map(m => <MemberCard key={m.name} {...m} />)}
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>
              <Tag label={'📁 ' + g.dossiers} color="teal" />
              <Tag label={'💰 ' + g.revenus} color="navy" />
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
              <TouchableOpacity onPress={onSelect} style={{ flex: 2, backgroundColor: Colors.teal, borderRadius: 10, paddingVertical: 10, alignItems: 'center' }}>
                <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 12 }}>✓ Accepter ce groupe</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, borderWidth: 1.5, borderColor: Colors.border, borderRadius: 10, paddingVertical: 10, alignItems: 'center' }}>
                <Text style={{ color: Colors.muted, fontSize: 12 }}>Voir dossiers</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export function DashboardBailleurScreen({ onBack }: any) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ padding: 18, paddingTop: 50 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <View>
            <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.navy }}>Tableau de bord</Text>
            <Text style={{ fontSize: 12, color: Colors.muted, marginTop: 3 }}>Bienvenue, M. Dupont 👋</Text>
          </View>
          <TouchableOpacity onPress={onBack}><Text style={{ fontSize: 20 }}>⚙️</Text></TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 18 }}>
          {[{label:'Annonces actives',value:'2',icon:'🏠',color:Colors.teal},{label:'Groupes en attente',value:'4',icon:'👥',color:'#6C63FF'},{label:'Loyers perçus',value:'3 840€',icon:'💰',color:Colors.green}].map((s,i) => (
            <View key={i} style={{ flex: 1, backgroundColor: Colors.white, borderRadius: 12, padding: 12, alignItems: 'center', gap: 3 }}>
              <Text style={{ fontSize: 18 }}>{s.icon}</Text>
              <Text style={{ fontSize: 18, fontWeight: '800', color: s.color }}>{s.value}</Text>
              <Text style={{ fontSize: 9, color: Colors.muted, textAlign: 'center' }}>{s.label}</Text>
            </View>
          ))}
        </View>
        <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>MES ANNONCES</Text>
        {[{addr:'14 Rue Garibaldi, Lyon 6e',detail:'T4 · 85m² · 1 920€/mois',groups:4},{addr:'7 Rue de la Martinière, Lyon 1er',detail:'T3 · 60m² · 1 380€/mois',groups:2}].map((a,i) => (
          <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 12, padding: 12, marginBottom: 8, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.navy, marginBottom: 2 }}>{a.addr}</Text>
              <Text style={{ fontSize: 10, color: Colors.muted }}>{a.detail}</Text>
            </View>
            <View style={{ alignItems: 'flex-end', gap: 5 }}>
              <Tag label="Active" color="teal" />
              <Text style={{ fontSize: 10, color: Colors.muted }}>{a.groups} groupes</Text>
            </View>
          </View>
        ))}
        <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8, marginTop: 6 }}>DERNIERS PAIEMENTS</Text>
        {[{label:'Groupe Garibaldi',montant:'+1 920€',date:'01/09/2025',ok:true},{label:'Groupe Martinière',montant:'+1 380€',date:'01/09/2025',ok:true},{label:'Commission Nestmate',montant:'-96€',date:'01/09/2025',ok:false}].map((p,i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.gray }}>
            <Text style={{ fontSize: 11, color: Colors.navy, flex: 1 }}>{p.label}</Text>
            <Text style={{ fontSize: 10, color: Colors.muted, flex: 1 }}>{p.date}</Text>
            <Text style={{ fontSize: 12, fontWeight: '700', color: p.ok ? Colors.green : Colors.red }}>{p.montant}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
