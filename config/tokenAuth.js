import clienteAxios from "./axios";

const tokenAuth = token => {

    if(token) {
        //si viene un toque pasarle el header para  enviar el token
        clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        //sino, eliminar el header donde se envia el token
        delete clienteAxios.defaults.headers.common['Authorization'];
    }
}

export default tokenAuth;