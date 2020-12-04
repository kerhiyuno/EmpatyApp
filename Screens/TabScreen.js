import React, {useEffect,useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackScreen from './StackScreen';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {DefaultTheme} from 'react-native-paper';
import Notificaciones from '../views/notificaciones';
import {createStackNavigator} from '@react-navigation/stack';
import NotificacionesContext from '../context/notificacionesContext'
import EstilosContext from '../context/estilosContext'
import { RFPercentage } from "react-native-responsive-fontsize";

const theme= {
    ...DefaultTheme,
    colors:{
      ...DefaultTheme.colors,
      primary: '#f58b2f',
      accent: '#194540',
      backdrop: '#3c2c18'
    }
}


const notificacionesStack = createStackNavigator();

const notificacionesStackScreen = () => {
const {colorHeader,colorTextoHeader} = useContext(EstilosContext);
return (
  <notificacionesStack.Navigator
    initialRouteName="Notificaciones"
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
    <notificacionesStack.Screen name="Notificaciones" component={Notificaciones} options={{headerLeft:null}} />
  </notificacionesStack.Navigator>
);
}

const Tab = createBottomTabNavigator();

const TabScreen =  () => {

    const { cantidad, obtenerCantidad,reiniciarCantidad } = useContext(NotificacionesContext);
    const {colorHeader,colorTextoHeader,colorFondoInput} = useContext(EstilosContext);
    useEffect(() => {
        obtenerCantidad();
    },[]);
  

  return(
      <Tab.Navigator
       screenOptions={({route }) => ({
        tabBarIcon:({color, size})=>{
          let iconName;
          size=RFPercentage(4)
          if (route.name=='Inicio') {
        
            iconName='home'
        
          }else if(route.name=='Notificaciones'){
        
          iconName='notifications'
         }
        
         return <Icon2 name={iconName} size={size} color={color} />
         }
        })}
        tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'white',
        labelStyle: {
          fontSize: RFPercentage(2.4),
        },
        tabStyle: {
          backgroundColor: colorHeader
        },
        style: {borderTopWidth: 0},
        }}>
        <Tab.Screen name="Inicio" component={StackScreen} />
        {cantidad >0 ?
        <Tab.Screen name="Notificaciones" component={notificacionesStackScreen} options={{ tabBarBadge: cantidad }} 
         listeners={{
          tabPress: () => {
            reiniciarCantidad();
          },
         }}
        /> : 
        <Tab.Screen name="Notificaciones" component={notificacionesStackScreen} 
         listeners={{
          tabPress: () => {
            reiniciarCantidad();
          },
        }} /> }
      </Tab.Navigator>
  )
}

export default TabScreen;