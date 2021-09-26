import React,{useState,useContext,createRef} from 'react';
import appContext from '../context/app/appContext';

const Formulario = () => {

    const { agregarPassword,agregarDescargas }= useContext(appContext)

    const [tienePassword,guardarTienePassword] =useState(false);


    return ( 

        <div className="w-full mt-20">
            <div>
                <label className="text-lg text-gray-800">Eliminar tras:</label>
                <select name="" id="" className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                    name="numeroDescargas"
                    onChange={e => agregarDescargas(parseInt(e.target.value === '' || !e.target.value ? 1:e.target.value))} 
                >
                    <option value="" disabled>-- Seleccione--</option>
                    <option value="1" >1</option>
                    <option value="5" >5</option>
                    <option value="10" >10</option>
                    <option value="20" >20</option>

                </select>
            </div>
            <div className="mt-4">
                <div className="flex justify-between items-center">
                    <label className="text-lg text-gray-800 mr-2">Proteger con contraseña:</label>
                    <input 
                        type="checkbox" name="tienePassword" 
                        onChange={() => guardarTienePassword(!tienePassword)} 
                    />
                </div>
                {
                    tienePassword ?
                    <input 
                        type="password" 
                        className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                        name="" 
                        id="" 
                        onChange={e => agregarPassword(e.target.value)}
                    />: null
                }
            </div>
        </div>
     );
}
 
export default Formulario;