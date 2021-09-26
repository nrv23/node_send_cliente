import clienteAxios from "../config/axios";

export const subirArchivo = archivo => clienteAxios.post('/api/archivos/',archivo);

export const crearEnlace = data => (clienteAxios.post('/api/enlaces/',data,{
    headers:{
        'Content-Type': 'application/json'
    }
}));

export const obtenerEnlaces = () => clienteAxios.get('/api/enlaces/');
export const obtenerEnlacePorUrl = url => clienteAxios.get(`/api/enlaces/${url}`);
export const verificarPassword = obj => clienteAxios.post(`/api/enlaces/${obj.url}`,{password: obj.password},{
    headers:{
        'Content-Type': 'application/json'
    }
});