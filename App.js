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
import Cuestionario from './views/cuestionario';
import registro6 from './views/registro6';
import PreferenciasSicologo from './views/preferenciassicologo';
import HorarioPaciente from './views/horariopaciente';
import buscarsicologo from './views/buscarsicologo';
import elegirsicologo from './views/elegirsicologo';
import horariosicologo from './views/horariosicologo';
import solicitudes from './views/solicitudes';
import codigosicologo from './views/codigosicologo';
import editarperfil from './views/editarperfil';
import Informacion from './views/informacion';
import Preferencias from './views/preferencias';
import Chat from './views/chat';
import Conflictos from './views/conflictos';

import BotonLogout from './components/botonlogout';
import BotonSalir from './components/botonsalir';

import {AsyncStorage} from '@react-native-community/async-storage';
import {DefaultTheme, Provider as ProviderPaper} from 'react-native-paper';

import {NavigationContainer, ThemeProvider} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BotonInfo from './components/botoninfo';


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
              fontFamily: "Inter-SemiBold"
            }
          }}
        >
          <Stack.Screen
            name= 'Inicio'
            component={home}
            options={ ({navigation,route}) => ({
                headerRight: (props)=>
                  <View style={{flexDirection:'row'}}>
                      <BotonInfo {...props} navigation={navigation} route={route}/>
                    <BotonLogout {...props} navigation={navigation} route={route}/>
                  </View>,
                  headerLeft:null 
              })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Perfil'
            component={perfil}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <View style={{flexDirection:'row'}}>
                  <BotonInfo {...props} navigation={navigation} route={route}/>
                  <BotonLogout {...props} navigation={navigation} route={route}/>
                </View>
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Sesion'
            component={sesion}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <View style={{flexDirection:'row'}}>
                  <BotonInfo {...props} navigation={navigation} route={route}/>
                  <BotonLogout {...props} navigation={navigation} route={route}/>
                </View>,
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
                <View style={{flexDirection:'row'}}>
                  <BotonInfo {...props} navigation={navigation} route={route}/>
                  <BotonSalir {...props} navigation={navigation} route={route}/>
                </View>,
                headerTitle: 'Registro 1/4'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Calendario'
            component={calendario}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
              <View style={{flexDirection:'row'}}>
              <BotonInfo {...props} navigation={navigation} route={route}/>
              <BotonLogout {...props} navigation={navigation} route={route}/>
            </View>,headerTitle: 'Agenda' 
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Cita'
            component={cita}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <View style={{flexDirection:'row'}}>
                  <BotonInfo {...props} navigation={navigation} route={route}/>
                  <BotonLogout {...props} navigation={navigation} route={route}/>
                </View>
            })}
          >
          </Stack.Screen>
          <Stack.Screen
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
          </Stack.Screen>
          <Stack.Screen
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
          </Stack.Screen>
          <Stack.Screen
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
          </Stack.Screen>
          <Stack.Screen
            name= 'Cuestionario'
            component={Cuestionario}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <View style={{flexDirection:'row'}}>
                  <BotonInfo {...props} navigation={navigation} route={route}/>
                  <BotonLogout {...props} navigation={navigation} route={route}/>
                </View>,
                headerTitle: 'Cuestionario'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'PreferenciasSicologo'
            component={PreferenciasSicologo}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <View style={{flexDirection:'row'}}>
                  <BotonInfo {...props} navigation={navigation} route={route}/>
                  <BotonLogout {...props} navigation={navigation} route={route}/>
               </View>,
                headerTitle: 'Preferencias'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'ElegirHorario'
            component={HorarioPaciente}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <View style={{flexDirection:'row'}}>
                  <BotonInfo {...props} navigation={navigation} route={route}/>
                  <BotonSalir {...props} navigation={navigation} route={route}/>
                </View>,
                headerTitle: 'Elegir Horario'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Buscar Psicólogo'
            component={buscarsicologo}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <View style={{flexDirection:'row'}}>
                  <BotonInfo {...props} navigation={navigation} route={route}/>
                  <BotonLogout {...props} navigation={navigation} route={route}/>
                </View>,
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
                <View style={{flexDirection:'row'}}>
                  <BotonInfo {...props} navigation={navigation} route={route}/>
                  <BotonLogout {...props} navigation={navigation} route={route}/>
                </View>,
                headerTitle: 'Elegir Psicólogo'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'horario sicologo'
            component={horariosicologo}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <View style={{flexDirection:'row'}}>
                  <BotonInfo {...props} navigation={navigation} route={route}/>
                  <BotonLogout {...props} navigation={navigation} route={route}/>
                </View>,
                headerTitle: 'Selección de horario'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Solicitudes'
            component={solicitudes}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <View style={{flexDirection:'row'}}>
                  <BotonInfo {...props} navigation={navigation} route={route}/>
                  <BotonLogout {...props} navigation={navigation} route={route}/>
                </View>,
                headerTitle: 'Solicitudes'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'CodigoSicologo'
            component={codigosicologo}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <View style={{flexDirection:'row'}}>
                  <BotonInfo {...props} navigation={navigation} route={route}/>
                  <BotonLogout {...props} navigation={navigation} route={route}/>
                </View>,
                headerTitle: 'Ingresar Código'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'EditarPerfil'
            component={editarperfil}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <View style={{flexDirection:'row'}}>
                  <BotonInfo {...props} navigation={navigation} route={route}/>
                  <BotonLogout {...props} navigation={navigation} route={route}/>
                </View>,
                headerTitle: 'Editar Perfil'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Preferencias'
            component={Preferencias}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <View style={{flexDirection:'row'}}>
                  <BotonInfo {...props} navigation={navigation} route={route}/>
                  <BotonLogout {...props} navigation={navigation} route={route}/>
                </View>,
                headerTitle: 'Preferencias'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Chat'
            component={Chat}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <View style={{flexDirection:'row'}}>
                  <BotonInfo {...props} navigation={navigation} route={route}/>
                  <BotonLogout {...props} navigation={navigation} route={route}/>
                </View>,
                headerTitle: 'Chat'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Conflictos'
            component={Conflictos}
            options={ ({navigation,route}) => ({
              headerRight: (props)=>
                <View style={{flexDirection:'row'}}>
                  <BotonInfo {...props} navigation={navigation} route={route}/>
                  <BotonLogout {...props} navigation={navigation} route={route}/>
                </View>,
                headerTitle: 'Conflictos'
            })}
          >
          </Stack.Screen>
          <Stack.Screen
            name= 'Informacion'
            component={Informacion}
          ></Stack.Screen>
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
