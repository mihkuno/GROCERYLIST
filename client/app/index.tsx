import { useContext } from 'react';
import { router, useFocusEffect } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { SessionContext } from '@/provider/SessionProvider';


export default function App() {
    
    const { session } = useContext(SessionContext);
    
    useFocusEffect(()=>{

        if (session && ('id' in session && 'name' in session && 'password' in session)) {
            SystemUI.setBackgroundColorAsync("#FBF9F1");
            router.replace('/(tabs)/');
            return;
        }

        else {
            SystemUI.setBackgroundColorAsync("#92C7CF");
            router.replace('/auth/signIn');
        }

    });

    return null;   
}