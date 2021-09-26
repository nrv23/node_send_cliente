import {useDropzone} from 'react-dropzone';
import React, {useCallback,useContext} from 'react';
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';
import Spinner from './Spinner';
import Formulario from './Formulario';



//useCallaback se utilizar para reutilizar una funcion de manera que no ejecute muchas veces afectando el rendimiento de la aplicacion
// basicamente seria como reutilizar la misma instancia de la funcion
const Dropzone = () => {

    const {mostrarAlerta,subirArchivo,crearEnlace,loading} =useContext(appContext);

    const { autenticado,usuarioActual} =useContext(authContext);

    const onDropAccepted = useCallback(async (acceptedFiles) => { // esta funcion detecta cuando se  suelta un archivo
        console.log(acceptedFiles) // el callback acceptedFiles es la instancia del archivo que se subió
    
        const formData = new FormData();
        formData.append('archivo',acceptedFiles[0]);
        subirArchivo(formData,acceptedFiles[0].path);
    },[]); // el useCallback tambien toma dependencias como el effect 


    const onDropRejected = () => {
        mostrarAlerta("Regístrate para poder subir archivos mayores a un 1 MB.");
    }
    //extraer el contenido del hook useDropzone

    const { getInputProps,getRootProps,isDragActive,acceptedFiles } =useDropzone({onDropAccepted,onDropRejected,maxSize: 1000000});
    //isDragActive bandera para saber si el evento de arrastrar archivos esta activo

    const archivos = acceptedFiles.map(archivo => {
        
        const megas = Number(archivo.size) / Math.pow(1024,2);
        
        return <li key={archivo.lastModified} className="bg-white flex-1 mb-4 shadow-lg rounded"> 
                <p className="font-bold text-xl">{archivo.path}</p>
                <p className="text-sm text-gray-500">{megas.toFixed(2) /* convertir a megas*/ }</p>
            </li>
    })

    return ( 

        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4"> 

        {
            acceptedFiles.length > 0 ? 
                <div className="mt-10 w-full">
                    <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
                    <ul>
                        {archivos}
                    </ul>
                    {
                        autenticado && <Formulario />
                    }
                    {
                        loading ?  
                            <p className="my-10 text-center text-gray">Subiendo Archivo....</p>
                        :
                        <button className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800" 
                            type="button"
                            onClick={() => crearEnlace()}
                            >
                        Crear Enlace
                        </button>
                    }
                </div>
            :

            <div {...getRootProps({className: 'dropzone w-full py-32'})}>
               {/*la clase dropzone es obligado pasarsela*/} 
               <input className="h-100" {...getInputProps()} />
               
                {
                    isDragActive ? 
                        <p className="text-2xl text-center text-gray-600">Suelta el archivo</p>
                    :
                    <div className="text-center">
                    <p className="text-2xl text-center text-gray-600">
                        Selecciona y arrastra un archivo
                    </p>
                    <button className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800" type="button">
                        Seleccione archivos para subir
                    </button>
                </div>
                }
                   
            </div>
        }
            
        </div>
     );
}
 
export default Dropzone;