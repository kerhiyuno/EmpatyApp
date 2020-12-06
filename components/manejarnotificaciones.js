import React,{useEffect, useContext,useState,useRef} from 'react';
import {View,Alert,AppState} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import NotificacionesContext from '../context/notificacionesContext'
import { GUARDAR_CHATROOM } from '../types';

const ManejarNotificaciones = () => {

    const { aumentarCantidad,obtenerNotificaciones, guardarTokenFirebase,
      hayNuevomensaje,cambioaForeground,guardarTienesicologo,
      guardarTienegrupo,guardarNuevosicologo,guardarDesvinculado} = useContext(NotificacionesContext);

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
        cambioaForeground(0);
      }
      appState.current = nextAppState;
      guardarAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    };
  
  
    useEffect( () => {
      gettoken();
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log("Push notificacion recibida",remoteMessage);
        console.log(remoteMessage.notification.title);
        if(remoteMessage.notification.title == "Mensaje Nuevo"){
          hayNuevomensaje(1);
          hayNuevomensaje(0);
        }
        else if(remoteMessage.notification.title == "Psicólogo se conectó contigo"){
          guardarNuevosicologo(true);
          guardarTienesicologo(true);
        }
        else if(remoteMessage.notification.title == "Solicitud de Desvinculación Aceptada"){
          guardarDesvinculado(true);
          guardarTienesicologo(false);
        }
        else if(remoteMessage.notification.title == "Cambio de Grupo"){
          guardarTienegrupo(true);
        }
        else if(remoteMessage.notification.title == "Removido del Grupo"){
          guardarTienegrupo(false);
        }
        else if(remoteMessage.notification.title == "Grupo Disuelto"){
          guardarTienegrupo(false);
        }
        obtenerNotificaciones(remoteMessage.notification);
        aumentarCantidad(remoteMessage.notification);
      });
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
        if(remoteMessage.notification.title == "Mensaje Nuevo"){
          hayNuevomensaje(1);
          hayNuevomensaje(0);
        }
        else if(remoteMessage.notification.title == "Psicólogo se conectó contigo"){
          guardarNuevosicologo(true);
          guardarTienesicologo(true);
        }
        else if(remoteMessage.notification.title == "Solicitud de Desvinculación Aceptada"){
          guardarDesvinculado(true);
          guardarTienesicologo(false);
        }
        else if(remoteMessage.notification.title == "Cambio de Grupo"){
          guardarTienegrupo(true);
        }
        else if(remoteMessage.notification.title == "Removido del Grupo"){
          guardarTienegrupo(false);
        }
        else if(remoteMessage.notification.title == "Grupo Disuelto"){
          guardarTienegrupo(false);
        }
        obtenerNotificaciones(remoteMessage.notification);
        aumentarCantidad(remoteMessage.notification);
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