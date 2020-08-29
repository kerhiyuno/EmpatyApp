import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import home from './views/home';
import sinsesion from './views/sinsesion';
import registro from './views/registro';
import sesion from './views/sesion';
import perfil from './views/perfil';
import calendario from './views/calendario';
import cita from './views/cita';
import registro2 from './views/registro2';
import registro3 from './views/registro3';
import registro4 from './views/registro4';
import registro5 from './views/registro5';
import registro6 from './views/registro6';
import registro7 from './views/registro7';
import registro8 from './views/registro8';
import buscarsicologo from './views/buscarsicologo';
import elegirsicologo from './views/elegirsicologo';
import horariosicologo from './views/horariosicologo';
import solicitudes from './views/solicitudes';
import codigosicologo from './views/codigosicologo';
import editarperfil from './views/editarperfil';

import BotonLogout from './components/botonlogout';
import BotonSalir from './components/botonsalir';

import {AsyncStorage} from '@react-native-community/async-storage';
import {DefaultTheme, Provider as ProviderPaper} from 'react-native-paper';

import {NavigationContainer, ThemeProvider} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


const Stack= createStackNavigator();

//tema
const theme= {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary: '#357870',
    accent: '#194540',
    backdrop: '#3c2c18'
  }
}

console.log(theme.colors.primary);

const App = () => {

  return (
    <>
    <ProviderPaper>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Iniciar Sesion"
          screenOptions={{
            headerStyle:{
              backgroundColor: theme.colors.primary
            },
            headerTintColor: theme.colors.surface,
            headerTitleStyle:{
              fontWeight: 'bold'
            }
          }}
        >
          <Stack.Screen
            name= 'Inicio'
            component={home}
            options={ ({navigation,route}) => ({
                headerRight: (props)=>
                  <BotonLogout {...props} navigation={navigation} route={route}/>,
                  headerLeft:null 
              })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Perfil'
            component={perfil}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <BotonLogout {...props} navigation={navigation} route={route}/>
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Sesion'
            component={sesion}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <BotonLogout {...props} navigation={navigation} route={route}/>,
                headerTitle: 'Mi grupo'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Iniciar Sesion'
            component={sinsesion}
            options={{headerTitle: 'Empaty',headerTitleAlign:"center"}}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Registro 1/7'
            component={registro}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <BotonSalir {...props} navigation={navigation} route={route}/>,
                headerTitle: 'Registro 1/8'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Calendario'
            component={calendario}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <BotonLogout {...props} navigation={navigation} route={route}/>,headerTitle: 'Agenda' 
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Cita'
            component={cita}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <BotonLogout {...props} navigation={navigation} route={route}/>
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Registro 2/7'
            component={registro2}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <BotonSalir {...props} navigation={navigation} route={route}/>,
                headerTitle: 'Registro 2/8'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Registro 3/7'
            component={registro3}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <BotonSalir {...props} navigation={navigation} route={route}/>,
                headerTitle: 'Registro 3/8'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Registro 4/7'
            component={registro4}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <BotonSalir {...props} navigation={navigation} route={route}/>,
                headerTitle: 'Registro 4/8'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Registro 5/7'
            component={registro5}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <BotonSalir {...props} navigation={navigation} route={route}/>,
                headerTitle: 'Registro 5/8'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Registro 6/7'
            component={registro6}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <BotonSalir {...props} navigation={navigation} route={route}/>,
                headerTitle: 'Registro 6/8'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Registro 7/7'
            component={registro7}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <BotonSalir {...props} navigation={navigation} route={route}/>,
                headerTitle: 'Registro 7/8'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Registro 8/7'
            component={registro8}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <BotonSalir {...props} navigation={navigation} route={route}/>,
                headerTitle: 'Registro 8/8'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Buscar Psicólogo'
            component={buscarsicologo}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <BotonLogout {...props} navigation={navigation} route={route}/>,
                headerLeft:null,
                headerTitle: 'Inicio'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Elegir Psicólogo'
            component={elegirsicologo}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <BotonLogout {...props} navigation={navigation} route={route}/>,
                headerTitle: 'Elegir Psicólogo'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'horario sicologo'
            component={horariosicologo}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <BotonLogout {...props} navigation={navigation} route={route}/>,
                headerTitle: 'Selección de horario'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Solicitudes'
            component={solicitudes}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <BotonLogout {...props} navigation={navigation} route={route}/>,
                headerTitle: 'Solicitudes'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'CodigoSicologo'
            component={codigosicologo}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <BotonLogout {...props} navigation={navigation} route={route}/>,
                headerTitle: 'Ingresar Código'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'EditarPerfil'
            component={editarperfil}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <BotonLogout {...props} navigation={navigation} route={route}/>,
                headerTitle: 'Editar Perfil'
            })}
          >
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ProviderPaper>
    </>
  );
};

const styles = StyleSheet.create({
  //options={{ headerLeft:null }}
});

export default App;
