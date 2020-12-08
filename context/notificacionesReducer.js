import {OBTENER_NOTIFICACIONES,AUMENTAR_CANTIDAD,REINICIAR_CANTIDAD,REINICIAR_CONTENIDO,
    GUARDAR_TOKEN_FIREBASE,GUARDAR_MENSAJES,GUARDAR_CHATROOM,NUEVO_MENSAJE,A_FOREGROUND,
    GUARDAR_TIENESICOLOGO,GUARDAR_TIENEGRUPO,GUARDAR_NUEVOSICOLOGO,GUARDAR_DESVINCULADO,
    GUARDAR_PRIMERACARGA,GUARDAR_CAMBIOPAGO,GUARDAR_REUNIONES,GUARDAR_ACTUALIZARAGENDA} from '../types';
export default (state,action) =>{
    switch (action.type){
        case A_FOREGROUND:
            var cambio=action.payload;
            if (action.payload===state.aforeground && action.payload===1){
                cambio=0
            }
            else if (action.payload===state.aforeground && action.payload===0){
                cambio=1
            }
            return{
                ...state,
                aforeground: cambio
            }
        case GUARDAR_ACTUALIZARAGENDA:
            return{
                ...state,
                actualizaragenda: action.payload
            }
        case GUARDAR_REUNIONES:
            return{
                ...state,
                reuniones: action.payload
            }
        case GUARDAR_CAMBIOPAGO:
            console.log(action.payload)
            return{
                ...state,
                cambiopago: action.payload
            }
        case GUARDAR_PRIMERACARGA:
            return{
                ...state,
                primeracarga: action.payload
            }
        case GUARDAR_DESVINCULADO:
            return{
                ...state,
                desvinculado: action.payload
            }
        case GUARDAR_NUEVOSICOLOGO:
            return{
                ...state,
                nuevosicologo: action.payload
            }
        case GUARDAR_TIENESICOLOGO:
            return{
                ...state,
                tienesicologo: action.payload
            }
        case GUARDAR_TIENEGRUPO:
            return{
                ...state,
                tienegrupo: action.payload
            }
        case NUEVO_MENSAJE:
            return{
                ...state,
                nuevomensaje: action.payload
            }
        case GUARDAR_CHATROOM:
            return{
                ...state,
                chatRoom: action.payload
            }
        case GUARDAR_MENSAJES:
            return{
                ...state,
                mensajes: action.payload
            }
        case OBTENER_NOTIFICACIONES:
            return{
                ...state,
                notificaciones: [action.payload,...state.notificaciones]
            }
        case AUMENTAR_CANTIDAD:
            return{
                ...state,
                cantidad: state.cantidad+1
            }
        case REINICIAR_CANTIDAD:
            return{
                ...state,
                cantidad: 0
            }
        case REINICIAR_CONTENIDO:
            return{
                ...state,
                notificaciones: [],
                cantidad:0
            }
        case GUARDAR_TOKEN_FIREBASE:
            return{
                ...state,
                token_firebase: action.payload
            }
        default:
            return state;
    }
}