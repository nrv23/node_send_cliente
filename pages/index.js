import React, {useContext,useEffect} from 'react';
import Layout from '../components/Layout';
import authContext from '../context/authContext';
import Alerta from '../components/Alerta';

export default function Index() {
  
  const {
    usuarioAutenticado,
    mensaje,
    error
  } = useContext(authContext);


  useEffect(() => {
 
    usuarioAutenticado();
  },[])

  return (
    <Layout>
      <h1>Index</h1>
    </Layout>
  )
}
