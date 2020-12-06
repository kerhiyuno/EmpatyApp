import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import {View} from 'react-native';
import {DefaultTheme} from 'react-native-paper';

import sinsesion from './views/sinsesion';
import registro from './views/registro';
import registro2 from './views/registro2';
import registro3 from './views/registro3';
import registro4 from './views/registro4';
import BotonInfo from './components/botoninfo';
import BotonSalir from './components/botonsalir';
import Informacion from './views/informacion';
import {createStackNavigator} from '@react-navigation/stack';
import TabScreen from './Screens/TabScreen';
import EstilosContext from './context/estilosContext'
import { RFPercentage } from "react-native-responsive-fontsize";


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

const AppScreens = () => {
    const {colorHeader,colorTextoHeader} = useContext(EstilosContext);

  return (
    <>
      <Stack2.Navigator
      initialRouteName="Iniciar Sesion"
      screenOptions={{
        headerStyle:{
          backgroundColor: colorHeader
        },
        headerTintColor: theme.colors.surface,
        headerTitleStyle:{
          fontFamily: "Inter-SemiBold",
          fontSize:RFPercentage(2.5),
          color: colorTextoHeader
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
    </>
  );
};

export default AppScreens;
