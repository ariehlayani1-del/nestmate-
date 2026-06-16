import React, { useState, useCallback } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Colors } from './constants/theme';

import SplashScreen from './screens/SplashScreen';
import ChoixProfilScreen from './screens/ChoixProfilScreen';
import SignUpScreen from './screens/SignUpScreen';
import PhotoProfilScreen from './screens/PhotoProfilScreen';
import AppartPrefsScreen from './screens/AppartPrefsScreen';
import QuestionnaireScreen from './screens/QuestionnaireScreen';
import InterestsScreen from './screens/InterestsScreen';
import IAAnalyseScreen from './screens/IAAnalyseScreen';
import GroupeProposeScreen from './screens/GroupeProposeScreen';
import GroupeAccepteScreen from './screens/GroupeAccepteScreen';
import GroupeActifScreen from './screens/GroupeActifScreen';
import ActivitesScreen from './screens/ActivitesScreen';
import NotifsScreen from './screens/NotifsScreen';
import ProfilReputationScreen from './screens/ProfilReputationScreen';
import VoisinageScreen from './screens/VoisinageScreen';
import VerificationIdentiteScreen from './screens/VerificationIdentiteScreen';
import CheckInScreen from './screens/CheckInScreen';
import CommunauteScreen from './screens/CommunauteScreen';
import ColdStartScreen from './screens/ColdStartScreen';
import PartenairesScreen from './screens/PartenairesScreen';
import DashboardPartenaireScreen from './screens/DashboardPartenaireScreen';
import { DepotAnnonceScreen, GroupesBailleurScreen, DashboardBailleurScreen } from './screens/BailleurScreens';
import DevMenuScreen from './screens/DevMenuScreen';

type Screen = 'dev'|'splash'|'choix'|'signup'|'verification'|'photo'|'appart'|'questionnaire'|'interests'|'ia_analyse'|'groupe_propose'|'groupe_accepte'|'groupe_actif'|'activites'|'notifs'|'profil'|'voisinage'|'communaute'|'checkin'|'cold_start'|'partenaires'|'dashboard_partenaire'|'depot_annonce'|'groupes_bailleur'|'dashboard_bailleur';

export default function App() {
  const [screen, setScreen] = useState<Screen>('dev');
  const [history, setHistory] = useState<Screen[]>([]);

  const go = useCallback((next: Screen) => {
    setHistory(h => [...h, screen]);
    setScreen(next);
  }, [screen]);

  const back = useCallback(() => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(h => h.slice(0, -1));
      setScreen(prev);
    }
  }, [history]);

  const renderScreen = () => {
    switch (screen) {
      case 'dev': return <DevMenuScreen onGo={(s) => go(s as Screen)} />;
      case 'splash': return <SplashScreen onNext={() => go('choix')} />;
      case 'choix': return <ChoixProfilScreen onChercheur={() => go('signup')} onBailleur={() => go('depot_annonce')} />;
      case 'signup': return <SignUpScreen onNext={() => go('verification')} onBack={back} />;
      case 'verification': return <VerificationIdentiteScreen onNext={() => go('photo')} onBack={back} />;
      case 'photo': return <PhotoProfilScreen onNext={() => go('appart')} onBack={back} />;
      case 'appart': return <AppartPrefsScreen onNext={() => go('questionnaire')} onBack={back} />;
      case 'questionnaire': return <QuestionnaireScreen onNext={() => go('interests')} onBack={back} />;
      case 'interests': return <InterestsScreen onNext={() => go('ia_analyse')} onBack={back} />;
      case 'ia_analyse': return <IAAnalyseScreen onNext={() => go('groupe_propose')} />;
      case 'groupe_propose': return <GroupeProposeScreen onAccept={() => go('groupe_accepte')} onRefuse={() => go('ia_analyse')} onMemberPress={() => {}} />;
      case 'groupe_accepte': return <GroupeAccepteScreen onNext={() => go('groupe_actif')} />;
      case 'groupe_actif': return <GroupeActifScreen onActivites={() => go('activites')} onProfil={() => go('profil')} onNotifs={() => go('notifs')} onVoisinage={() => go('communaute')} onTournante={() => {}} />;
      case 'activites': return <ActivitesScreen onBack={back} onGroupe={() => go('groupe_actif')} onProfil={() => go('profil')} onNotifs={() => go('notifs')} onVoisinage={() => go('communaute')} />;
      case 'notifs': return <NotifsScreen onGroupe={() => go('groupe_actif')} onActivites={() => go('activites')} onProfil={() => go('profil')} onVoisinage={() => go('communaute')} />;
      case 'profil': return <ProfilReputationScreen onGroupe={() => go('groupe_actif')} onActivites={() => go('activites')} onNotifs={() => go('notifs')} onVoisinage={() => go('communaute')} />;
      case 'voisinage': return <VoisinageScreen onGroupe={() => go('groupe_actif')} onActivites={() => go('activites')} onNotifs={() => go('notifs')} onProfil={() => go('profil')} />;
      case 'communaute': return <CommunauteScreen onGroupe={() => go('groupe_actif')} onActivites={() => go('activites')} onNotifs={() => go('notifs')} onProfil={() => go('profil')} onVoisinage={() => go('voisinage')} />;
      case 'checkin': return <CheckInScreen onNext={() => go('groupe_actif')} onBack={back} jour={30} />;
      case 'cold_start': return <ColdStartScreen onNext={() => go('signup')} onBack={back} />;
      case 'partenaires': return <PartenairesScreen onGroupe={() => go('groupe_actif')} onActivites={() => go('activites')} onNotifs={() => go('notifs')} onProfil={() => go('profil')} />;
      case 'dashboard_partenaire': return <DashboardPartenaireScreen onBack={back} />;
      case 'depot_annonce': return <DepotAnnonceScreen onNext={() => go('dashboard_bailleur')} onBack={back} />;
      case 'groupes_bailleur': return <GroupesBailleurScreen onSelect={() => go('dashboard_bailleur')} onBack={back} />;
      case 'dashboard_bailleur': return <DashboardBailleurScreen onBack={() => go('groupes_bailleur')} />;
      default: return <DevMenuScreen onGo={(s) => go(s as Screen)} />;
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.cream} />
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.cream },
});
