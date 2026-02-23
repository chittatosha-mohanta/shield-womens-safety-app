import { create } from 'zustand';
export const useAppStore = create((set) => ({
  isOnboarded:false,isAuthenticated:false,isSOSActive:false,isJourneyActive:false,
  user:null,trustedContacts:[],currentLocation:null,journeyDestination:null,
  settings:{shakeToSOS:true,autoRecord:true,silentSOS:false,notifyPolice:true,checkInInterval:30,disguiseMode:false},
  setOnboarded:(val)=>set({isOnboarded:val}),
  setAuthenticated:(val)=>set({isAuthenticated:val}),
  setUser:(user)=>set({user}),
  addTrustedContact:(contact)=>set((s)=>({trustedContacts:[...s.trustedContacts,contact]})),
  removeTrustedContact:(id)=>set((s)=>({trustedContacts:s.trustedContacts.filter((c)=>c.id!==id)})),
  setCurrentLocation:(location)=>set({currentLocation:location}),
  activateSOS:()=>set({isSOSActive:true}),
  deactivateSOS:()=>set({isSOSActive:false}),
  startJourney:(destination)=>set({isJourneyActive:true,journeyDestination:destination}),
  endJourney:()=>set({isJourneyActive:false,journeyDestination:null}),
  updateSettings:(s)=>set((state)=>({settings:{...state.settings,...s}})),
}));
