import 'react-native-gesture-handler';
import React from 'react';
import {Provider as ProviderPaper} from 'react-native-paper';

import ManejarNotificaciones from './components/manejarnotificaciones';

import {NavigationContainer} from '@react-navigation/native';

import NotificacionesState from './context/notificacionesState';
import EstilosState from './context/estilosState';

import AppScreens from './AppScreens'

const App = () => {
  return (
    <>
    <ProviderPaper>
      <NotificacionesState>
      <EstilosState>
      <ManejarNotificaciones/>
      <NavigationContainer>
      <AppScreens/>
      </NavigationContainer>
      </EstilosState>
      </NotificacionesState>
    </ProviderPaper>
    </>
  );
};

export default App;
