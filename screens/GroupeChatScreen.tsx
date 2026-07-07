import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Alert } from 'react-native';
import { Colors } from '../constants/theme';

const INITIAL_MESSAGES = [
  { id: 1, sender: 'Lucas', text: 'Salut tout le monde ! 👋', time: '14h32', isMine: false },
  { id: 2, sender: 'Amina', text: 'Hello ! Trop contente qu\'on soit matchés 😊', time: '14h35', isMine: false },
  { id: 3, sender: 'Toi', text: 'Pareil ! On peut se faire une visio cette semaine ?', time: '14h38', isMine: true },
  { id: 4, sender: 'Lucas', text: 'Jeudi soir 20h ça vous va ?', time: '14h40', isMine: false },
  { id: 5, sender: 'Amina', text: 'Parfait pour moi ✅', time: '14h41', isMine: false },
  { id: 6, sender: 'Toi', text: 'OK pour moi aussi 👍', time: '14h42', isMine: true },
];

const ICEBREAKERS = [
  '🧹 Plutôt propre ou bordélique ?',
  '🌙 Couche-tard ou lève-tôt ?',
  '🎉 Soirées à la maison ok ?',
  '🍳 Tu cuisines souvent ?',
  '🐱 Allergique aux animaux ?',
];

const MEMBERS = [
  { initials: 'L', name: 'Lucas' },
  { initials: 'A', name: 'Amina' },
  { initials: 'T', name: 'Toi' },
];

const getAvatarColor = (initials: string) => {
  const colors = ['#E8F4FF', '#FFF0E8', '#F0E8FF', '#E8F5E9', '#FEF3DD'];
  return colors[(initials.charCodeAt(0) % colors.length)];
};

export default function GroupeChatScreen({ onBack }: any) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      const now = new Date();
      const time = `${now.getHours()}h${String(now.getMinutes()).padStart(2, '0')}`;
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'Toi',
          text: inputValue,
          time,
          isMine: true,
        },
      ]);
      setInputValue('');
    }
  };

  const handleIcebreakerTap = (icebreaker: string) => {
    setInputValue(icebreaker);
  };

  const handlePlanVisio = () => {
    Alert.alert('Visio planifiée jeudi 20h — tous les membres ont été notifiés ✅');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      {/* Header */}
      <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 18, paddingTop: 50, paddingBottom: 16, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontSize: 12, fontWeight: '700', color: 'rgba(255,255,255,0.45)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Chat</Text>
          <Text style={{ fontSize: 18, fontWeight: '800', color: Colors.white }}>Groupe Lyon #3</Text>
        </View>

        {/* Member Avatars */}
        <View style={{ flexDirection: 'row', marginLeft: 10, gap: -8 }}>
          {MEMBERS.map((member, i) => (
            <View key={i} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: getAvatarColor(member.initials), alignItems: 'center', justifyContent: 'center', marginLeft: i > 0 ? -10 : 0, borderWidth: 3, borderColor: Colors.navy }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.navy }}>{member.initials}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Messages */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16, paddingBottom: 20 }}>
        {messages.map(message => (
          <View
            key={message.id}
            style={{
              flexDirection: message.isMine ? 'row-reverse' : 'row',
              alignItems: 'flex-end',
              marginBottom: 12,
              gap: 8,
            }}
          >
            {/* Sender Avatar (small) */}
            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: getAvatarColor(message.sender[0]), alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: Colors.navy }}>{message.sender[0]}</Text>
            </View>

            {/* Message Bubble */}
            <View style={{ flex: 1, maxWidth: '80%' }}>
              <View
                style={{
                  backgroundColor: message.isMine ? Colors.teal : Colors.white,
                  borderRadius: 14,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  borderWidth: !message.isMine ? 1 : 0,
                  borderColor: !message.isMine ? Colors.border : 'transparent',
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: message.isMine ? '600' : '500', color: message.isMine ? Colors.white : Colors.navy }}>
                  {message.text}
                </Text>
              </View>
              <Text style={{ fontSize: 10, color: Colors.muted, marginTop: 4, textAlign: message.isMine ? 'right' : 'left' }}>
                {message.time}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Section */}
      <View style={{ backgroundColor: Colors.cream, paddingHorizontal: 16, paddingBottom: 16 }}>
        {/* Planifier Visio Button */}
        <TouchableOpacity
          onPress={handlePlanVisio}
          style={{
            borderWidth: 2,
            borderColor: Colors.navy,
            borderRadius: 10,
            paddingVertical: 10,
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <Text style={{ color: Colors.navy, fontWeight: '700', fontSize: 13 }}>Planifier une visio</Text>
        </TouchableOpacity>

        {/* Icebreakers */}
        <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Brise-glace 🎯</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, marginBottom: 12 }}
        >
          {ICEBREAKERS.map((icebreaker, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => handleIcebreakerTap(icebreaker)}
              style={{
                backgroundColor: Colors.white,
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: Colors.border,
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: '600', color: Colors.navy, maxWidth: 120 }}>
                {icebreaker}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <TextInput
            placeholder="Écrire un message..."
            placeholderTextColor={Colors.muted}
            value={inputValue}
            onChangeText={setInputValue}
            style={{
              flex: 1,
              fontSize: 12,
              color: Colors.navy,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.border,
              paddingHorizontal: 12,
              paddingVertical: 10,
              backgroundColor: Colors.white,
            }}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            onPress={handleSend}
            style={{
              backgroundColor: Colors.teal,
              borderRadius: 10,
              paddingHorizontal: 14,
              paddingVertical: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 13 }}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
