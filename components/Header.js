import React,{useContext,useEffect} from 'react';
import Link from 'next/link';
import authContext from '../context/authContext';

const Header = () => {

    const { usuarioAutenticado,usuarioActual,cerrarSesion } =useContext(authContext);

    useEffect(() => {
        usuarioAutenticado();
    },[])

    return ( 

        <header className="py-8 flex-col md:flex-row items-center justify-between">
            <Link href="/">
                <img src="logo.svg"  alt="" className="w-64 mb-8 md:mb-0 "/>        
            </Link>

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