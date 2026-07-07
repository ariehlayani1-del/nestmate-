import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

const theme = {
  navy: '#1D3A4A',
  teal: '#3ECFB0',
  cream: '#F2EDE6',
  orange: '#F2994A',
  gray: '#8B96A2',
  white: '#FFFFFF',
};

type Density = 'forte' | 'moyenne' | 'faible';

// Seuil sous lequel on affiche un avertissement de compatibilité (non bloquant)
const SCORE_WARNING_THRESHOLD = 70;

const mockResults = [
  {
    type: 'chambre_dispo',
    logement: { adresse: '12 rue Garibaldi, Lyon 6', loyer: 520, dispo: 'Maintenant' },
    groupe: { membres: ['Sophie M. - Commerce', 'Lucas T. - Informatique'], score: 87, places: 1 },
  },
  {
    type: 'groupe_existant',
    groupe: { membres: ['Emma R. - Santé', 'Théo B. - Droit'], score: 62, places: 1 },
    logement: null,
  },
  {
    type: 'groupe_en_formation',
    groupe: { membres: ['Vous'], score: null, places: 2 },
    logement: null,
  },
  {
    type: 'liste_attente',
    groupe: null,
    logement: null,
    attente: { inscrits: 34, seuil: 100 },
  },
];

const stageSteps = [
  { label: '🔍 Analyse de ta zone...', duration: 1000 },
  { label: '🏠 Recherche des logements compatibles...', duration: 1500 },
  { label: '👥 Vérification des groupes existants...', duration: 1000 },
];

// Logique de priorité (étapes 7 à 12) :
// zone trop peu dense -> liste d'attente
// sinon : chambre dispo > groupe existant > groupe en formation
function pickBestResult(density: Density) {
  if (density === 'faible') {
    return mockResults.find((item) => item.type === 'liste_attente');
  }
  if (density === 'moyenne') {
    return (
      mockResults.find((item) => item.type === 'groupe_existant')
      || mockResults.find((item) => item.type === 'groupe_en_formation')
    );
  }
  return (
    mockResults.find((item) => item.type === 'chambre_dispo')
    || mockResults.find((item) => item.type === 'groupe_existant')
    || mockResults.find((item) => item.type === 'groupe_en_formation')
  );
}

export default function AnalyseIAScreen({ go }: { go: (screen: string) => void }) {
  const [stage, setStage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [density, setDensity] = useState<Density>('forte');

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let accumulated = 0;

    stageSteps.forEach((step, index) => {
      accumulated += step.duration;
      timers.push(
        setTimeout(() => {
          setStage(index + 1);
          if (index === stageSteps.length - 1) {
            setLoading(false);
          }
        }, accumulated),
      );
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  const bestResult = pickBestResult(density);

  const renderDensityToggle = () => (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ color: theme.gray, fontSize: 11, fontWeight: '700', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        🧪 Mode test — densité de zone
      </Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {(['forte', 'moyenne', 'faible'] as Density[]).map((d) => (
          <TouchableOpacity
            key={d}
            onPress={() => setDensity(d)}
            style={{
              flex: 1,
              paddingVertical: 10,
              borderRadius: 12,
              alignItems: 'center',
              backgroundColor: density === d ? theme.navy : theme.white,
              borderWidth: 1,
              borderColor: theme.navy,
            }}
          >
            <Text style={{ color: density === d ? theme.white : theme.navy, fontSize: 12, fontWeight: '700' }}>
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  if (!bestResult) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.cream }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <Text style={{ color: theme.navy, fontSize: 18, fontWeight: '700', textAlign: 'center' }}>Aucun résultat disponible pour le moment.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderBadge = () => {
    switch (bestResult.type) {
      case 'chambre_dispo':
        return (
          <View style={{ backgroundColor: '#DFF4EA', borderRadius: 18, paddingHorizontal: 12, paddingVertical: 8, alignSelf: 'flex-start', marginBottom: 18 }}>
            <Text style={{ color: '#2C7A4B', fontWeight: '700' }}>✅ Logement disponible</Text>
          </View>
        );
      case 'groupe_existant':
        return (
          <View style={{ backgroundColor: '#FFF3E0', borderRadius: 18, paddingHorizontal: 12, paddingVertical: 8, alignSelf: 'flex-start', marginBottom: 18 }}>
            <Text style={{ color: '#B35F10', fontWeight: '700' }}>👥 Groupe sans logement</Text>
          </View>
        );
      case 'liste_attente':
        return (
          <View style={{ backgroundColor: '#ECECEC', borderRadius: 18, paddingHorizontal: 12, paddingVertical: 8, alignSelf: 'flex-start', marginBottom: 18 }}>
            <Text style={{ color: '#5F6772', fontWeight: '700' }}>⏳ Zone en liste d'attente</Text>
          </View>
        );
      default:
        return (
          <View style={{ backgroundColor: '#ECECEC', borderRadius: 18, paddingHorizontal: 12, paddingVertical: 8, alignSelf: 'flex-start', marginBottom: 18 }}>
            <Text style={{ color: '#5F6772', fontWeight: '700' }}>🧩 Groupe en formation</Text>
          </View>
        );
    }
  };

  const renderLowScoreWarning = (score: number | null | undefined) => {
    if (score == null || score >= SCORE_WARNING_THRESHOLD) return null;
    return (
      <View style={{ backgroundColor: '#FFF3E0', borderRadius: 14, padding: 14, marginTop: 14, borderWidth: 1, borderColor: '#F2994A' }}>
        <Text style={{ color: '#B35F10', fontSize: 13, fontWeight: '600', lineHeight: 18 }}>
          ⚠️ C'est la meilleure option disponible dans ta zone actuellement, mais la compatibilité reste modérée ({score}%). Tu peux tenter ce match ou élargir tes critères.
        </Text>
      </View>
    );
  };

  const renderGroupMembers = (members: string[]) => (
    <View style={{ marginTop: 16, borderRadius: 18, borderWidth: 1, borderColor: '#E5E0D8', backgroundColor: theme.white, padding: 16 }}>
      <Text style={{ color: theme.navy, fontSize: 14, fontWeight: '700', marginBottom: 10 }}>Membres du groupe</Text>
      {members.map((member, index) => (
        <Text key={index} style={{ color: theme.navy, fontSize: 13, lineHeight: 22 }}>{member}</Text>
      ))}
    </View>
  );

  const renderAlternativeCard = (item: typeof mockResults[number]) => {
    if (item.type === bestResult.type) return null;
    if (item.type === 'liste_attente') return null;

    const title = item.type === 'chambre_dispo'
      ? 'Chambre disponible'
      : item.type === 'groupe_existant'
      ? 'Groupe existant'
      : 'Groupe en formation';
    const caption = item.groupe?.score != null
      ? `Score compatibilité : ${item.groupe.score}%`
      : `Places recherchées : ${item.groupe?.places ?? '-'}`;

    return (
      <View key={item.type} style={{ backgroundColor: theme.white, borderRadius: 18, padding: 16, marginTop: 12, borderWidth: 1, borderColor: '#E5E0D8' }}>
        <Text style={{ color: theme.navy, fontSize: 15, fontWeight: '700', marginBottom: 8 }}>{title}</Text>
        <Text style={{ color: theme.gray, fontSize: 13, marginBottom: 12 }}>{caption}</Text>
        {item.groupe?.membres.map((member, index) => (
          <Text key={index} style={{ color: theme.navy, fontSize: 13, lineHeight: 22 }}>{member}</Text>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.cream }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <View style={{ marginBottom: 28 }}>
          <Text style={{ fontSize: 32, fontWeight: '800', color: theme.navy, marginBottom: 8 }}>Analyse IA</Text>
          <Text style={{ color: theme.gray, fontSize: 14, lineHeight: 20 }}>On recherche le meilleur groupe et logement pour toi, étape par étape.</Text>
        </View>

        {renderDensityToggle()}

        <View style={{ backgroundColor: theme.white, borderRadius: 24, padding: 20, marginBottom: 24, shadowColor: theme.navy, shadowOpacity: 0.06, shadowRadius: 16, shadowOffset: { width: 0, height: 10 } }}>
          {stageSteps.map((step, index) => {
            const active = stage > index;
            const current = stage === index + 1;
            return (
              <View key={step.label} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
                <View style={{ width: 32, height: 32, borderRadius: 12, backgroundColor: current ? theme.teal : active ? '#DCEEEA' : '#F1F1F1', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Text style={{ fontSize: 14 }}>{current ? '⏳' : active ? '✅' : '⏺️'}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.navy, fontSize: 14, fontWeight: current ? '700' : '600' }}>{step.label}</Text>
                  <View style={{ height: 4, width: '100%', backgroundColor: '#F0F0F0', borderRadius: 4, overflow: 'hidden', marginTop: 6 }}>
                    <View style={{ width: active || current ? '100%' : '0%', height: 4, backgroundColor: theme.teal }} />
                  </View>
                </View>
              </View>
            );
          })}
          <Text style={{ marginTop: 10, color: theme.gray, fontSize: 12 }}>{loading ? 'Patiente quelques secondes...' : 'Analyse terminée'}</Text>
        </View>

        {loading ? (
          <View style={{ alignItems: 'center', marginTop: 24 }}>
            <Text style={{ color: theme.navy, fontSize: 22, fontWeight: '800' }}>Chargement en cours</Text>
            <Text style={{ color: theme.gray, fontSize: 13, marginTop: 10 }}>Nous préparons ta meilleure proposition.</Text>
          </View>
        ) : (
          <View style={{ backgroundColor: theme.white, borderRadius: 26, padding: 22, shadowColor: theme.navy, shadowOpacity: 0.08, shadowRadius: 20, shadowOffset: { width: 0, height: 12 } }}>
            {renderBadge()}

            {bestResult.type === 'chambre_dispo' && bestResult.logement ? (
              <>
                <View style={{ marginBottom: 18, padding: 18, borderRadius: 20, backgroundColor: '#F2F9F6' }}>
                  <Text style={{ color: theme.navy, fontSize: 16, fontWeight: '700', marginBottom: 8 }}>{bestResult.logement.adresse}</Text>
                  <Text style={{ color: theme.gray, fontSize: 13, marginBottom: 4 }}>Loyer : {bestResult.logement.loyer} € / mois</Text>
                  <Text style={{ color: theme.gray, fontSize: 13 }}>Disponibilité : {bestResult.logement.dispo}</Text>
                </View>
                {bestResult.groupe?.membres ? renderGroupMembers(bestResult.groupe.membres) : null}
                <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: theme.navy, fontSize: 56, fontWeight: '900' }}>{bestResult.groupe?.score ?? 0}%</Text>
                  <Text style={{ color: theme.gray, fontSize: 13, marginTop: 4 }}>Score de compatibilité</Text>
                </View>
                {renderLowScoreWarning(bestResult.groupe?.score)}
                <TouchableOpacity onPress={() => go('groupe_propose')} activeOpacity={0.8} style={{ backgroundColor: theme.navy, borderRadius: 16, paddingVertical: 16, marginTop: 24, alignItems: 'center' }}>
                  <Text style={{ color: theme.white, fontSize: 15, fontWeight: '700' }}>Rejoindre ce groupe →</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowAlternatives((value) => !value)} activeOpacity={0.8} style={{ marginTop: 16, alignItems: 'center' }}>
                  <Text style={{ color: theme.navy, fontSize: 14, fontWeight: '700' }}>{showAlternatives ? 'Masquer d\u2019autres options' : 'Voir d\u2019autres options'}</Text>
                </TouchableOpacity>
              </>
            ) : bestResult.type === 'groupe_existant' ? (
              <>
                {bestResult.groupe?.membres ? renderGroupMembers(bestResult.groupe.membres) : null}
                <View style={{ marginTop: 20, padding: 18, borderRadius: 18, backgroundColor: '#FFF7E8' }}>
                  <Text style={{ color: theme.orange, fontSize: 20, fontWeight: '800' }}>{bestResult.groupe?.score ?? 0}%</Text>
                  <Text style={{ color: theme.gray, fontSize: 13, marginTop: 6 }}>Score de compatibilité du groupe</Text>
                </View>
                {renderLowScoreWarning(bestResult.groupe?.score)}
                <TouchableOpacity onPress={() => go('groupe_propose')} activeOpacity={0.8} style={{ backgroundColor: theme.navy, borderRadius: 16, paddingVertical: 16, marginTop: 24, alignItems: 'center' }}>
                  <Text style={{ color: theme.white, fontSize: 15, fontWeight: '700' }}>Rejoindre ce groupe</Text>
                </TouchableOpacity>
              </>
            ) : bestResult.type === 'liste_attente' ? (
              <>
                <Text style={{ color: theme.gray, fontSize: 15, lineHeight: 22, marginBottom: 16 }}>
                  Ta zone est encore peu active. On te met en liste d'attente intelligente : dès qu'un match compatible apparaît, tu es notifié en priorité.
                </Text>
                <View style={{ height: 8, backgroundColor: '#EDEDED', borderRadius: 4, marginBottom: 8 }}>
                  <View style={{
                    height: 8, borderRadius: 4, backgroundColor: theme.teal,
                    width: `${Math.min(100, ((bestResult.attente?.inscrits ?? 0) / (bestResult.attente?.seuil ?? 100)) * 100)}%`,
                  }} />
                </View>
                <Text style={{ color: theme.gray, fontSize: 12, marginBottom: 20 }}>
                  {bestResult.attente?.inscrits ?? 0} / {bestResult.attente?.seuil ?? 100} inscrits dans ta zone
                </Text>
                <TouchableOpacity onPress={() => go('invitation')} activeOpacity={0.8} style={{ backgroundColor: theme.navy, borderRadius: 16, paddingVertical: 16, alignItems: 'center' }}>
                  <Text style={{ color: theme.white, fontSize: 15, fontWeight: '700' }}>Inviter des amis pour activer ta zone</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={{ color: theme.gray, fontSize: 15, lineHeight: 22 }}>Nestmate te cherche des colocataires compatibles. Ta demande est en cours de placement dans un groupe.</Text>
                <View style={{ marginTop: 24 }}>
                  <TouchableOpacity onPress={() => go('invitation')} activeOpacity={0.8} style={{ backgroundColor: theme.navy, borderRadius: 16, paddingVertical: 16, alignItems: 'center' }}>
                    <Text style={{ color: theme.white, fontSize: 15, fontWeight: '700' }}>Inviter des amis</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => go('annonces')} activeOpacity={0.8} style={{ borderColor: theme.navy, borderWidth: 1, borderRadius: 16, paddingVertical: 16, marginTop: 12, alignItems: 'center' }}>
                    <Text style={{ color: theme.navy, fontSize: 15, fontWeight: '700' }}>Voir les annonces</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {showAlternatives && bestResult.type === 'chambre_dispo' ? (
              <View style={{ marginTop: 24 }}>
                {mockResults.filter((item) => item.type !== 'chambre_dispo').map(renderAlternativeCard)}
              </View>
            ) : null}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
