import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, Alert, Switch
} from 'react-native';


type Props = { navigate: (screen: string) => void };

const NAVY = '#1D3A4A';
const TEAL = '#3ECFB0';
const CREAM = '#F2EDE6';
const SLATE = '#5C7A8A';
const WHITE = '#FFFFFF';

export default function OnboardingScreen({ navigate }: Props) {
  const [step, setStep] = useState(1);

  // Étape 1
  const [profil, setProfil] = useState<'etudiant' | 'bailleur' | null>(null);

  // Étape 2
  const [pointRef, setPointRef] = useState<string | null>(null);
  const [adresseRef, setAdresseRef] = useState('');

  // Étape 3
  const [tempsTrajet, setTempsTrajet] = useState('20 min');
  const [modeTrajet, setModeTrajet] = useState('Transport');

  // Étape 4
  const [domaine, setDomaine] = useState<string | null>(null);

  // Étape 5
  const [prefDomaine, setPrefDomaine] = useState<string | null>(null);

  // Étape 6
  const [rythme, setRythme] = useState({
    coucheTard: false,
    leveTot: false,
    tresPropre: false,
    invites: false,
    nonFumeur: false,
    animaux: false,
  });

  // Étape 7
  const [budgetMin, setBudgetMin] = useState('400');
  const [budgetMax, setBudgetMax] = useState('700');
  const [dispo, setDispo] = useState('Dans 1 mois');

  const TOTAL_STEPS = 7;

  const next = () => {
    if (step === 1 && profil === 'bailleur') {
      Alert.alert('Bailleur', 'Flow propriétaire bientôt disponible.');
      return;
    }
    if (step < TOTAL_STEPS) setStep(step + 1);
  };
  const back = () => { if (step > 1) setStep(step - 1); };

  const canNext = () => {
    if (step === 1) return profil !== null;
    if (step === 2) return pointRef !== null;
    if (step === 4) return domaine !== null;
    if (step === 5) return prefDomaine !== null;
    return true;
  };

  const SelectCard = ({
    label, value, current, onPress
  }: { label: string; value: string; current: string | null; onPress: () => void }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderWidth: 2,
        borderColor: current === value ? TEAL : 'rgba(29,58,74,0.12)',
        backgroundColor: current === value ? 'rgba(62,207,176,0.08)' : WHITE,
        borderRadius: 14, padding: 18, marginBottom: 12,
      }}
    >
      <Text style={{ fontSize: 15, fontWeight: '600', color: NAVY }}>{label}</Text>
    </TouchableOpacity>
  );

  const ToggleBtn = ({
    label, value, current, onPress
  }: { label: string; value: string; current: string; onPress: () => void }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderWidth: 2,
        borderColor: current === value ? TEAL : 'rgba(29,58,74,0.12)',
        backgroundColor: current === value ? TEAL : WHITE,
        borderRadius: 50, paddingHorizontal: 18, paddingVertical: 10,
        marginRight: 10, marginBottom: 10,
      }}
    >
      <Text style={{
        fontSize: 14, fontWeight: '600',
        color: current === value ? NAVY : SLATE,
      }}>{label}</Text>
    </TouchableOpacity>
  );

  const renderStep = () => {
    switch (step) {

      case 1:
        return (
          <View>
            <Text style={styles.stepTitle}>Tu cherches quoi ? 👋</Text>
            <Text style={styles.stepSub}>Dis-nous qui tu es pour personnaliser ton expérience.</Text>
            <SelectCard
              label="🎓 Je cherche une coloc"
              value="etudiant"
              current={profil}
              onPress={() => setProfil('etudiant')}
            />
            <SelectCard
              label="🏠 Je loue un bien"
              value="bailleur"
              current={profil}
              onPress={() => setProfil('bailleur')}
            />
          </View>
        );

      case 2:
        return (
          <View>
            <Text style={styles.stepTitle}>Tu veux être proche de quoi ? 📍</Text>
            <Text style={styles.stepSub}>C'est la base de ton matching. Sois précis.</Text>
            {[
              '🎓 Mon école / université',
              '💼 Mon lieu de travail',
              '📋 Mon stage / alternance',
              '📍 Une adresse précise',
              '🚇 Une station de métro / tram',
              '🏘️ Un quartier précis',
            ].map((opt) => (
              <SelectCard
                key={opt} label={opt} value={opt}
                current={pointRef} onPress={() => setPointRef(opt)}
              />
            ))}
            <TextInput
              value={adresseRef}
              onChangeText={setAdresseRef}
              placeholder={
                pointRef?.includes('école') ? 'Ex : EM Lyon, Université Lyon 2...' :
                pointRef?.includes('travail') ? 'Ex : 10 rue de la République, Lyon...' :
                pointRef?.includes('station') ? 'Ex : Bellecour, Part-Dieu...' :
                'Précise le nom ou l\'adresse...'
              }
              style={styles.input}
            />
          </View>
        );

      case 3:
        return (
          <View>
            <Text style={styles.stepTitle}>Temps de trajet maximum ? ⏱️</Text>
            <Text style={styles.stepSub}>On calcule en temps réel, pas en kilomètres.</Text>
            <Text style={styles.label}>Distance acceptable</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 24 }}>
              {['10 min', '20 min', '30 min', '45 min'].map(t => (
                <ToggleBtn key={t} label={t} value={t} current={tempsTrajet} onPress={() => setTempsTrajet(t)} />
              ))}
            </View>
            <Text style={styles.label}>Mode de transport préféré</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {['🚶 À pied', '🚲 Vélo', '🚌 Transport', '🚗 Voiture'].map(m => (
                <ToggleBtn key={m} label={m} value={m} current={modeTrajet} onPress={() => setModeTrajet(m)} />
              ))}
            </View>
          </View>
        );

      case 4:
        return (
          <View>
            <Text style={styles.stepTitle}>Dans quel domaine es-tu ? 🎓</Text>
            <Text style={styles.stepSub}>Ça influence le matching avec tes futurs colocataires.</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {[
                '🏥 Santé', '⚖️ Droit', '💼 Commerce/Finance',
                '🎨 Architecture/Design', '💻 Informatique', '⚙️ Ingénierie',
                '🍽️ Restauration', '🏗️ Bâtiment', '🚀 Entrepreneuriat',
                '📚 Étudiant général', '👔 Jeune actif',
              ].map(d => (
                <TouchableOpacity
                  key={d} onPress={() => setDomaine(d)}
                  style={{
                    borderWidth: 2,
                    borderColor: domaine === d ? TEAL : 'rgba(29,58,74,0.12)',
                    backgroundColor: domaine === d ? 'rgba(62,207,176,0.08)' : WHITE,
                    borderRadius: 50, paddingHorizontal: 14, paddingVertical: 9,
                    marginRight: 8, marginBottom: 10,
                  }}
                >
                  <Text style={{ fontSize: 13, fontWeight: '600', color: domaine === d ? NAVY : SLATE }}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 5:
        return (
          <View>
            <Text style={styles.stepTitle}>Tu préfères vivre avec... 🤝</Text>
            <Text style={styles.stepSub}>Choisir le bon domaine évite beaucoup de conflits.</Text>
            <SelectCard
              label="🎯 Du même domaine exactement — ex: médecine avec médecine"
              value="exact"
              current={prefDomaine}
              onPress={() => setPrefDomaine('exact')}
            />
            <SelectCard
              label="🔗 D'un domaine proche — ex: commerce / finance / marketing"
              value="proche"
              current={prefDomaine}
              onPress={() => setPrefDomaine('proche')}
            />
            <SelectCard
              label="🌀 Peu importe, tant que le rythme est compatible"
              value="rythme"
              current={prefDomaine}
              onPress={() => setPrefDomaine('rythme')}
            />
            <View style={{
              backgroundColor: 'rgba(62,207,176,0.08)',
              borderRadius: 12, padding: 14, marginTop: 8,
            }}>
              <Text style={{ fontSize: 13, color: SLATE, lineHeight: 20 }}>
                💡 Ex : un infirmier avec un kiné partagent les mêmes horaires décalés. Un étudiant en archi avec un designer ont souvent des rendus tardifs.
              </Text>
            </View>
          </View>
        );

      case 6:
        return (
          <View>
            <Text style={styles.stepTitle}>Ton rythme de vie 🌙</Text>
            <Text style={styles.stepSub}>Ce sont les critères qui évitent les conflits au quotidien.</Text>
            {([
              ['coucheTard', '🌙 Couche-tard (après 23h)'],
              ['leveTot', '🌅 Lève-tôt (avant 7h)'],
              ['tresPropre', '🧹 Très propre'],
              ['invites', '🎉 Invités ok le week-end'],
              ['nonFumeur', '🚬 Non-fumeur uniquement'],
              ['animaux', '🐾 Animaux bienvenus'],
            ] as [keyof typeof rythme, string][]).map(([key, label]) => (
              <View key={key} style={styles.switchRow}>
                <Text style={{ fontSize: 15, color: NAVY, flex: 1 }}>{label}</Text>
                <Switch
                  value={rythme[key]}
                  onValueChange={v => setRythme({ ...rythme, [key]: v })}
                  trackColor={{ false: '#ccc', true: TEAL }}
                  thumbColor={WHITE}
                />
              </View>
            ))}
          </View>
        );

      case 7:
        return (
          <View>
            <Text style={styles.stepTitle}>Budget et disponibilité 💰</Text>
            <Text style={styles.stepSub}>Charges incluses, par mois, par personne.</Text>
            <Text style={styles.label}>Budget mensuel (charges incluses)</Text>
            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, { marginBottom: 6 }]}>Min</Text>
                <TextInput
                  value={budgetMin}
                  onChangeText={setBudgetMin}
                  keyboardType="numeric"
                  placeholder="300"
                  style={styles.input}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, { marginBottom: 6 }]}>Max</Text>
                <TextInput
                  value={budgetMax}
                  onChangeText={setBudgetMax}
                  keyboardType="numeric"
                  placeholder="900"
                  style={styles.input}
                />
              </View>
            </View>
            <Text style={styles.label}>Disponible à partir de</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 32 }}>
              {['Dès maintenant', 'Dans 1 mois', 'Dans 3 mois'].map(d => (
                <ToggleBtn key={d} label={d} value={d} current={dispo} onPress={() => setDispo(d)} />
              ))}
            </View>
            <TouchableOpacity
              onPress={() => navigate('ia_analyse')}
              style={{
                backgroundColor: NAVY, borderRadius: 14,
                paddingVertical: 18, alignItems: 'center',
              }}
            >
              <Text style={{ color: WHITE, fontSize: 16, fontWeight: '700' }}>
                Lancer mon matching IA 🚀
              </Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: CREAM }}>
      {/* Barre de progression */}
      <View style={{ paddingTop: 56, paddingHorizontal: 24, paddingBottom: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
          <Text style={{ fontSize: 12, color: SLATE, fontWeight: '600' }}>
            Étape {step} sur {TOTAL_STEPS}
          </Text>
          <Text style={{ fontSize: 12, color: TEAL, fontWeight: '600' }}>
            {Math.round((step / TOTAL_STEPS) * 100)}%
          </Text>
        </View>
        <View style={{ height: 4, backgroundColor: 'rgba(29,58,74,0.1)', borderRadius: 2 }}>
          <View style={{
            height: 4,
            backgroundColor: TEAL,
            borderRadius: 2,
            width: `${(step / TOTAL_STEPS) * 100}%`,
          }} />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {renderStep()}
      </ScrollView>

      {/* Boutons navigation */}
      {step < 7 && (
        <View style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          flexDirection: 'row', padding: 24, gap: 12,
          backgroundColor: CREAM,
          borderTopWidth: 1, borderTopColor: 'rgba(29,58,74,0.08)',
        }}>
          {step > 1 && (
            <TouchableOpacity
              onPress={back}
              style={{
                flex: 1, borderWidth: 2, borderColor: NAVY,
                borderRadius: 14, paddingVertical: 14, alignItems: 'center',
              }}
            >
              <Text style={{ color: NAVY, fontWeight: '700', fontSize: 15 }}>← Retour</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={next}
            disabled={!canNext()}
            style={{
              flex: 2,
              backgroundColor: canNext() ? NAVY : 'rgba(29,58,74,0.3)',
              borderRadius: 14, paddingVertical: 14, alignItems: 'center',
            }}
          >
            <Text style={{ color: WHITE, fontWeight: '700', fontSize: 15 }}>
              Suivant →
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = {
  stepTitle: {
    fontSize: 26, fontWeight: '800' as const,
    color: NAVY, marginBottom: 8, letterSpacing: -0.5,
  },
  stepSub: {
    fontSize: 14, color: SLATE,
    marginBottom: 28, lineHeight: 21,
  },
  label: {
    fontSize: 12, fontWeight: '700' as const,
    color: SLATE, textTransform: 'uppercase' as const,
    letterSpacing: 0.8, marginBottom: 12,
  },
  input: {
    backgroundColor: WHITE,
    borderWidth: 1.5, borderColor: 'rgba(29,58,74,0.12)',
    borderRadius: 12, padding: 14,
    fontSize: 15, color: NAVY,
  },
  switchRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(29,58,74,0.07)',
  },
};
