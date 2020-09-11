import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme} from 'react-native-paper';

import home from '../views/home';
import sesion from '../views/sesion';
import perfil from '../views/perfil';
import calendario from '../views/calendario';
import cita from '../views/cita';
import Cuestionario from '../views/cuestionario';
import PreferenciasSicologo from '../views/preferenciassicologo';
import HorarioPaciente from '../views/horariopaciente';
import elegirsicologo from '../views/elegirsicologo';
import horariosicologo from '../views/horariosicologo';
import solicitudes from '../views/solicitudes';
import codigosicologo from '../views/codigosicologo';
import editarperfil from '../views/editarperfil';
import Informacion from '../views/informacion';
import Preferencias from '../views/preferencias';
import Chat from '../views/chat';
import Disconformidad from '../views/disconformidad';
import Desvinculacion from '../views/desvinculacion';
import BotonLogout from '../components/botonlogout';
import BotonInfo from '../components/botoninfo';


const Stack= createStackNavigator();

const theme= {
    ...DefaultTheme,
    colors:{
      ...DefaultTheme.colors,
      primary: '#357870',
      accent: '#194540',
      backdrop: '#3c2c18'
    }
}

const StackScreen = () => {
    return (
      <Stack.Navigator
      initialRouteName="Home"
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
      <Stack.Screen
        name= 'Inicio'
        component={home}
        options={ ({navigation,route}) => ({
            headerRight: (props)=>
              <View style={{flexDirection:'row'}}>
                  <BotonInfo {...props} navigation={navigation} route={route}/>
                <BotonLogout {...props} navigation={navigation} route={route}/>
              </View>,
              headerLeft:null,
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
        name= 'Desvinculacion'
        component={Desvinculacion}
        options={ ({navigation,route}) => ({
          headerRight: (props)=>
            <View style={{flexDirection:'row'}}>
              <BotonInfo {...props} navigation={navigation} route={route}/>
              <BotonLogout {...props} navigation={navigation} route={route}/>
            </View>,
            headerTitle: 'Desvinculación'
        })}
      >
      </Stack.Screen>
      <Stack.Screen
        name= 'Disconformidad'
        component={Disconformidad}
        options={ ({navigation,route}) => ({
          headerRight: (props)=>
            <View style={{flexDirection:'row'}}>
              <BotonInfo {...props} navigation={navigation} route={route}/>
              <BotonLogout {...props} navigation={navigation} route={route}/>
            </View>,
            headerTitle: 'Disconformidad'
        })}
      >
      </Stack.Screen>
      <Stack.Screen
        name= 'Informacion'
        component={Informacion}
      ></Stack.Screen>
    </Stack.Navigator>
     );
  }

export default StackScreen;