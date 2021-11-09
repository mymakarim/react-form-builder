import React from 'react'

const Heading = ({ id, label, placeholder, required, readonly }) => {
  return (
    <div id={id} readonly={readonly && 'readonly'} required={required} className='mb-3'>
      <label htmlFor={label} className='form-label'>
        {label}
      </label>
      <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
        {placeholder}
      </h2>
    </div>
  )
}

export default Heading
