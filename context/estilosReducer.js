import {CAMBIAR_COLOR,CAMBIAR_COLOR_PRIMARYINPUT,CAMBIAR_COLOR_PLACEHOLDERINPUT,CAMBIAR_COLOR_TEXTOBOTON,
    CAMBIAR_COLOR_BORDEINPUT,CAMBIAR_COLOR_HEADER,CAMBIAR_COLOR_LETRA,CAMBIAR_COLOR_FONDO,
    CAMBIAR_COLOR_SALIR,CAMBIAR_COLOR_ICONO,CAMBIAR_COLOR_ERROR,CAMBIAR_COLOR_TEXTOHEADER,
    CAMBIAR_COLOR_TITULO,CAMBIAR_COLOR_BOTONDESACTIVADO,CAMBIAR_COLOR_NOTIFICACIONESBORDER,
    CAMBIAR_COLOR_RADIO,CAMBIAR_COLOR_ICONO_LIBRE,CAMBIAR_FONDO_INPUT,CAMBIAR_TEXTO_INPUT} from '../types';
export default (state,action) =>{
    switch (action.type){
        case CAMBIAR_TEXTO_INPUT:{
            return{
                ...state,
                colorTextoInput: action.payload
            }
        }
        case CAMBIAR_FONDO_INPUT:{
            return{
                ...state,
                colorFondoInput: action.payload
            }
        }
        case CAMBIAR_COLOR_ICONO_LIBRE:{
            return{
                ...state,
                colorIconoLibre: action.payload
            }
        }
        case CAMBIAR_COLOR_RADIO:{
            return{
                ...state,
                colorRadio: action.payload
            }
        }
        case CAMBIAR_COLOR_ICONO:{
            return{
                ...state,
                colorIcono: action.payload
            }
        }
        case CAMBIAR_COLOR_ERROR:{
            return{
                ...state,
                colorError: action.payload
            }
        }
        case CAMBIAR_COLOR_TEXTOHEADER:{
            return{
                ...state,
                colorTextoHeader: action.payload
            }
        }
        case CAMBIAR_COLOR_TITULO:{
            return{
                ...state,
                colorTitulo: action.payload
            }
        }
        case CAMBIAR_COLOR_BOTONDESACTIVADO:{
            return{
                ...state,
                colorBotonDesactivado: action.payload
            }
        }
        case CAMBIAR_COLOR_NOTIFICACIONESBORDER:{
            return{
                ...state,
                colorNotificacionesBorder: action.payload
            }
        }
        case CAMBIAR_COLOR_PRIMARYINPUT:{
            return{
                ...state,
                colorPrimaryinput: action.payload
            }
        }
        case CAMBIAR_COLOR_PLACEHOLDERINPUT:
            return{
                ...state,
                colorPlaceholderinput: action.payload
            }
        case CAMBIAR_COLOR_TEXTOBOTON:
            return{
                ...state,
                colorTextoBoton: action.payload
            }
        case CAMBIAR_COLOR_BORDEINPUT:
            return{
                ...state,
                colorBordeInput: action.payload
            }
        case CAMBIAR_COLOR:
            return{
                ...state,
                colorBoton: action.payload,
            }
        case CAMBIAR_COLOR_HEADER:
            return{
                ...state,
                colorHeader: action.payload,
            }
        case CAMBIAR_COLOR_LETRA:
            return{
                ...state,
                colorLetra: action.payload,
            }
        case CAMBIAR_COLOR_FONDO:
            return{
                ...state,
                colorFondo: action.payload,
            }
        case CAMBIAR_COLOR_SALIR:
            return{
                ...state,
                colorSalir: action.payload,
            }
        default:
            return state;
    }
}