import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { Colors } from '../constants/theme';

export default function SignUpScreen({ onNext, onBack }: any) {
  const [email, setEmail] = useState('');
  const [prenom, setPrenom] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 50 }}>
        <TouchableOpacity onPress={onBack} style={{ marginBottom: 18 }}>
          <Text style={{ color: Colors.muted, fontSize: 13 }}>← Retour</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: '800', color: Colors.navy, marginBottom: 4 }}>Créer mon compte</Text>
        <Text style={{ fontSize: 12, color: Colors.muted, marginBottom: 20 }}>Rejoins la communauté Nestmate</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 14 }}>
          <TouchableOpacity style={{ flex: 1, backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.border, borderRadius: 10, paddingVertical: 10, alignItems: 'center' }}>
            <Text>🍎  Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.border, borderRadius: 10, paddingVertical: 10, alignItems: 'center' }}>
            <Text>🔵  Google</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 12 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: Colors.border }} />
          <Text style={{ fontSize: 10, color: Colors.muted }}>ou par email</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: Colors.border }} />
        </View>
        {[['PRÉNOM', prenom, setPrenom, 'Léa', false], ['EMAIL', email, setEmail, 'lea@email.com', false], ['MOT DE PASSE', password, setPassword, '••••••••', true]].map(([label, val, setter, ph, sec]: any) => (
          <View key={label} style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{label}</Text>
            <TextInput style={{ backgroundColor: Colors.white, borderWidth: 1.5, borderColor: val ? Colors.teal : Colors.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, fontSize: 13, color: Colors.navy }} value={val} onChangeText={setter} placeholder={ph} placeholderTextColor="#C0B8AE" secureTextEntry={sec} autoCapitalize="none" />
          </View>
        ))}
        <TouchableOpacity onPress={onNext} style={{ backgroundColor: Colors.teal, borderRadius: 12, paddingVertical: 13, alignItems: 'center', marginTop: 6 }}>
          <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 14 }}>Créer mon compte</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 10, color: Colors.muted, textAlign: 'center', marginTop: 10 }}>En créant un compte, tu acceptes les <Text style={{ color: Colors.teal }}>CGU</Text></Text>
        <TouchableOpacity style={{ alignItems: 'center', marginTop: 14 }} onPress={onNext}>
          <Text style={{ color: Colors.muted, fontSize: 12 }}>Déjà un compte ? <Text style={{ color: Colors.teal, fontWeight: '600' }}>Se connecter</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
