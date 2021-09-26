import React,{useContext,useEffect} from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import { useRouter } from 'next/router';

const Header = () => {
    
    const router = useRouter();

    const { usuarioAutenticado,usuarioActual,cerrarSesion } =useContext(authContext);

    const {limpiarState} =useContext(appContext);

    useEffect(() => {
        usuarioAutenticado();
    },[]);


    const irAPaginaPrincipal = () => {
        router.push('/');
        limpiarState();
    }

    return ( 

        <header className="py-8 flex-col md:flex-row items-center justify-between">
           
            <img 
                src="/logo.svg" 
                alt="" 
                className="w-64 mb-8 md:mb-0 cursor-pointer"
                onClick={irAPaginaPrincipal}
            />        
        

            <div className="mt-5">
                {
                    usuarioActual ? 
                        <div className="flex text-center">
                            <p className="mr-2">Hola {usuarioActual.usuario}</p>
                            <button
                                type="button"
                                className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                                onClick= {cerrarSesion}
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    :(
                        <>
                            <Link href="/login" >
                                <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Iniciar Sesión</a>
                                
                            </Link>
                            <Link href="/crear-cuenta" >
                                <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Crear Cuenta</a>
                                
                            </Link>
                        </>
                    )
                }
                
            </div>
        </header>
     );
}
 
export default Header;