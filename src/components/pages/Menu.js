import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../../firebase'

export default function Menu() {
const {firebase} = useContext(FirebaseContext)

  return (
    <div className="container">
    <h1 className='mb-4 text-3xl font-light'>Menú</h1>
    <Link to={"/nuevo-platillo"}
    className="link2">Crear Platillo</Link>    
    </div>
  )
}
