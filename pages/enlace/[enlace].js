import React,{useState} from 'react';
import Layout from "../../components/Layout";
import { 
    obtenerEnlaces,
    obtenerEnlacePorUrl,
    verificarPassword
} from "../../servicios/fileService";


//funciones avanzadas de next
export async function getStaticProps({params:{enlace}}) {//esta funcion va ser la respuesta de el servidor cada vez que un enlace se vaya generando
    //retorna un props que se va llamar al componente
    const resultado = await obtenerEnlacePorUrl(enlace);
   // console.log(resultado);
    return {
        props: {
            enlace: resultado.data
        }
    }  
}

export async function getStaticPaths() { // esta funcion lee dinamicamente los urls estaticas que se van generando
    //esta funcion accede a getStaticProps

    
    try {
        const response = await obtenerEnlaces();
        return { // retorna dos cosas que son obligatorias
            // puede ser una url o un array de urls y un fallback que indica si la url que esta visitando no existe para mostrar una pagina de
            //404

            paths: response.data.enlaces.map(({url}) => ({
                params: {
                    enlace: url
                }
            })),
            fallback: false // esta en falso para que muestre solamente las urls que existan

        }
    } catch (error) {
        console.log(error.response.data)
    }

}

export default ({enlace}) => {

    const [tienePassword,guardarTienePassword] = useState(enlace.password);
    const [password,guardarPassword] = useState('');
    const [archivoDescarga,guardarArchivoDescargar] = useState(enlace.archivo);

    
    const verfificarPassword = async e => {
        
        try {
            e.preventDefault();
            const {data} = await verificarPassword({url: enlace.enlace,password });
            guardarTienePassword(false);
            guardarArchivoDescargar(data.archivo)
        } catch (error) {
            console.log(error.response.data)
        }
    }

   return <Layout>
        {
            tienePassword ? 
                <>
                   
                    <div className="flex justify-center mt-5">
                        
                        <div className="w-full max-w-lg">
                        <p>Este enlace está protegido con una contraseña, colócala acontinuación</p>
                            <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={verfificarPassword}
                            >
                                <div className="mb-4">
                                <label htmlFor="password" className="block text-black text-sm font-bold mb-2">Contraseña</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    placeholder="Contraseña del enlace"
                                    onChange={e => guardarPassword(e.target.value)}
                                />

                            <input 
                                type="submit" 
                                value="Validar contraseña" 
                                className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-4"
                            />
                                
                            </div>
                            </form>
                        </div>
                    </div>
                </>
            :
                <>
                    <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo:</h1>
                    <div className="flex items-center justify-center mt-10">
                        <a 
                            href={`${process.env.backend_url}/api/archivos/${archivoDescarga}`}
                            className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                        >Aquí</a>
                    </div>
                </>
        }
    </Layout>
}