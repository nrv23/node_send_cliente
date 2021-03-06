import React,{ useContext,useState } from 'react';
import Layout from '../components/Layout';
import {useFormik} from 'formik';// validacion de formularios
import * as Yup from 'yup';
import authContext from '../context/auth/authContext';
import Alerta from '../components/Alerta';


export default function CrearCuenta() {

    //validacion de formularios con formik y yup
    const {registrarUsuario,mensaje,error} = useContext(authContext)
    const [confirmar, guardarConfirmar] = useState('')
    const formik = useFormik({
        initialValues: { // en este objeto se meten los valores quevan a ser los campos del formularo.
            // formik de una vez va llenar el state
            nombre: '',
            email: '',
            password: '',
            confirm_password: ''
        }, // initialValues es el state que le voy a pasar
        validationSchema: Yup.object({ // aqui se ponen las reglas de validacion,
            // se valida muy parecido a express-validator
            //el submit del form se va ejecutar hasta que todas estas reglas de validacion se cumplan
            nombre: Yup.string()
                .required('El nombre es obligatorio'),
            email: Yup.string()
                .email('El email no es válido')
                .trim()
                .required('El email es obligatorio'),    
            password: Yup.string()
                    .required("El password no debe estar vacío")
                    .trim()
                    .min(6,'El password debe contener al menos 6 caracteres')    
        }),
        onSubmit: (state) => { // el parametros state va ser initialState que guarda los valores del formulario
            console.log("ejecutado")
            if(state.confirm_password !== state.password){
                guardarConfirmar('Las contraseñas no son iguales');
                return;
            } else {
                guardarConfirmar('');
                registrarUsuario(state);
            }
            
        }
    })


  return (
    <Layout>
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32" >
            <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
                Crear Cuenta
            </h2>
            {
              error &&  mensaje && <Alerta tipo='E' />
            }

            {
              !error &&  mensaje && <Alerta tipo='R' />
            }
            <div className="flex justify-center mt-5">
                
                <div className="w-full max-w-lg">
                    
                    <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label htmlFor="nombre" className="block text-black text-sm font-bold mb-2">Nombre</label>
                            <input 
                                type="text" 
                                name="nombre" 
                                id="nombre" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                placeholder="Nombre de usuario"
                                value={formik.values.nombre}
                                onChange={formik.handleChange} // los eventos tambien son manejados por formik y van actualiznado el state 
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.nombre && formik.errors.nombre ? (
                                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.nombre}</p>
                                    </div>
                                ) : null
                            }
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-black text-sm font-bold mb-2">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                placeholder="Email de usuario"
                                value={formik.values.email}
                                onChange={formik.handleChange} // los eventos tambien son manejados por formik y van actualiznado el state 
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.email && formik.errors.email ? (
                                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.email}</p>
                                    </div>
                                ) : null
                            }
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-black text-sm font-bold mb-2">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                placeholder="Password de usuario"
                                value={formik.values.password}
                                onChange={formik.handleChange} // los eventos tambien son manejados por formik y van actualiznado el state 
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.password && formik.errors.password ? (
                                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.password}</p>
                                    </div>
                                ) : null
                            }
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirm_password" className="block text-black text-sm font-bold mb-2">Confirmar password</label>
                            <input 
                                type="password" 
                                name="confirm_password" 
                                id="confirm_password" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                placeholder="Confirmar password"
                                value={formik.values.confirm_password}
                                onChange={formik.handleChange} // los eventos tambien son manejados por formik y van actualiznado el state 
                                onBlur={formik.handleBlur}
                            />
                            {
                                confirmar !== '' ? <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>Las contraseñas no coinciden</p>
                            </div> : null
                            }
                        </div>
                        <input 
                            type="submit" 
                            value="Registrar" 
                            className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                        />
                    </form>
                </div>
            </div>
        </div>
    </Layout>
  )
}
