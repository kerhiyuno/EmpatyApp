import React, {useReducer} from 'react';
import EstilosContext from './estilosContext';
import EstilosReducer from './estilosReducer';

import {CAMBIAR_COLOR,CAMBIAR_COLOR_PRIMARYINPUT,CAMBIAR_COLOR_PLACEHOLDERINPUT,CAMBIAR_COLOR_TEXTOBOTON,
    CAMBIAR_COLOR_HEADER,CAMBIAR_COLOR_BORDEINPUT,CAMBIAR_COLOR_LETRA,CAMBIAR_COLOR_FONDO,
    CAMBIAR_COLOR_SALIR,CAMBIAR_COLOR_ICONO,CAMBIAR_COLOR_ERROR,CAMBIAR_COLOR_TEXTOHEADER,
    CAMBIAR_COLOR_TITULO,CAMBIAR_COLOR_BOTONDESACTIVADO,CAMBIAR_COLOR_NOTIFICACIONESBORDER} from '../types';
import { color } from 'react-native-reanimated';
import { State } from 'react-native-gesture-handler';

const EstilosState = (props) => {

    const initialState = {
        colorBoton: "#e35d17",
        colorHeader: '#f58b2f',
        colorLetra: 'black',
        colorFondo: 'white',
        colorSalir: '#d15311',
        colorBordeInput: '#357870',
        colorTextoBoton: 'white',
        colorPlaceholderinput:'#3c2c18',
        colorPrimaryinput: '#3c2c18',
        colorNotificacionesBorder: '#828282',
        colorBotonDesactivado: '#5e5e5e',
        colorTitulo:'#141414',
        colorTextoHeader: 'white',
        colorError: '#a12b2b',
        colorIcono: 'white'
    }

    const [state,dispatch] = useReducer(EstilosReducer,initialState);

    const obtenerColorBoton = (color) => {
        console.log(state.colorBoton)
        return state.colorBoton
    }
    const cambiarColorIcono = (color) => {
        dispatch({
            type: CAMBIAR_COLOR_ICONO,
            payload: color
        });
    }
    const cambiarColorError = (color) => {
        dispatch({
            type: CAMBIAR_COLOR_ERROR,
            payload: color
        });
    }
    const cambiarColorTextoHeader = (color) => {
        dispatch({
            type: CAMBIAR_COLOR_TEXTOHEADER,
            payload: color
        });
    }
    const cambiarColorTitulo = (color) => {
        dispatch({
            type: CAMBIAR_COLOR_TITULO,
            payload: color
        });
    }
    const cambiarColorBotonDesactivado = (color) => {
        dispatch({
            type: CAMBIAR_COLOR_BOTONDESACTIVADO,
            payload: color
        });
    }
    const cambiarColorNotificacionesBorder= (color) => {
        dispatch({
            type: CAMBIAR_COLOR_NOTIFICACIONESBORDER,
            payload: color
        });
    }
    const cambiarColorPrimaryinput = (color) => {
        dispatch({
            type: CAMBIAR_COLOR_PRIMARYINPUT,
            payload: color
        });
    }
    const cambiarColorPlaceholderinput = (color) => {
        dispatch({
            type: CAMBIAR_COLOR_PLACEHOLDERINPUT,
            payload: color
        });
    }
    const cambiarColorTextoBoton = (color) => {
        dispatch({
            type: CAMBIAR_COLOR_TEXTOBOTON,
            payload: color
        });
    }
    const cambiarColorBordeInput = (color) => {
        dispatch({
            type: CAMBIAR_COLOR_BORDEINPUT,
            payload: color
        });
    }
    const cambiarColorBoton = (color) => {
        dispatch({
            type: CAMBIAR_COLOR,
            payload: color
        });
    }
    const cambiarColorHeader = (color) => {
        dispatch({
            type: CAMBIAR_COLOR_HEADER,
            payload: color
        });
    }
    const cambiarColorLetra = (color) => {
        dispatch({
            type: CAMBIAR_COLOR_LETRA,
            payload: color
        });
    }
    const cambiarColorFondo = (color) => {
        dispatch({
            type: CAMBIAR_COLOR_FONDO,
            payload: color
        });
    }
    const cambiarColorSalir = (color) => {
        dispatch({
            type: CAMBIAR_COLOR_SALIR,
            payload: color
        });
    }
    return(
        <EstilosContext.Provider
            value={{
                obtenerColorBoton,
                cambiarColorBoton,
                cambiarColorHeader,
                cambiarColorLetra,
                cambiarColorFondo,
                cambiarColorSalir,
                cambiarColorBordeInput,
                cambiarColorTextoBoton,
                cambiarColorPlaceholderinput,
                cambiarColorPrimaryinput,
                cambiarColorIcono,
                cambiarColorError,
                cambiarColorTextoHeader,
                cambiarColorTitulo,
                cambiarColorBotonDesactivado,
                cambiarColorNotificacionesBorder,
                colorb: state.colorBoton,
                colorHeader: state.colorHeader,
                colorLetra: state.colorLetra,
                colorFondo: state.colorFondo,
                colorSalir: state.colorSalir,
                colorBordeInput: state.colorBordeInput,
                colorTextoBoton: state.colorTextoBoton,
                colorPlaceholderinput: state.colorPlaceholderinput,
                colorPrimaryinput: state.colorPrimaryinput,
                colorIcono: state.colorIcono,
                colorError: state.colorError,
                colorTextoHeader: state.colorTextoHeader,
                colorTitulo: state.colorTitulo,
                colorBotonDesactivado: state.colorDesactivado,
                colorNotificacionesBorder: state.colorNotificacionesBorder
            }}
        >
            {props.children}
        </EstilosContext.Provider>
    )
}

export default EstilosState;