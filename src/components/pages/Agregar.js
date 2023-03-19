import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup'
import { FirebaseContext } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import FileUploader from 'react-firebase-file-uploader'

export default function Agregar() {
  const [loading, setLoading] = useState(false)
  const [progreso, setProgreso] = useState(0)
  const [urlImagen, setUrlImagen] = useState('')

  const navigate = useNavigate()
  //contex de operaciones firebase
  const { firebase } = useContext(FirebaseContext)
  ///console.log(firebase);

  const formik = useFormik({
    initialValues: {
      nombre: '',
      precio: '',
      categoria: '',
      imagen: '',
      descripcion: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre es obligatorio'),
      precio: Yup.number('se debe colocar un número').required(
        'el precio es obligatorio',
      ),
      categoria: Yup.string().required('la categoría es obligatoria'),
      descripcion: Yup.string()
        .required()
        .min(4, 'al menos 4 caracteres son requeridos'),
    }),

    onSubmit: (platillo) => {
      try {
        platillo.existencia = true
        platillo.imagen = urlImagen
        firebase.db.collection('productos').add(platillo)
        navigate('/menu')
      } catch (error) {
        console.log(error)
      }
    },
  })

  const handleUploadStart = () => {
    setLoading(true)
    setProgreso(0)
  }

  const handleUploadError = error => {
    setLoading(false)
    console.log(error.message)
  }

  const handleUploadSuccess = async nombre => {
    setProgreso(100)
    setLoading(false)

    const url = await firebase
      .storage
      .ref('productos')
      .child(nombre)
      .getDownloadURL()

    console.log(url)

    setUrlImagen(url)    
  }

  const handleProgress = progreso => {
    setProgreso(progreso)
    console.log(progreso);
  }

  return (
    <div className='container'>
      <h1 className='titulo1'>Agregar nuevo plato</h1>
      <div className='flex justify-center mt-10'>
        <div className='w-full max-w-2xl bg-slate-50'>
          <form onSubmit={formik.handleSubmit} className='p-6 rounded' method='POST'>
            <div className='mb-4'>
              <label
                htmlFor='nombre'
                className='block text-gray-700 text-sm font-bold mb-2 capitalize'
              >
                nombre
              </label>
              <input
                type='text'
                placeholder='Ingrese nombre del plato'
                className='myInput'
                id='nombre'
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.nombre && formik.errors.nombre ? (
              <div className='error' role='alert'>
                <p>{formik.errors.nombre}</p>
              </div>
            ) : null}

            <div className='mb-4'>
              <label htmlFor='precio' className='label'>
                precio
              </label>
              <input
                type='number'
                placeholder='Ingrese precio del plato'
                className='myInput'
                id='precio'
                name='precio'
                min='0'
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.precio && formik.errors.precio ? (
              <div className='error' role='alert'>
                <p>{formik.errors.precio}</p>
              </div>
            ) : null}

            <div className='mb-4'>
              <label
                htmlFor='categoria'
                className='w-full block text-gray-700 text-sm font-bold mb-2 capitalize'
              >
                categoria
              </label>
              <select
                id='categoria'
                name='categoria'
                className='myInput'
                value={formik.values.categoria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value='' className='capitalize'>
                  seleccione
                </option>
                <option value='desayuno' className='capitalize'>
                  desayuno
                </option>
                <option value='almuerzo' className='capitalize'>
                  almuerzo
                </option>
                <option value='cena' className='capitalize'>
                  cena
                </option>
                <option value='bebidas' className='capitalize'>
                  bebidas
                </option>
                <option value='postres' className='capitalize'>
                  postres
                </option>
                <option value='ensaladas' className='capitalize'>
                  ensaladas
                </option>
              </select>
            </div>
            {formik.touched.categoria && formik.errors.categoria ? (
              <div className='error' role='alert'>
                <p>{formik.errors.categoria}</p>
              </div>
            ) : null}

            <div className='mb-4'>
              <label
                htmlFor='imagen'
                className='block text-gray-700 text-sm font-bold mb-2 capitalize'
              >
                imagen
              </label>
              <FileUploader
                accept='image/*'
                id='imagen'
                name='imagen'
                randomizeFilename
                storageRef={firebase.storage.ref("productos")}
                                onUploadStart={handleUploadStart}
                                onUploadError={handleUploadError}
                                onUploadSuccess={handleUploadSuccess}
                                onProgress={handleProgress}
              />
            </div>
            {loading && (
              <div className='h-12 w-full relative'>
                <div className='progreso' style={{ width: `${progreso}%` }}>
                  {progreso} %
                </div>
              </div>
            )}

            {urlImagen && (
              <div className='bg-green-400 text-sm'>
                imagen se subió correctamente
              </div>
            )}
            <div className='mb-4'>
              <label
                htmlFor='descripcion'
                className='block text-gray-700 text-sm font-bold mb-2 capitalize'
              >
                descripcion
              </label>
              <textarea
                name='descripcion'
                id=''
                cols='3'
                rows='2'
                className='myInput'
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>
            <div className='mb-4'>
              <button type='submit' className='myInput'>
                Enviar
              </button>
            </div>
            {formik.touched.descripcion && formik.errors.descripcion ? (
              <div className='error' role='alert'>
                <p>{formik.errors.descripcion}</p>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  )
}
