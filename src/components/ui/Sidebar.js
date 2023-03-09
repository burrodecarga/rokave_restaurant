import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='md:w-2/5 xl:w-1/5 bg-gray-800 min-h-screen'>
      <div className='p-6'>
        <p className='uppercase text-center text-white tracking-wide font-bold'>
          Aplicación restaurant
        </p>
        <p className='mt-3 text-gray-300 text-center'>Panel de Administración</p>
      <nav>
        <NavLink className="newLink" activeclassname="text-yellow-600"   exact='true' to='/'>Órdenes</NavLink>
        <NavLink className="newLink" activeclassname="text-yellow-600"   exact='true' to='/menu'>Menú</NavLink>
       
      </nav>
      </div>
      
    </div>
  )
}
