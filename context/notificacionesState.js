import React, {useReducer, useEffect} from 'react';
import NotificacionesContext from './notificacionesContext';
import NotificacionesReducer from './notificacionesReducer';

import {OBTENER_NOTIFICACIONES,AUMENTAR_CANTIDAD,REINICIAR_CANTIDAD,
    REINICIAR_CONTENIDO,GUARDAR_TOKEN_FIREBASE,GUARDAR_MENSAJES,GUARDAR_CHATROOM,NUEVO_MENSAJE} from '../types';

const NotificacionesState = (props) => {

    const initialState = {
        notificaciones: [],
        cantidad: 0,
        token_firebase: '',
        mensajes: [],
        chatRoom: 0,
        nuevomensaje:0
    }

    const [state,dispatch] = useReducer(NotificacionesReducer,initialState);

    const hayNuevomensaje = (numero) => {
        console.log(state.nuevomensaje);
        dispatch({
            type: NUEVO_MENSAJE,
            payload: numero
        })
    }


    const guardarChatroom = (chatroom) => {
        console.log(chatroom);
        dispatch({
            type: GUARDAR_CHATROOM,
            payload: chatroom
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
                nuevomensaje: state.nuevomensaje
            }}
        >
            {props.children}
        </NotificacionesContext.Provider>
    )
}

export default NotificacionesState;