import React, { useCallback, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Colors } from './constants/theme';
import ActivitesScreen from './screens/ActivitesScreen';
import AnalyseIAScreen from './screens/AnalyseIAScreen';
import AppartPrefsScreen from './screens/AppartPrefsScreen';
import AucunGroupeScreen from './screens/AucunGroupeScreen';
import { DashboardBailleurScreen, DepotAnnonceScreen, GroupesBailleurScreen } from './screens/BailleurScreens';
import BiensFeedScreen from './screens/BiensFeedScreen';
import CheckInScreen from './screens/CheckInScreen';
import ChoixProfilScreen from './screens/ChoixProfilScreen';
import ColdStartScreen from './screens/ColdStartScreen';
import CommunauteScreen from './screens/CommunauteScreen';
import DashboardPartenaireScreen from './screens/DashboardPartenaireScreen';
import DevMenuScreen from './screens/DevMenuScreen';
import FiltresScreen from './screens/FiltresScreen';
import GroupeAccepteScreen from './screens/GroupeAccepteScreen';
import GroupeActifScreen from './screens/GroupeActifScreen';
import GroupeChatScreen from './screens/GroupeChatScreen';
import GroupeProposeScreen from './screens/GroupeProposeScreen';
import GroupeStatutScreen from './screens/GroupeStatutScreen';
import GroupeValidationScreen from './screens/GroupeValidationScreen';
import InterestsScreen from './screens/InterestsScreen';
import NotifsScreen from './screens/NotifsScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import ParametresScreen from './screens/ParametresScreen';
import PartenairesScreen from './screens/PartenairesScreen';
import PhotoProfilScreen from './screens/PhotoProfilScreen';
import ProfilMembreScreen from './screens/ProfilMembreScreen';
import ProfilReputationScreen from './screens/ProfilReputationScreen';
import PropertyDetailScreen from './screens/PropertyDetailScreen';
import QuestionnaireScreen from './screens/QuestionnaireScreen';
import ReputationScreen from './screens/ReputationScreen';
import SignUpScreen from './screens/SignUpScreen';
import SplashScreen from './screens/SplashScreen';
import VerificationIdentiteScreen from './screens/VerificationIdentiteScreen';
import VoisinageScreen from './screens/VoisinageScreen';

type Screen = 'dev'|'onboarding'|'splash'|'choix'|'signup'|'verification'|'photo'|'appart'|'questionnaire'|'interests'|'ia_analyse'|'groupe_propose'|'groupe_accepte'|'groupe_actif'|'groupe_statut'|'groupe_chat'|'groupe_validation'|'activites'|'notifs'|'profil'|'profil_membre'|'parametres'|'reputation'|'voisinage'|'communaute'|'checkin'|'cold_start'|'partenaires'|'dashboard_partenaire'|'depot_annonce'|'groupes_bailleur'|'dashboard_bailleur'|'biens_feed'|'filtres'|'aucun_groupe'|'property_detail';

export default function App() {
  const [screen, setScreen] = useState<Screen>('dev');
  const [history, setHistory] = useState<Screen[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);

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
      case 'choix': return <ChoixProfilScreen onChercheur={() => go('onboarding')} onBailleur={() => go('depot_annonce')} />;
      case 'onboarding': return <OnboardingScreen navigate={(s) => go(s as Screen)} />;
      case 'signup': return <SignUpScreen onNext={() => go('verification')} onBack={back} />;
      case 'verification': return <VerificationIdentiteScreen onNext={() => go('photo')} onBack={back} />;
      case 'photo': return <PhotoProfilScreen onNext={() => go('appart')} onBack={back} />;
      case 'appart': return <AppartPrefsScreen onNext={() => go('questionnaire')} onBack={back} />;
      case 'questionnaire': return <QuestionnaireScreen onNext={() => go('interests')} onBack={back} />;
      case 'interests': return <InterestsScreen onNext={() => go('ia_analyse')} onBack={back} />;
      case 'ia_analyse': return <AnalyseIAScreen go={(s: string) => go(s as Screen)} />;
      case 'groupe_propose': return <GroupeProposeScreen onAccept={() => go('groupe_accepte')} onRefuse={() => go('ia_analyse')} onMemberPress={() => {}} />;
      case 'groupe_accepte': return <GroupeAccepteScreen onNext={() => go('groupe_actif')} />;
      case 'groupe_actif': return <GroupeActifScreen onActivites={() => go('activites')} onProfil={() => go('profil')} onNotifs={() => go('notifs')} onVoisinage={() => go('communaute')} onTournante={() => {}} onChat={() => go('groupe_chat')} onStatut={() => go('groupe_statut')} onCheckin={() => go('checkin')} />;
      case 'groupe_statut': return <GroupeStatutScreen onBack={back} />;
      case 'groupe_chat': return <GroupeChatScreen onBack={back} />;
      case 'groupe_validation': return <GroupeValidationScreen onNext={() => go('biens_feed')} onBack={back} />;
      case 'profil_membre': return <ProfilMembreScreen onNext={(s: string) => go(s as Screen)} onBack={back} />;
      case 'activites': return <ActivitesScreen onBack={back} onGroupe={() => go('groupe_actif')} onProfil={() => go('profil')} onNotifs={() => go('notifs')} onVoisinage={() => go('communaute')} />;
      case 'notifs': return <NotifsScreen onGroupe={() => go('groupe_actif')} onActivites={() => go('activites')} onProfil={() => go('profil')} onVoisinage={() => go('communaute')} />;
      case 'profil': return <ProfilReputationScreen onGroupe={() => go('groupe_actif')} onActivites={() => go('activites')} onNotifs={() => go('notifs')} onVoisinage={() => go('communaute')} />;
      case 'parametres': return <ParametresScreen onBack={back} />;
      case 'reputation': return <ReputationScreen onBack={back} />;
      case 'voisinage': return <VoisinageScreen onGroupe={() => go('groupe_actif')} onActivites={() => go('activites')} onNotifs={() => go('notifs')} onProfil={() => go('profil')} />;
      case 'communaute': return <CommunauteScreen onGroupe={() => go('groupe_actif')} onActivites={() => go('activites')} onNotifs={() => go('notifs')} onProfil={() => go('profil')} onVoisinage={() => go('voisinage')} />;
      case 'checkin': return <CheckInScreen onNext={() => go('groupe_actif')} onBack={back} jour={30} />;
      case 'cold_start': return <ColdStartScreen onNext={() => go('signup')} onBack={back} />;
      case 'partenaires': return <PartenairesScreen onGroupe={() => go('groupe_actif')} onActivites={() => go('activites')} onNotifs={() => go('notifs')} onProfil={() => go('profil')} />;
      case 'dashboard_partenaire': return <DashboardPartenaireScreen onBack={back} />;
      case 'depot_annonce': return <DepotAnnonceScreen onNext={() => go('dashboard_bailleur')} onBack={back} />;
      case 'groupes_bailleur': return <GroupesBailleurScreen onSelect={() => go('dashboard_bailleur')} onBack={back} />;
      case 'dashboard_bailleur': return <DashboardBailleurScreen onBack={() => go('groupes_bailleur')} />;
      case 'biens_feed': return <BiensFeedScreen onBack={back} onOpenDetail={(id: number) => { setSelectedPropertyId(id); go('property_detail'); }} />;
      case 'filtres': return <FiltresScreen onBack={back} />;
      case 'aucun_groupe': return <AucunGroupeScreen onBack={back} />;
      case 'property_detail': return selectedPropertyId !== null ? <PropertyDetailScreen propertyId={selectedPropertyId} onBack={back} /> : <DevMenuScreen onGo={(s) => go(s as Screen)} />;
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
