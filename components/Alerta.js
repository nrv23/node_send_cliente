import React,{ useContext } from 'react';
import authContext from '../context/authContext';

const Alerta = ({tipo}) => {

    const {mensaje} = useContext(authContext);
    
    return ( 
        <div className={`${tipo==='E'?'bg-red-500':'bg-green-400'} py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto`}>
            {mensaje}
        </div>
      );
}
 
export default Alerta;