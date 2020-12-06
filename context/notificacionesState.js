import React, {useReducer} from 'react';
import NotificacionesContext from './notificacionesContext';
import NotificacionesReducer from './notificacionesReducer';

import {OBTENER_NOTIFICACIONES,AUMENTAR_CANTIDAD,REINICIAR_CANTIDAD,REINICIAR_CONTENIDO,
    GUARDAR_TOKEN_FIREBASE,GUARDAR_MENSAJES,GUARDAR_CHATROOM,NUEVO_MENSAJE,A_FOREGROUND,
    GUARDAR_TIENESICOLOGO,GUARDAR_TIENEGRUPO,GUARDAR_NUEVOSICOLOGO,GUARDAR_DESVINCULADO,
    GUARDAR_PRIMERACARGA} from '../types';

const NotificacionesState = (props) => {

    const initialState = {
        notificaciones: [],
        cantidad: 0,
        token_firebase: '',
        mensajes: [],
        chatRoom: 0,
        nuevomensaje:0,
        aforeground: 0,
        tienesicologo: false,
        tienegrupo: false,
        nuevosicologo: false,
        desvinculado: false,
        primeracarga: true
    }

    const [state,dispatch] = useReducer(NotificacionesReducer,initialState);


    const cambioaForeground = (numero) => {
        dispatch({
            type: A_FOREGROUND,
            payload: numero
        })
    }

    const hayNuevomensaje = (numero) => {
        console.log(state.nuevomensaje);
        dispatch({
            type: NUEVO_MENSAJE,
            payload: numero
        })
    }
    const guardarNuevosicologo = (nuevosicologo) => {
        console.log(nuevosicologo);
        dispatch({
            type: GUARDAR_NUEVOSICOLOGO,
            payload: nuevosicologo
        })
    }
    const guardarPrimeracarga = (primeracarga) => {
        console.log(primeracarga);
        dispatch({
            type: GUARDAR_PRIMERACARGA,
            payload: primeracarga
        })
    }
    const guardarDesvinculado = (desvinculado) => {
        console.log(desvinculado);
        dispatch({
            type: GUARDAR_DESVINCULADO,
            payload: desvinculado
        })
    }
    const guardarChatroom = (chatroom) => {
        console.log(chatroom);
        dispatch({
            type: GUARDAR_CHATROOM,
            payload: chatroom
        })
    }
    const guardarTienesicologo = (tienesicologo) => {
        console.log(tienesicologo);
        dispatch({
            type: GUARDAR_TIENESICOLOGO,
            payload: tienesicologo
        })
    }
    const guardarTienegrupo = (tienegrupo) => {
        console.log(tienegrupo);
        dispatch({
            type: GUARDAR_TIENEGRUPO,
            payload: tienegrupo
        })
    }
    const obtenerChatroom = () => {
        console.log(state.chatRoom);
        return state.chatRoom
    }

    const obtenerNotificaciones = (nuevo) => {
        console.log(nuevo);
        dispatch({
            type: OBTENER_NOTIFICACIONES,
            payload: nuevo
        });

    }
    const obtenerTokenFirebase = () => {
        console.log(state.token_firebase);
        return state.token_firebase
    }

    const obtenerCantidad = () => {
        console.log(state.notificaciones)
        return state.notificaciones
    }

    const aumentarCantidad = () => {
        dispatch({
            type: AUMENTAR_CANTIDAD,
        });
    }
    const reiniciarCantidad = () => {
        dispatch({
            type: REINICIAR_CANTIDAD,
        });
    }
    const reiniciarContenido = () => {
        dispatch({
            type: REINICIAR_CONTENIDO
        });
    }
    const guardarTokenFirebase = (token) => {
        dispatch({
            type: GUARDAR_TOKEN_FIREBASE,
            payload: token
        })
    }
    const guardarMensajes = (mensajes) => {
        dispatch({
            type: GUARDAR_MENSAJES,
            payload: mensajes
        })
    }

    return(
        <NotificacionesContext.Provider
            value={{
                notificaciones: state.notificaciones,
                cantidad: state.cantidad,
                obtenerCantidad,
                obtenerNotificaciones,
                aumentarCantidad,
                reiniciarCantidad,
                reiniciarContenido,
                guardarTokenFirebase,
                obtenerTokenFirebase,
                guardarMensajes,
                guardarChatroom,
                obtenerChatroom,
                hayNuevomensaje,
                cambioaForeground,
                guardarTienesicologo,
                guardarTienegrupo,
                guardarNuevosicologo,
                guardarDesvinculado,
                guardarPrimeracarga,
                primeracarga: state.primeracarga,
                nuevomensaje: state.nuevomensaje,
                aforeground: state.aforeground,
                tienesicologo: state.tienesicologo,
                tienegrupo: state.tienegrupo,
                nuevosicologo: state.nuevosicologo,
                desvinculado: state.desvinculado
            }}
        >
            {props.children}
        </NotificacionesContext.Provider>
    )
}

export default NotificacionesState;