import React, { useContext, useRef } from 'react'
import FirebaseContext from '../../firebase/context'

export default function Platillo({ platillo }) {
  const { firebase } = useContext(FirebaseContext)

  const existenciaRef = useRef(platillo.existencia)

  const { id, nombre, imagen, existencia, categoria, precio, descripcion } =
    platillo

  const actualizarExistencia = () => {
    const existencia = (existenciaRef.current.value === 'true')
    console.log(existencia)
    try {
      firebase.db.collection('productos').doc(id).update({
        existencia: existencia
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-full px-3 my-4'>
      <div className='p-5 shadow-md bg-white'>
        <div className='lg:flex'>
          <div className='lg:w-5/12 xl:w-3/12'>
            {imagen && <img src={imagen} alt={nombre} />}
            <div className='sm:flex w-full'>
              <label className='block mt-4 w-full'>
                <span className='block text-gray-700'>Condición:</span>
                <select
                  value={existencia}
                  ref={existenciaRef}
                  onChange={() => actualizarExistencia()}
                  className='appearance-none shadow w-full p-2 border rounded'
                >
                  <option value='true'>disponible</option>
                  <option value='false'>no disponible</option>
                </select>
              </label>
            </div>
          </div>
          <div className='lg:w-7/12 xl:w-9/12 pl-5'>
            <p className='font-bold text-2xl text-yellow-600 mb-4'>{nombre}</p>
            <p className='text-grey-600 mb-4 capitalize'>
              categoria:{' '}
              <span className='text-grey-600 font-bold'>
                {categoria.toUpperCase()}
              </span>
            </p>
            <p className='text-grey-600 mb-4 capitalize'>
              descripción:{' '}
              <span className='text-grey-600 font-bold'>{descripcion}</span>{' '}
            </p>
            <p className='text-grey-600 mb-4 capitalize'>
              precio:{' '}
              <span className='text-grey-600 font-bold'>{precio} $</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
