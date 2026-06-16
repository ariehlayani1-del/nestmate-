import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Modal } from 'react-native';
import { Colors } from '../constants/theme';
import { Tag } from '../components/UI';

export function DepotAnnonceScreen({ onNext, onBack }: any) {
  const [rooms, setRooms] = useState(3);
  const [criteres, setCriteres] = useState<string[]>([]);

  const toggleCritere = (c: string) => setCriteres(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 50 }}>
        <TouchableOpacity onPress={onBack} style={{ marginBottom: 14 }}>
          <Text style={{ color: Colors.muted, fontSize: 13 }}>← Retour</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.navy, marginBottom: 4 }}>Déposer une annonce</Text>
        <Text style={{ fontSize: 12, color: Colors.muted, marginBottom: 18 }}>Décrivez votre bien pour trouver les meilleurs colocataires</Text>

        {/* Vérification bien */}
        <View style={{ backgroundColor: Colors.tealLight, borderRadius: 12, padding: 12, marginBottom: 16, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <Text style={{ fontSize: 20 }}>🔍</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.teal, marginBottom: 2 }}>Vérification du bien</Text>
            <Text style={{ fontSize: 11, color: Colors.navy }}>Numéro DPE requis + photo avec date lisible pour les nouveaux propriétaires</Text>
          </View>
        </View>

        {[['ADRESSE COMPLÈTE','14 Rue Garibaldi, Lyon 6e'],['SURFACE (m²)','85'],['NUMÉRO DPE','DPE-2024-XXXXX'],['LOYER CHARGES COMPRISES (€/mois)','1920'],['DISPONIBLE À PARTIR DU','01/09/2025']].map(([label, ph]) => (
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

        {/* Critères standardisés anti-discrimination */}
        <View style={{ backgroundColor: Colors.white, borderRadius: 12, padding: 12, marginBottom: 16 }}>
          <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>CRITÈRES STANDARDISÉS</Text>
          <Text style={{ fontSize: 10, color: Colors.muted, marginBottom: 10 }}>Filtre anti-discrimination automatique appliqué</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 7 }}>
            {['Non-fumeurs','Sans animaux','CDI/CDD requis','Garant requis','Étudiant accepté','Apprenti accepté'].map(c => (
              <TouchableOpacity key={c} onPress={() => toggleCritere(c)} style={{ backgroundColor: criteres.includes(c) ? Colors.navy : Colors.gray, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 }}>
                <Text style={{ fontSize: 10, color: criteres.includes(c) ? Colors.white : Colors.navy, fontWeight: '600' }}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Délai 72h */}
        <View style={{ backgroundColor: '#FFF3E0', borderRadius: 12, padding: 12, marginBottom: 16, flexDirection: 'row', gap: 10 }}>
          <Text style={{ fontSize: 20 }}>⏱️</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.gold, marginBottom: 2 }}>Délai de réponse automatique</Text>
            <Text style={{ fontSize: 11, color: Colors.navy }}>Passé 72h sans réponse de votre part, le groupe sera libéré pour d'autres logements</Text>
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
  const [photosReveles, setPhotosReveles] = useState<number[]>([]);
  const [showDelai, setShowDelai] = useState(true);

  const GROUPES = [
    {
      score: '94%', resume: 'Groupe calme, tous étudiants en master, revenus vérifiés',
      members: [
        { avatar: '👩‍🎓', name: 'Léa', age: 22, tags: ['Calme'], score: '96%' },
        { avatar: '👨‍💻', name: 'Tom', age: 24, tags: ['Sérieux'], score: '92%' },
        { avatar: '🧑‍🎨', name: 'Camille', age: 23, tags: ['Art'], score: '94%' },
      ],
      dossiers: '3/3 complets', revenus: '3x le loyer', tempsRestant: '68h',
    },
    {
      score: '87%', resume: 'Groupe actif, tous en CDI, garants présents',
      members: [
        { avatar: '👨‍🔬', name: 'Hugo', age: 25, tags: ['CDI'], score: '89%' },
        { avatar: '👩‍💼', name: 'Sofia', age: 23, tags: ['Stage'], score: '86%' },
        { avatar: '🧑‍💻', name: 'Nico', age: 24, tags: ['Freelance'], score: '85%' },
      ],
      dossiers: '3/3 complets', revenus: '2.8x le loyer', tempsRestant: '41h',
    },
    {
      score: '82%', resume: 'Groupe mixte, 2 CDI + 1 apprenti, profils vérifiés',
      members: [
        { avatar: '🧑‍🎓', name: 'Marc', age: 26, tags: ['CDI'], score: '84%' },
        { avatar: '👩‍🔬', name: 'Emma', age: 22, tags: ['Apprenti'], score: '81%' },
        { avatar: '👨‍🎨', name: 'Jules', age: 24, tags: ['CDI'], score: '80%' },
      ],
      dossiers: '2/3 complets', revenus: '2.5x le loyer', tempsRestant: '12h',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 18, paddingTop: 50, paddingBottom: 32, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <TouchableOpacity onPress={onBack} style={{ marginBottom: 6 }}>
          <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>← Mes annonces</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 2 }}>3 groupes proposés</Text>
        <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>14 Rue Garibaldi · T4 · 1 920€/mois</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Alerte délai */}
        {showDelai && (
          <View style={{ backgroundColor: '#FFF3E0', borderRadius: 12, padding: 12, marginBottom: 14, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={{ fontSize: 20 }}>⏱️</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.gold }}>Répondez dans les 72h</Text>
              <Text style={{ fontSize: 11, color: Colors.navy }}>Passé ce délai, les groupes seront libérés automatiquement</Text>
            </View>
            <TouchableOpacity onPress={() => setShowDelai(false)}>
              <Text style={{ color: Colors.muted, fontSize: 18 }}>✕</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={{ fontSize: 11, color: Colors.muted, marginBottom: 14, lineHeight: 17 }}>
          📸 Les photos sont masquées lors de la première présentation pour éviter les biais. Révélez-les après avoir évalué les critères objectifs.
        </Text>

        {GROUPES.map((g, i) => (
          <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 14, borderLeftWidth: 4, borderLeftColor: g.tempsRestant.startsWith('1') ? Colors.red : Colors.teal }}>
            {/* Header groupe */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.navy, marginBottom: 4 }}>Groupe {i+1}</Text>
                <Text style={{ fontSize: 11, color: Colors.muted, lineHeight: 16 }}>{g.resume}</Text>
              </View>
              <View style={{ backgroundColor: Colors.tealLight, paddingHorizontal: 9, paddingVertical: 3, borderRadius: 8, marginLeft: 8 }}>
                <Text style={{ color: Colors.teal, fontWeight: '700', fontSize: 12 }}>🏆 {g.score}</Text>
              </View>
            </View>

            {/* Membres avec photos masquées */}
            {g.members.map((m, j) => (
              <View key={j} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: photosReveles.includes(i) ? Colors.tealLight : Colors.gray, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: photosReveles.includes(i) ? 18 : 20 }}>{photosReveles.includes(i) ? m.avatar : '👤'}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: Colors.navy }}>{photosReveles.includes(i) ? `${m.name}, ${m.age} ans` : `Membre ${j+1}, ${m.age} ans`}</Text>
                  <View style={{ flexDirection: 'row', gap: 4, marginTop: 2 }}>
                    {m.tags.map(t => <Tag key={t} label={t} color="teal" />)}
                  </View>
                </View>
                <View style={{ backgroundColor: Colors.tealLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 }}>
                  <Text style={{ color: Colors.teal, fontSize: 11, fontWeight: '700' }}>{m.score}</Text>
                </View>
              </View>
            ))}

            {/* Révéler photos */}
            {!photosReveles.includes(i) && (
              <TouchableOpacity onPress={() => setPhotosReveles(prev => [...prev, i])} style={{ backgroundColor: Colors.gray, borderRadius: 10, paddingVertical: 8, alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 12, color: Colors.navy, fontWeight: '600' }}>👁 Révéler les photos et prénoms</Text>
              </TouchableOpacity>
            )}

            {/* Infos */}
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 10 }}>
              <Tag label={'📁 ' + g.dossiers} color="teal" />
              <Tag label={'💰 ' + g.revenus} color="navy" />
              <Tag label={'⏱ ' + g.tempsRestant} color={g.tempsRestant.startsWith('1') ? 'red' : 'gold'} />
            </View>

            {/* Actions */}
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity onPress={onSelect} style={{ flex: 2, backgroundColor: Colors.teal, borderRadius: 10, paddingVertical: 10, alignItems: 'center' }}>
                <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 12 }}>✓ Accepter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, borderWidth: 1.5, borderColor: Colors.border, borderRadius: 10, paddingVertical: 10, alignItems: 'center' }}>
                <Text style={{ color: Colors.muted, fontSize: 12 }}>Dossiers</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, borderWidth: 1.5, borderColor: '#F0C0BD', borderRadius: 10, paddingVertical: 10, alignItems: 'center' }}>
                <Text style={{ color: Colors.red, fontSize: 12 }}>Refuser</Text>
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
              <Text style={{ fontSize: 16, fontWeight: '800', color: s.color }}>{s.value}</Text>
              <Text style={{ fontSize: 9, color: Colors.muted, textAlign: 'center' }}>{s.label}</Text>
            </View>
          ))}
        </View>

        <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>MES ANNONCES</Text>
        {[{addr:'14 Rue Garibaldi, Lyon 6e',detail:'T4 · 85m² · 1 920€/mois',groups:3,urgent:true},{addr:'7 Rue de la Martinière, Lyon 1er',detail:'T3 · 60m² · 1 380€/mois',groups:2,urgent:false}].map((a,i) => (
          <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 12, padding: 12, marginBottom: 8, flexDirection: 'row', alignItems: 'center', borderLeftWidth: a.urgent ? 3 : 0, borderLeftColor: Colors.gold }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.navy, marginBottom: 2 }}>{a.addr}</Text>
              <Text style={{ fontSize: 10, color: Colors.muted }}>{a.detail}</Text>
            </View>
            <View style={{ alignItems: 'flex-end', gap: 5 }}>
              <Tag label="Active" color="teal" />
              <Text style={{ fontSize: 10, color: a.urgent ? Colors.gold : Colors.muted }}>{a.groups} groupes {a.urgent ? '⚠️' : ''}</Text>
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
