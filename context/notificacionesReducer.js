import {OBTENER_NOTIFICACIONES,AUMENTAR_CANTIDAD,REINICIAR_CANTIDAD} from '../types';
export default (state,action) =>{
    switch (action.type){
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
            
        default:
            return state;
    }
}