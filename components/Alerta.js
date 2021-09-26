import React,{ useContext } from 'react';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
appContext

const Alerta = ({tipo}) => {

    const {mensaje} = useContext(authContext);
    const {mensaje_archivo} = useContext(appContext);
    
    return ( 
        <div className={`${tipo==='E'?'bg-red-500':'bg-green-400'} py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto`}>
            {mensaje || mensaje_archivo}
        </div>
      );
}
 
export default Alerta;