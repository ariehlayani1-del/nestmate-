import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

export function Btn({ label, onPress, variant = 'teal', style }: any) {
  const map: any = {
    teal: { bg: Colors.teal, text: Colors.white, border: Colors.teal },
    navy: { bg: Colors.navy, text: Colors.white, border: Colors.navy },
    outline: { bg: 'transparent', text: Colors.navy, border: Colors.border },
    ghost: { bg: 'transparent', text: Colors.red, border: '#F0C0BD' },
  };
  const s = map[variant];
  return (
    <TouchableOpacity activeOpacity={0.82} onPress={onPress} style={[{ backgroundColor: s.bg, borderWidth: 1.5, borderColor: s.border, borderRadius: 12, paddingVertical: 13, alignItems: 'center' }, style]}>
      <Text style={{ color: s.text, fontWeight: '700', fontSize: 14 }}>{label}</Text>
    </TouchableOpacity>
  );
}

export function Tag({ label, color = 'teal' }: any) {
  const map: any = {
    teal: { bg: Colors.tealLight, text: Colors.teal },
    navy: { bg: '#EEF2F5', text: Colors.navy },
    gold: { bg: '#FEF3DD', text: Colors.gold },
    red: { bg: '#FDECEA', text: Colors.red },
    green: { bg: '#E8F5E9', text: Colors.green },
  };
  const m = map[color];
  return (
    <View style={{ backgroundColor: m.bg, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 }}>
      <Text style={{ color: m.text, fontSize: 10, fontWeight: '700' }}>{label}</Text>
    </View>
  );
}

export function Field({ label, value, placeholder = '', filled = false }: any) {
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.navy, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{label}</Text>
      <View style={{ backgroundColor: Colors.white, borderWidth: 1.5, borderColor: filled ? Colors.teal : Colors.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: value ? Colors.navy : '#C0B8AE', fontSize: 12 }}>{value || placeholder}</Text>
        {filled && <Text style={{ fontSize: 14 }}>✓</Text>}
      </View>
    </View>
  );
}

export function BottomNav({ items }: any) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingTop: 6, paddingBottom: 20, borderTopWidth: 1, borderTopColor: 'rgba(26,58,74,0.06)', backgroundColor: Colors.white, position: 'absolute', bottom: 0, left: 0, right: 0 }}>
      {items.map((item: any, i: number) => (
        <TouchableOpacity key={i} onPress={item.onPress} style={{ alignItems: 'center', gap: 2 }}>
          <Text style={{ fontSize: 18 }}>{item.icon}</Text>
          <Text style={{ fontSize: 9, color: item.active ? Colors.navy : Colors.muted, fontWeight: item.active ? '700' : '500' }}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export function MemberCard({ avatar, name, tags, score, bg = '#E8F4FF', onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ backgroundColor: Colors.white, borderRadius: 13, padding: 11, marginBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 10, shadowColor: Colors.navy, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 }}>
      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 18 }}>{avatar}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 12, fontWeight: '600', color: Colors.navy, marginBottom: 4 }}>{name}</Text>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          {tags.map((t: string, i: number) => <Tag key={i} label={t} color="teal" />)}
        </View>
      </View>
      <View style={{ backgroundColor: Colors.tealLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 }}>
        <Text style={{ color: Colors.teal, fontSize: 11, fontWeight: '700' }}>{score}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function ScoreBar({ label, value, max, color = Colors.teal }: any) {
  return (
    <View style={{ marginBottom: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
        <Text style={{ fontSize: 10, color: Colors.navy, fontWeight: '600' }}>{label}</Text>
        <Text style={{ fontSize: 10, color: Colors.muted }}>{value}/{max}</Text>
      </View>
      <View style={{ height: 4, backgroundColor: Colors.gray, borderRadius: 2, overflow: 'hidden' }}>
        <View style={{ height: 4, backgroundColor: color, borderRadius: 2, width: `${(value / max) * 100}%` as any }} />
      </View>
    </View>
  );
}
