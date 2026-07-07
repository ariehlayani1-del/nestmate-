import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/theme';

const STEPS = ['Compte', 'Profil', 'Logement', 'Style de vie', 'Intérêts'];

export default function SignUpScreen({ onNext, onBack }: any) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [prenom, setPrenom] = useState('');
  const [classe, setClasse] = useState('');
  const [domaineEtudes, setDomaineEtudes] = useState('');
  const [ecoleNom, setEcoleNom] = useState('');
  const [ecoleAdresse, setEcoleAdresse] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 50 }}>
        <TouchableOpacity onPress={onBack} style={{ marginBottom: 18 }}>
          <Text style={{ color: Colors.muted, fontSize: 13 }}>← Retour</Text>
        </TouchableOpacity>

        {/* Barre de progression */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            {STEPS.map((s, i) => (
              <View key={i} style={{ alignItems: 'center', flex: 1 }}>
                <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: i + 1 <= step ? Colors.teal : Colors.gray, alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
                  <Text style={{ fontSize: 11, fontWeight: '700', color: i + 1 <= step ? Colors.white : Colors.muted }}>{i + 1}</Text>
                </View>
                <Text style={{ fontSize: 8, color: i + 1 === step ? Colors.teal : Colors.muted, fontWeight: i + 1 === step ? '700' : '400', textAlign: 'center' }}>{s}</Text>
              </View>
            ))}
          </View>
          <View style={{ height: 3, backgroundColor: Colors.gray, borderRadius: 2, overflow: 'hidden' }}>
            <View style={{ height: 3, backgroundColor: Colors.teal, borderRadius: 2, width: `${(step / STEPS.length) * 100}%` as any }} />
          </View>
          <Text style={{ fontSize: 10, color: Colors.muted, textAlign: 'right', marginTop: 4 }}>Étape {step}/{STEPS.length}</Text>
        </View>

        <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.navy, marginBottom: 4 }}>Crée ton compte</Text>
        <Text style={{ fontSize: 12, color: Colors.muted, marginBottom: 20 }}>2 champs seulement pour commencer</Text>

        {/* Boutons sociaux */}
        <TouchableOpacity style={{ backgroundColor: Colors.navy, borderRadius: 12, paddingVertical: 13, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 10, marginBottom: 10 }} onPress={onNext}>
          <Text style={{ fontSize: 18 }}>🍎</Text>
          <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>Continuer avec Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: Colors.white, borderRadius: 12, paddingVertical: 13, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 10, marginBottom: 20, borderWidth: 1.5, borderColor: Colors.border }} onPress={onNext}>
          <Text style={{ fontSize: 18 }}>🔵</Text>
          <Text style={{ color: Colors.navy, fontWeight: '700', fontSize: 14 }}>Continuer avec Google</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: Colors.border }} />
          <Text style={{ fontSize: 11, color: Colors.muted }}>ou par email</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: Colors.border }} />
        </View>

        {/* Seulement 2 champs */}
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>PRÉNOM</Text>
          <TextInput style={{ backgroundColor: Colors.white, borderWidth: 1.5, borderColor: prenom ? Colors.teal : Colors.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, fontSize: 13, color: Colors.navy }} value={prenom} onChangeText={setPrenom} placeholder="Léa" placeholderTextColor="#C0B8AE" />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>EMAIL</Text>
          <TextInput style={{ backgroundColor: Colors.white, borderWidth: 1.5, borderColor: email ? Colors.teal : Colors.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, fontSize: 13, color: Colors.navy }} value={email} onChangeText={setEmail} placeholder="lea@email.com" placeholderTextColor="#C0B8AE" autoCapitalize="none" keyboardType="email-address" />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>CLASSE</Text>
          <TextInput style={{ backgroundColor: Colors.white, borderWidth: 1.5, borderColor: classe ? Colors.teal : Colors.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, fontSize: 13, color: Colors.navy }} value={classe} onChangeText={setClasse} placeholder="Licence 3" placeholderTextColor="#C0B8AE" />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>DOMAINE D'ÉTUDES</Text>
          <TextInput style={{ backgroundColor: Colors.white, borderWidth: 1.5, borderColor: domaineEtudes ? Colors.teal : Colors.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, fontSize: 13, color: Colors.navy }} value={domaineEtudes} onChangeText={setDomaineEtudes} placeholder="Design" placeholderTextColor="#C0B8AE" />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>ÉCOLE</Text>
          <TextInput style={{ backgroundColor: Colors.white, borderWidth: 1.5, borderColor: ecoleNom ? Colors.teal : Colors.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, fontSize: 13, color: Colors.navy }} value={ecoleNom} onChangeText={setEcoleNom} placeholder="École des Arts Numériques" placeholderTextColor="#C0B8AE" />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>ADRESSE ÉCOLE</Text>
          <TextInput style={{ backgroundColor: Colors.white, borderWidth: 1.5, borderColor: ecoleAdresse ? Colors.teal : Colors.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, fontSize: 13, color: Colors.navy }} value={ecoleAdresse} onChangeText={setEcoleAdresse} placeholder="25 Rue de l'Université, Lyon" placeholderTextColor="#C0B8AE" />
        </View>

        <TouchableOpacity onPress={onNext} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center', marginBottom: 12 }}>
          <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>Continuer →</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onNext} style={{ alignItems: 'center', paddingVertical: 10 }}>
          <Text style={{ color: Colors.muted, fontSize: 12 }}>Explorer en mode invité</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 10, color: Colors.muted, textAlign: 'center', marginTop: 10, lineHeight: 16 }}>En continuant, tu acceptes les <Text style={{ color: Colors.teal }}>CGU</Text> et la <Text style={{ color: Colors.teal }}>politique de confidentialité</Text></Text>
      </ScrollView>
    </SafeAreaView>
  );
}
