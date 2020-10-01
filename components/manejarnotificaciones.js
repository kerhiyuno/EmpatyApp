import React,{useEffect, useContext,useState,useRef} from 'react';
import {View,Alert,AppState} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import NotificacionesContext from '../context/notificacionesContext'

const ManejarNotificaciones = () => {

    const { aumentarCantidad,obtenerNotificaciones, guardarTokenFirebase } = useContext(NotificacionesContext);
    const appState = useRef(AppState.currentState);
    const [appStateVisible, guardarAppStateVisible] = useState(appState.current);

    useEffect(() => {
      AppState.addEventListener("change", _handleAppStateChange);
      return () => {
        AppState.removeEventListener("change", _handleAppStateChange);
      };
    }, []);

    const _handleAppStateChange = (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("Cambio a foreground!");
      }
      appState.current = nextAppState;
      guardarAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    };
  
  
    useEffect( () => {
      console.log("dassdasdasad");
      gettoken();
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log("Push notificacion recibida",remoteMessage);
        obtenerNotificaciones(remoteMessage.notification);
        aumentarCantidad();
      });
      return unsubscribe;
    }, []);
    
    const gettoken = async () => {
      var fcmToken = await firebase.messaging().getToken();
      console.log(fcmToken);
      guardarTokenFirebase(fcmToken);
    }
    return(<View></View>)
}

export default ManejarNotificaciones;