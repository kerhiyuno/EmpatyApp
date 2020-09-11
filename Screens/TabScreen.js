import React, {useEffect,useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackScreen from './StackScreen';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {DefaultTheme} from 'react-native-paper';
import Notificaciones from '../views/notificaciones';
import {createStackNavigator} from '@react-navigation/stack';
import NotificacionesContext from '../context/notificacionesContext'

const theme= {
    ...DefaultTheme,
    colors:{
      ...DefaultTheme.colors,
      primary: '#357870',
      accent: '#194540',
      backdrop: '#3c2c18'
    }
}


const notificacionesStack = createStackNavigator();

const notificacionesStackScreen = () => {
return (
  <notificacionesStack.Navigator
    initialRouteName="Notificaciones"
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
    <notificacionesStack.Screen name="Notificaciones" component={Notificaciones} options={{headerLeft:null}} />
  </notificacionesStack.Navigator>
);
}

const Tab = createBottomTabNavigator();

const TabScreen =  () => {

    const { cantidad, obtenerCantidad,reiniciarCantidad } = useContext(NotificacionesContext);

    useEffect(() => {
        obtenerCantidad();
    },[]);

  return(
      <Tab.Navigator
       screenOptions={({route }) => ({
        tabBarIcon:({color, size})=>{
          let iconName;
          if (route.name=='Empaty') {
        
            iconName='home'
        
          }else if(route.name=='Notificaciones'){
        
          iconName='notifications'
         }
        
         return <Icon2 name={iconName} size={size} color={color} />
         }
        })}
        tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'black',
        labelStyle: {
          fontSize: 17,
        },
        tabStyle: {
          backgroundColor: '#357870'
        },
        }}>
        <Tab.Screen name="Empaty" component={StackScreen} />
        <Tab.Screen name="Notificaciones" component={notificacionesStackScreen} options={{ tabBarBadge: cantidad }} 
         listeners={{
          tabPress: () => {
            reiniciarCantidad();
          },
         }}
        />
      </Tab.Navigator>
  )
}

export default TabScreen;