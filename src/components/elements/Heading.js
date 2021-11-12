import React, { useContext } from 'react'
import { FormContext } from '../../FormContext'

const Heading = ({ id, label, placeholder, required, readonly }) => {
  const { deleteField } = useContext(FormContext)

  return (
    <div className='relative group'>
      <div id={id} readonly={readonly && 'readonly'} required={required} className='mb-3'>
        <label htmlFor={label} className='form-label'>
          {label}
        </label>
        <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
          {placeholder}
        </h2>
      </div>
      <div className='hidden group-hover:flex absolute top-0 right-0 mr-3 bottom-0 flex items-center gap-2'>
        <button className='px-3 py-2 font-semibold text-white rounded-md bg-cyan-500 hover:bg-cyan-700  flex items-center justify-between gap-1'>
          <svg
            class='h-5 w-5'
            x-description='Heroicon name: solid/pencil'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path>
          </svg>
          <span>Edit</span>
        </button>
        <button
          onClick={() => deleteField(id)}
          className='px-3 py-2  font-semibold text-white rounded-md bg-red-600 hover:bg-red-700  flex items-center justify-between gap-1'
        >
          <svg
            class='h-5 w-5'
            x-description='Heroicon name: outline/exclamation'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            ></path>
          </svg>
          <span>Delete</span>
        </button>
      </div>
    </div>
  )
}

export default Heading
