import {

    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    GENERAR_ENLANCE_EXITO,
    GENERAR_ENLANCE_ERROR,
    MOSTRAR_ALERTA,
    LIMPIAR_ALERTA,
    SUBIR_ARCHIVO,
    LIMPIAR_ESTADO,
    AGREGAR_PASSWORD,
    AGREGAR_NUMERO_DESCARGAS

} from '../../types';

export default(state,action) => {

    switch(action.type) {

        case SUBIR_ARCHIVO_EXITO:
            return {
                ...state,
                nombre: action.payload.nombre,
                nombre_original: action.payload.nombre_original,
                error_archivo: null,
                loading: false
            }
        case SUBIR_ARCHIVO_ERROR:
            return {
                ...state,
                error_archivo: true,
                loading: false
            }
        case GENERAR_ENLANCE_EXITO:
            return {
                ...state,
                url: action.payload,
                error_archivo: null
            }
        case GENERAR_ENLANCE_ERROR:
            return {
                ...state,
                error_archivo: true
            }
        case MOSTRAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: action.payload
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: null
            }
        case SUBIR_ARCHIVO:
            return {
                ...state,
                loading: true
            }
        case AGREGAR_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case AGREGAR_NUMERO_DESCARGAS:
            return {
                ...state,
                descargas: action.payload
            } 
        case LIMPIAR_ESTADO:
            return {
                ...state,
                mensaje_archivo: null,
                error_archivo: null,
                nombre: '', //este nombre es el generado por el servidor
                nombre_original: '', // este es el nombre que se le da en el cliente
                loading: null,
                descargas: 1, // este valor lo edita el usuario que tenga cuenta
                password: null, // este valor lo edita el usuario que tenga cuenta
                autor: null, // este valor lo edita el usuario que tenga cuenta
                url: null // este valor ser autogenerado
            }
        default:
            return state;
    }
}