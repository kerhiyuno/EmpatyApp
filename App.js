import 'react-native-gesture-handler';
import React,{useEffect, useContext} from 'react';
import {View} from 'react-native';
import {DefaultTheme, Provider as ProviderPaper} from 'react-native-paper';

import sinsesion from './views/sinsesion';
import registro from './views/registro';
import registro2 from './views/registro2';
import registro3 from './views/registro3';
import registro4 from './views/registro4';
import ManejarNotificaciones from './components/manejarnotificaciones';
import BotonInfo from './components/botoninfo';
import BotonSalir from './components/botonsalir';
import Informacion from './views/informacion';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabScreen from './Screens/TabScreen';

import NotificacionesState from './context/notificacionesState';

const Stack2= createStackNavigator();

//tema

const theme= {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary: '#f58b2f',
    accent: '#194540',
    backdrop: '#3c2c18'
  }
}

const App = () => {
  return (
    <>
    <ProviderPaper>
      <NotificacionesState>
      <ManejarNotificaciones/>
      <NavigationContainer>
      <Stack2.Navigator
      initialRouteName="Iniciar Sesion"
      screenOptions={{
        headerStyle:{
          backgroundColor: theme.colors.primary
        },
        headerTintColor: theme.colors.surface,
        headerTitleStyle:{
          fontFamily: "Inter-SemiBold",
          fontSize:17
        }
      }}
      >
        <Stack2.Screen 
          name="Tabs" 
          component={TabScreen} 
          options={ ({navigation,route}) => ({
              headerLeft:null,
              animationEnabled: false,
              headerShown: false
          })}>
        </Stack2.Screen>
        <Stack2.Screen
          name= 'Iniciar Sesion'
          component={sinsesion}
          options={{headerTitle: 'Empaty',headerTitleAlign:"center"}}
          >
        </Stack2.Screen>
        <Stack2.Screen
            name= 'Registro 1/7'
            component={registro}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <View style={{flexDirection:'row'}}>
                  <BotonInfo {...props} navigation={navigation} route={route}/>
                  <BotonSalir {...props} navigation={navigation} route={route}/>
                </View>,
                headerTitle: 'Registro 1/4'
            })}
          >
        </Stack2.Screen>
        <Stack2.Screen
          name= 'Registro 2/7'
          component={registro2}
          options={ ({navigation,route}) => ({
            headerRight: (props)=>
              <View style={{flexDirection:'row'}}>
                <BotonInfo {...props} navigation={navigation} route={route}/>
                <BotonSalir {...props} navigation={navigation} route={route}/>
              </View>,
              headerTitle: 'Registro 2/4'
          })}
        >
        </Stack2.Screen>
        <Stack2.Screen
          name= 'Registro 3/7'
          component={registro3}
          options={ ({navigation,route}) => ({
            headerRight: (props)=>
              <View style={{flexDirection:'row'}}>
                <BotonInfo {...props} navigation={navigation} route={route}/>
                <BotonSalir {...props} navigation={navigation} route={route}/>
              </View>,
              headerTitle: 'Registro 3/4'
          })}
        >
        </Stack2.Screen>
        <Stack2.Screen
          name= 'Registro 4/7'
          component={registro4}
          options={ ({navigation,route}) => ({
            headerRight: (props)=>
              <View style={{flexDirection:'row'}}>
                <BotonInfo {...props} navigation={navigation} route={route}/>
                <BotonSalir {...props} navigation={navigation} route={route}/>
              </View>,
              headerTitle: 'Registro 4/4'
          })}
        >
        </Stack2.Screen>
        <Stack2.Screen
        name= 'Informacion'
        component={Informacion}
      ></Stack2.Screen>
        </Stack2.Navigator>
      </NavigationContainer>
      </NotificacionesState>
    </ProviderPaper>
    </>
  );
};

export default App;
