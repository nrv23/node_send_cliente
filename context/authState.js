import authContext from "./authContext";
import react,{ useReducer } from "react"; 
import authReducer from "./authReducer";
import { 
        USUARIO_AUTENTICADO,
        REGISTRAR_USUARIO_ERROR,
        REGISTRAR_USUARIO_EXITO,
        LIMPIAR_ALERTA,
        LOGIN_EXITO,
        LOGIN_ERROR,
        OBTENER_USUARIO_EXITO,
        OBTENER_USUARIO_ERROR,
        CERRAR_SESION 
} from "../types";
import * as authService from "../servicios/authService";
import tokenAuth from "../config/tokenAuth";


const AuthState = ({children}) => {

 const initialSTate = {
    token: '',
    autenticado: null,
    usuarioActual: null,
    mensaje: null,
    error: false
 }


 const [state, dispatch] = useReducer(authReducer,initialSTate); // la funcion useReducer toma como primer parametro el reducer donde
 // se va actualizar el state y el stateInitial.
 //devolviendo el state actualizado dependiendo del case que se ejecutó.
 // el dispacth se usa para enviar un cambio al reducer y devolver el state actualizado

//retorna el provider del context

    const obtenerToken = () => localStorage.getItem("token");

    const limpiarAlerta = () => {

        setTimeout(() => {
            dispatch({
                type:LIMPIAR_ALERTA
            })
        }, 3000);
    }

    const registrarUsuario = async obj => {

        try {
            
            const {data} = await authService.registrarUsuario(obj);
            dispatch({
                type: REGISTRAR_USUARIO_EXITO,
                payload: data.msg
            });

            limpiarAlerta();
            
        } catch (error) {
            //el response de los errores se lee con error.response
            dispatch({
                type: REGISTRAR_USUARIO_ERROR,
                payload: error.response.data.msg
            });
            limpiarAlerta();
        }
    }

    const iniciarSesion = async datos => {

        try {
            const {data:{token}} = await authService.autenticarUsuario(datos);
            localStorage.setItem("token",token);
            dispatch({
                type: LOGIN_EXITO,
                payload: token
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });
            limpiarAlerta();
        }
    }

    const usuarioAutenticado = async () => {

        try {

            if(obtenerToken()) {
                tokenAuth(obtenerToken())
            }

            const {data:{usuario}} = await authService.obtenerUsuarioAutenticado();
            dispatch({
                type: OBTENER_USUARIO_EXITO,
                payload: usuario
            })
        } catch(error) {
            console.log(error)

            dispatch({
                type: OBTENER_USUARIO_ERROR,
                payload: 'Ocurrió un error al obtener el usuario'
            });
            limpiarAlerta();
        }
    }

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        dispatch({
            type: CERRAR_SESION
        })
    }

    return(

        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuarioActual: state.usuarioActual,
                mensaje: state.mensaje,
                error: state.error,
                usuarioActual: state.usuarioActual,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >

            {children}
        </authContext.Provider>
    )
}

export default AuthState;