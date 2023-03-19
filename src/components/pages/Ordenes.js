import React, { useContext, useEffect, useState } from 'react'

import {FirebaseContext} from '../../firebase'
import Orden from '../ui/Orden'

export default function Ordenes() {

  const {firebase} = useContext(FirebaseContext)
  const [ordenes, setOrdenes] = useState([])

  useEffect(()=>{
   const obtenerOrdenes= ()=> {
    firebase.db.collection('ordenes').where('completado','==',false).onSnapshot(handlerSnapshot)
   }
   obtenerOrdenes()

  },[])

  function handlerSnapshot(snapshot) {
   const ordenes = snapshot.docs.map(doc=>{
    return {
      id: doc.id,
      ...doc.data()
        }
   })
   setOrdenes(ordenes);
  }

  let r = (Math.random() + 1).toString(36).substring(7);
  return (
    <>
    <div className="p-10">
    <h1 className="text-3xl font-light mb-4">Ordenes</h1>
    <div className="sm:flex sm:flex-wrap -mx-3 p-6">
    {
      ordenes.map(orden=><Orden orden={orden} key={orden.id}/>)
    }
    </div>
    </div>
   </>
  )
}
