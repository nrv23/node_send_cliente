import { 
    USUARIO_AUTENTICADO ,
    REGISTRAR_USUARIO_EXITO,
    REGISTRAR_USUARIO_ERROR,
    LIMPIAR_ALERTA,
    LOGIN_ERROR,
    LOGIN_EXITO,
    OBTENER_USUARIO_ERROR,
    OBTENER_USUARIO_EXITO,
    CERRAR_SESION
} from "../types";



export default (state,action) => {

    switch(action.type) {

        case USUARIO_AUTENTICADO:
            return {

            }
        case REGISTRAR_USUARIO_EXITO:
            return {
                ...state,
                mensaje: action.payload
            }
        case REGISTRAR_USUARIO_ERROR:
            return {
                ...state,
                mensaje: action.payload,
                error: true
            }
        case LIMPIAR_ALERTA: 
            return {
                ...state,
                mensaje: null
            }
        case LOGIN_EXITO:
            return {
                ...state,
                token: action.payload,
                autenticado:true,
                error:false
            }
        case LOGIN_ERROR: 
            return {
                ...state,
                autenticado: false,
                error: true,
                mensaje: action.payload
            }
        case OBTENER_USUARIO_EXITO:
            return {
                ...state,
                usuarioActual: action.payload
            }
        case OBTENER_USUARIO_ERROR:
            return {
                ...state,
                error: true,
                mensaje: action.payload
            }
        case CERRAR_SESION:
            return {
                token: '',
                autenticado: null,
                usuarioActual: null,
                mensaje: null,
                error: false
            }
        default:
            return state;
    }
}