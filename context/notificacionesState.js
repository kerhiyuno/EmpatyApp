import React, {useReducer, useEffect} from 'react';
import NotificacionesContext from './notificacionesContext';
import NotificacionesReducer from './notificacionesReducer';

import {OBTENER_NOTIFICACIONES,AUMENTAR_CANTIDAD,REINICIAR_CANTIDAD} from '../types';

const NotificacionesState = (props) => {

    const initialState = {
        notificaciones: [],
        cantidad: 0
    }

    const [state,dispatch] = useReducer(NotificacionesReducer,initialState);

    const obtenerNotificaciones = (nuevo) => {
        console.log(nuevo);
        dispatch({
            type: OBTENER_NOTIFICACIONES,
            payload: nuevo
        });

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

    return(
        <NotificacionesContext.Provider
            value={{
                notificaciones: state.notificaciones,
                cantidad: state.cantidad,
                obtenerCantidad,
                obtenerNotificaciones,
                aumentarCantidad,
                reiniciarCantidad
            }}
        >
            {props.children}
        </NotificacionesContext.Provider>
    )
}

export default NotificacionesState;