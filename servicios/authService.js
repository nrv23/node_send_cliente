import clienteAxios from "../config/axios";

export const registrarUsuario = (obj) => {

    return clienteAxios.post('/api/usuarios/',obj,{
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const autenticarUsuario = datos => {
    return clienteAxios.post('/api/auth/',datos,{
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const obtenerUsuarioAutenticado = () => clienteAxios.get('/api/auth/');
