import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Colors } from '../constants/theme';
import { BottomNav } from '../components/UI';

const POSTS = [
  { id: 1, avatar: 'L', name: 'Lucas', quartier: 'Croix-Rousse', temps: '2h', texte: 'Quelqu\'un connaît un bon coiffeur pas cher dans le coin ? 😅', likes: 12 },
  { id: 2, avatar: 'A', name: 'Amina', quartier: 'Foch', temps: '5h', texte: 'Vente de meubles samedi matin, canapé + bureau IKEA, prix libres 📦', likes: 8 },
  { id: 3, avatar: 'T', name: 'Tom', quartier: 'Guillotière', temps: '1j', texte: 'Coloc cherche 1 personne pour compléter le groupe, on est 2 juristes sympa 🎯', likes: 21 },
  { id: 4, avatar: 'S', name: 'Sara', quartier: 'Vieux-Lyon', temps: '1j', texte: 'Astuce : le marché Saint-Antoine le samedi matin = meilleur rapport qualité/prix de la ville 🥕', likes: 15 },
];

const getAvatarColor = (letter: string) => {
  const colors = ['#E8F4FF', '#FFF0E8', '#F0E8FF', '#E8F5E9', '#FEF3DD'];
  return colors[(letter.charCodeAt(0) % colors.length)];
};

export default function CommunauteScreen({ onGroupe, onActivites, onNotifs, onProfil, onVoisinage }: any) {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]);
  };

  const handleCreatePost = () => {
    Alert.alert('Fonctionnalité bientôt disponible', 'La création de posts sera disponible prochainement 🚀');
  };

  const handleInviteFriend = () => {
    Alert.alert('Inviter un ami', 'Fonctionnalité bientôt disponible 👋');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={{ backgroundColor: Colors.navy, paddingHorizontal: 18, paddingTop: 50, paddingBottom: 28, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 2 }}>Ma Communauté 🏘️</Text>
          <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>Croix-Rousse, Lyon</Text>
        </View>

        {/* Cold Start Progress */}
        <View style={{ backgroundColor: Colors.white, marginHorizontal: 16, marginTop: 20, borderRadius: 16, padding: 16, marginBottom: 20, shadowColor: Colors.navy, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Lyon — Matching bientôt disponible</Text>

          {/* Progress Bar */}
          <View style={{ height: 8, backgroundColor: Colors.gray, borderRadius: 4, overflow: 'hidden', marginBottom: 10 }}>
            <View style={{ height: 8, backgroundColor: Colors.teal, borderRadius: 4, width: '67%' }} />
          </View>

          <Text style={{ fontSize: 12, fontWeight: '600', color: Colors.navy, marginBottom: 14 }}>67 étudiants inscrits · encore 33 pour lancer le matching IA</Text>

          <TouchableOpacity onPress={handleInviteFriend} style={{ backgroundColor: Colors.teal, borderRadius: 10, paddingVertical: 10, alignItems: 'center' }}>
            <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 13 }}>Inviter un ami</Text>
          </TouchableOpacity>
        </View>

        {/* Posts */}
        <View style={{ paddingHorizontal: 16 }}>
          {POSTS.map(post => {
            const isLiked = likedPosts.includes(post.id);
            return (
              <View key={post.id} style={{ backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 12, shadowColor: Colors.navy, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}>
                {/* Post Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: getAvatarColor(post.avatar), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.navy }}>{post.avatar}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.navy }}>{post.name} · {post.quartier}</Text>
                    <Text style={{ fontSize: 10, color: Colors.muted }}>{post.temps}</Text>
                  </View>
                </View>

                {/* Post Content */}
                <Text style={{ fontSize: 12, color: Colors.navy, lineHeight: 18, marginBottom: 12 }}>{post.texte}</Text>

                {/* Post Actions */}
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 16 }}>
                  <TouchableOpacity onPress={() => toggleLike(post.id)} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Text style={{ fontSize: 16 }}>{isLiked ? '❤️' : '🤍'}</Text>
                    <Text style={{ fontSize: 11, color: Colors.muted, fontWeight: '500' }}>{post.likes + (isLiked ? 1 : 0)}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Text style={{ fontSize: 16 }}>💬</Text>
                    <Text style={{ fontSize: 11, color: Colors.muted, fontWeight: '500' }}>3</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Text style={{ fontSize: 16 }}>📤</Text>
                    <Text style={{ fontSize: 11, color: Colors.muted, fontWeight: '500' }}>2</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity onPress={handleCreatePost} style={{ position: 'absolute', bottom: 100, right: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.teal, alignItems: 'center', justifyContent: 'center', shadowColor: Colors.navy, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: Colors.white }}>+</Text>
      </TouchableOpacity>

      {/* Bottom Nav */}
      <BottomNav items={[
        { icon: '🏠', label: 'Groupe', onPress: onGroupe },
        { icon: '🎯', label: 'Activités', onPress: onActivites },
        { icon: '🏘️', label: 'Communauté', active: true },
        { icon: '🔔', label: 'Notifs', onPress: onNotifs },
        { icon: '👤', label: 'Profil', onPress: onProfil },
      ]} />
    </SafeAreaView>
  );
}
