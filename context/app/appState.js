import appContext from "./appContext";

import React,{useReducer,useContext} from 'react';
import appReducer from './appReducer';
import * as fileService from "../../servicios/fileService";
import tokenAuth from "../../config/tokenAuth";
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
import authContext from "../auth/authContext";

const AppState = ({children}) => {

    const { usuarioActual,obtenerToken } =useContext(authContext);
    
    const initialState = {

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

    const [state,dispatch] = useReducer(appReducer,initialState);

    const limpiarAlerta = () => {

        setTimeout(() => {
            dispatch({
                type:LIMPIAR_ALERTA
            })
        }, 3000);
    }

    const mostrarCargando = () => {

        dispatch({
            type: SUBIR_ARCHIVO
        })
    }

    const mostrarAlerta = msg => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000);
    }

    const subirArchivo = async (formData,nombreArchivo) => {

        mostrarCargando();
        if(usuarioActual) {
            tokenAuth(obtenerToken());
        } else {
            tokenAuth();
        }

        try {
            const {data} = await fileService.subirArchivo(formData);
           dispatch({
               type: SUBIR_ARCHIVO_EXITO,
               payload: {
                   nombre: data.archivo,
                   nombre_original: nombreArchivo
               }
           })
        } catch (error) {

            dispatch({
                type: SUBIR_ARCHIVO_ERROR
            })
            
            mostrarAlerta( error.response.data.msg);
          
        }
    }

    const crearEnlace = async () => {

        if(usuarioActual) {
            tokenAuth(obtenerToken());
        } else {
            tokenAuth();
        }
        
        try {
            const enlace = {
                nombre: state.nombre, //este nombre es el generado por el servidor
                nombre_original: state.nombre_original, // este es el nombre que se le da en el cliente
                descargas: state.descargas, // este valor lo edita el usuario que tenga cuenta
                password: state.password, // este valor lo edita el usuario que tenga cuenta
                autor: state.autor
            }
            
            const response = await fileService.crearEnlace(enlace);

            dispatch({
                type: GENERAR_ENLANCE_EXITO,
                payload:response.data.msg 
            })
        } catch (error) {
            dispatch({
                type: GENERAR_ENLANCE_ERROR
            });

            
            mostrarAlerta( error.response.data.msg);
            
            
        }
    }

    const limpiarState = () => {
        dispatch({
            type: LIMPIAR_ESTADO
        })
    }

    const agregarPassword = password => {

        dispatch({
            type: AGREGAR_PASSWORD,
            payload: password
        })
    }

    const agregarDescargas = numeroDescargas => {

        dispatch({
            type: AGREGAR_NUMERO_DESCARGAS,
            payload: numeroDescargas
        })
    }

    return <appContext.Provider
        value={{
            mensaje_archivo  :state.mensaje_archivo,
            error_archivo:state.error_archivo,
            nombre:state.nombre,
            nombre_original:state.nombre_original,
            loading:state.loading,
            descargas:state.descargas,
            password:state.password,
            autor:state.autor,
            url:state.url,
            mostrarAlerta,
            subirArchivo,
            crearEnlace,
            limpiarState,
            agregarPassword,
            agregarDescargas
        }}
    >
        {children}
    </appContext.Provider>
}

export default AppState;