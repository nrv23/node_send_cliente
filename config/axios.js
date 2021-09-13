import axios from 'axios';
//crear un cliente axios para variable de servidor global

const clienteAxios = axios.create({
    baseURL: process.env.backend_url
});

export default clienteAxios;