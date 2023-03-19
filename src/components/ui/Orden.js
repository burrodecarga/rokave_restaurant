import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../../firebase'

export default function Orden({ orden }) {

 const {firebase} = useContext(FirebaseContext)
 const [tiempoentrega, setTiempoentrega]= useState(0)

 const defTime = id=>{
 try {
  firebase.db.collection('ordenes').doc(id).update({tiempoDeEntrega:tiempoentrega})
 } catch (error) {
  console.log(error)
 }
 }

 const completarOrden = id=>{
     try {
      firebase.db.collection('ordenes').doc(id).update({completado:true})
     } catch (error) {
      console.log(error)
     }
 }
 
  return (
    <>
    <div className='sm:w-1/2 lg:w-1/3 px-2 mb-4'>
      <div className='p-3 shadow-md bg-white'>
        <h1 className='text-yellow-600 text-lg font-bold'>{orden.id}</h1>
        {
          orden.orden.map(platillo=>(
            <p className='text-gray-600'>
              {platillo.cantidad}{' '}{platillo.nombre}
            </p>
          ))
        }
        <p className="text-gray-700">Total a pagar  <span className='text-gray-800 font-bold'> {orden.totalAPagar} $ </span></p>
      {
        orden.tiempoDeEntrega === 0 && (
          <div className='mb-4'>
           <label className='text-gray-700 block text-sm font-bold mb-2'>
             Tiempo de Entrega:
           </label>
           <div className='flex justify-around'>
            <input
           type="number"
           className='shadow appearance-none border rounded py-2 text-gray-700 text-sm
           leading-tight focus:outline-none focus:shadow-outline
           text-center'
           min="1"
           max="15"
           placeholder='10'
           onChange={e=>setTiempoentrega(parseInt(e.target.value))}
           value={tiempoentrega}
           />
           <button
           onClick={()=>defTime(orden.id)}
           type='submit'
           className='bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-700'
           >ajustar</button>
           </div>
          </div>
        )
      }
      {
        orden.tiempoDeEntrega > 0 && (
          <p className="text-gray-700">Tiempo de Entrega:
          <span className='text-gray-800 font-bold'>{orden.tiempoDeEntrega}</span> Minutos</p>
        )
      }

      {
        (!orden.completado && orden.tiempoDeEntrega > 0) &&(
          <>
          <button
          onClick={()=>completarOrden(orden.id)}
          className='bg-blue-700 text-white hover:bg-blue-500 px-3 py-2 w-full rounde'
          >Marcar Como Completada</button>
          </>
        )
      }
      </div>
    </div>
    </>
  )
}
