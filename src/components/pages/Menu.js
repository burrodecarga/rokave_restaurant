import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../../firebase'
import Platillo from '../ui/Platillo'

export default function Menu() {
const {firebase} = useContext(FirebaseContext)
const [platillos, setPlatillos] = useState([])

function handleSnapshot(snapshot) {
const getPlatillos = snapshot.docs.map(doc=>{
  return {
    id: doc.id,
    ...doc.data()
  }
})

setPlatillos(getPlatillos)
}

useEffect(()=>{
  const obtenerPlatillos = ()=>{
    const resultado = firebase.db.collection('productos').onSnapshot(handleSnapshot)   
    
  }
  obtenerPlatillos()
},[])

  return (
    <div className="container">
    <h1 className='mb-4 text-3xl font-light'>Menú</h1>
    <Link to={"/nuevo-platillo"}
    className="link2">Crear Platillo</Link>
    {
      platillos.map(platillo=>(<Platillo key={platillo.id} platillo={platillo}/>))
    }  
   
    </div>
  )
}
