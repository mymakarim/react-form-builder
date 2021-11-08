import React from 'react'

const Description = ({ id, label, placeholder, required, readonly }) => {
  return (
    <div id={id} readonly={readonly && 'readonly'} required={required} className='mb-3'>
      <label htmlFor={label} className='form-label'>
        {label}
      </label>
      <p class='mt-4 text-gray-500'>{placeholder}</p>
    </div>
  )
}

export default Description
