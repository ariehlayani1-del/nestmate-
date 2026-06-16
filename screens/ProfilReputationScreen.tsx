import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Modal } from 'react-native';
import { Colors } from '../constants/theme';
import { BottomNav, Tag, ScoreBar } from '../components/UI';

const AVIS = [
  { from: '👩‍🎓', name: 'Léa M.', score: 5, comment: 'Super coloc, très propre et ponctuel !', date: 'Juil. 2025', tags: ['Propreté', 'Ponctualité'], visible: true },
  { from: '👨‍🔬', name: 'Hugo T.', score: 4, comment: 'Agréable à vivre, un peu timide au début mais vraiment sympa.', date: 'Avr. 2025', tags: ['Ambiance', 'Respect'], visible: true },
];

const PALIERS = [
  { label: 'Avant match', detail: 'Prénom + critères principaux', icon: '👤', unlocked: true },
  { label: 'Après acceptation', detail: 'Nom complet + score + intérêts', icon: '🔓', unlocked: true },
  { label: 'Groupe confirmé', detail: 'Photo nette + avis complets', icon: '📸', unlocked: false },
  { label: 'Bail signé', detail: 'Profil complet + coordonnées', icon: '📋', unlocked: false },
];

const Stars = ({ n }: { n: number }) => (
  <View style={{ flexDirection: 'row', gap: 2 }}>
    {[1,2,3,4,5].map(i => <Text key={i} style={{ fontSize: 12, color: i <= n ? Colors.gold : '#E0D8D0' }}>★</Text>)}
  </View>
);

export default function ProfilReputationScreen({ onGroupe, onActivites, onNotifs, onVoisinage }: any) {
  const [showLaisserAvis, setShowLaisserAvis] = useState(false);
  const [avisScore, setAvisScore] = useState(0);
  const [avisEnvoye, setAvisEnvoye] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header */}
        <View style={{ backgroundColor: Colors.navy, paddingBottom: 44, paddingTop: 50, paddingHorizontal: 18, alignItems: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginBottom: 20 }}>
          {/* Photo floue avant confirmation */}
          <View style={{ width: 72, height: 72, borderRadius: 36, borderWidth: 3, borderColor: Colors.teal, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(58,191,165,0.15)', marginBottom: 10 }}>
            <Text style={{ fontSize: 30 }}>🧑</Text>
          </View>
          <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 2 }}>Lucas M.</Text>
          <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>Lyon · DCG étudiant · 23 ans</Text>
          <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Tag label="✓ Identité vérifiée" color="teal" />
            <Tag label="✓ Étudiant vérifié" color="navy" />
            <View style={{ backgroundColor: Colors.gold + '30', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 }}>
              <Text style={{ color: Colors.gold, fontSize: 10, fontWeight: '700' }}>⭐ Nouveau</Text>
            </View>
          </View>
        </View>

        {/* Réputation */}
        <View style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginHorizontal: 16, marginBottom: 14 }}>
          <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>RÉPUTATION NESTMATE</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <Text style={{ fontSize: 38, fontWeight: '800', color: Colors.navy }}>4.7</Text>
            <View>
              <Stars n={5} />
              <Text style={{ fontSize: 10, color: Colors.muted, marginTop: 3 }}>Basé sur 2 colocations</Text>
            </View>
          </View>
          <ScoreBar label="🧹 Propreté" value={4.8} max={5} />
          <ScoreBar label="💬 Communication" value={4.5} max={5} color="#6C63FF" />
          <ScoreBar label="⏰ Ponctualité" value={4.9} max={5} color={Colors.gold} />
          <ScoreBar label="🤝 Respect des règles" value={4.6} max={5} color={Colors.green} />
        </View>

        {/* Système aveugle */}
        <View style={{ backgroundColor: Colors.navy, borderRadius: 14, padding: 14, marginHorizontal: 16, marginBottom: 14 }}>
          <Text style={{ fontSize: 9, fontWeight: '700', color: 'rgba(255,255,255,0.5)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>SYSTÈME D'AVIS AVEUGLE</Text>
          <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 18, marginBottom: 12 }}>Les avis sont masqués jusqu'à ce que les deux parties aient déposé leur avis. Comme sur Airbnb.</Text>
          {!avisEnvoye ? (
            <TouchableOpacity onPress={() => setShowLaisserAvis(true)} style={{ backgroundColor: Colors.teal, borderRadius: 10, paddingVertical: 10, alignItems: 'center' }}>
              <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 13 }}>Laisser un avis sur Léa →</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ backgroundColor: 'rgba(58,191,165,0.15)', borderRadius: 10, padding: 12, alignItems: 'center' }}>
              <Text style={{ color: Colors.teal, fontWeight: '700', fontSize: 13 }}>✓ Avis envoyé — en attente de Léa</Text>
            </View>
          )}
        </View>

        {/* Paliers de visibilité */}
        <View style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginHorizontal: 16, marginBottom: 14 }}>
          <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>VISIBILITÉ DU PROFIL PAR PALIERS</Text>
          {PALIERS.map((p, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8, borderBottomWidth: i < PALIERS.length - 1 ? 1 : 0, borderBottomColor: Colors.gray }}>
              <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: p.unlocked ? Colors.tealLight : Colors.gray, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16 }}>{p.unlocked ? p.icon : '🔒'}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: p.unlocked ? Colors.navy : Colors.muted }}>{p.label}</Text>
                <Text style={{ fontSize: 10, color: Colors.muted }}>{p.detail}</Text>
              </View>
              {p.unlocked && <Text style={{ color: Colors.teal, fontSize: 12 }}>✓</Text>}
            </View>
          ))}
        </View>

        {/* Avis */}
        <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10, marginHorizontal: 16 }}>AVIS DES COLOCS</Text>
        {AVIS.map((a, i) => (
          <View key={i} style={{ backgroundColor: Colors.white, borderRadius: 13, padding: 14, marginHorizontal: 16, marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 8 }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.tealLight, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16 }}>{a.from}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: Colors.navy }}>{a.name}</Text>
                <Stars n={a.score} />
              </View>
              <Text style={{ fontSize: 10, color: Colors.muted }}>{a.date}</Text>
            </View>
            <Text style={{ fontSize: 11, color: Colors.navy, lineHeight: 17, marginBottom: 8 }}>{a.comment}</Text>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              {a.tags.map(t => <Tag key={t} label={t} color="teal" />)}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal avis */}
      <Modal visible={showLaisserAvis} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{ backgroundColor: Colors.white, borderRadius: 20, padding: 24, paddingBottom: 40 }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: Colors.navy, marginBottom: 4 }}>Ton avis sur Léa M.</Text>
            <Text style={{ fontSize: 12, color: Colors.muted, marginBottom: 20 }}>Ton avis sera visible uniquement quand Léa aura aussi laissé le sien</Text>
            <Text style={{ fontSize: 13, fontWeight: '600', color: Colors.navy, marginBottom: 12 }}>Note globale</Text>
            <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', marginBottom: 20 }}>
              {[1,2,3,4,5].map(n => (
                <TouchableOpacity key={n} onPress={() => setAvisScore(n)}>
                  <Text style={{ fontSize: 32, color: n <= avisScore ? Colors.gold : '#E0D8D0' }}>★</Text>
                </TouchableOpacity>
              ))}
            </View>
            {['Propreté', 'Communication', 'Ponctualité', 'Respect'].map(crit => (
              <View key={crit} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.gray }}>
                <Text style={{ fontSize: 13, color: Colors.navy }}>{crit}</Text>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                  {[1,2,3,4,5].map(n => <Text key={n} style={{ fontSize: 16, color: n <= 4 ? Colors.gold : '#E0D8D0' }}>★</Text>)}
                </View>
              </View>
            ))}
            <TouchableOpacity onPress={() => { setShowLaisserAvis(false); setAvisEnvoye(true); }} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center', marginTop: 16 }}>
              <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>Envoyer mon avis (anonyme) →</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowLaisserAvis(false)} style={{ alignItems: 'center', marginTop: 12 }}>
              <Text style={{ color: Colors.muted, fontSize: 12 }}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomNav items={[
        { icon: '🏠', label: 'Groupe', onPress: onGroupe },
        { icon: '🗺️', label: 'Voisinage', onPress: onVoisinage },
        { icon: '🎯', label: 'Activités', onPress: onActivites },
        { icon: '🔔', label: 'Notifs', onPress: onNotifs },
        { icon: '👤', label: 'Profil', active: true },
      ]} />
    </SafeAreaView>
  );
}
