import {OBTENER_NOTIFICACIONES,AUMENTAR_CANTIDAD,REINICIAR_CANTIDAD,REINICIAR_CONTENIDO,
    GUARDAR_TOKEN_FIREBASE,GUARDAR_MENSAJES,GUARDAR_CHATROOM,NUEVO_MENSAJE,A_FOREGROUND} from '../types';
export default (state,action) =>{
    switch (action.type){
        case A_FOREGROUND:
            console.log("-----a-----------")
            console.log(state.aforeground);
            console.log(action.payload);
            console.log("-----a-----------")
            var cambio=action.payload;
            if (action.payload===state.aforeground && action.payload===1){
                cambio=0
                console.log("Aca2222")
            }
            else if (action.payload===state.aforeground && action.payload===0){
                cambio=1
                console.log("Aca")
            }
            console.log("-----b-----------")
            console.log(state.aforeground);
            console.log(cambio);
            console.log("-----b-----------")
            return{
                ...state,
                aforeground: cambio
            }
        case NUEVO_MENSAJE:
            console.log(state.nuevomensaje);
            return{
                ...state,
                nuevomensaje: action.payload
            }
        case GUARDAR_CHATROOM:
            console.log(state.chatRoom);
            return{
                ...state,
                chatRoom: action.payload
            }
        case GUARDAR_MENSAJES:
            console.log(state.mensajes);
            return{
                ...state,
                mensajes: action.payload
            }
        case OBTENER_NOTIFICACIONES:
            console.log(state.notificaciones);
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