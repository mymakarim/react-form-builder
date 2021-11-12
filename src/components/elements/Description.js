import React from 'react'
import Wrapper from './../elements/Wrapper'

const Description = ({ id, label, placeholder, required, readonly }) => {
  return (
    <Wrapper content='description' id={id} data={{ id, label, placeholder, required, readonly }}>
      <div id={id} readonly={readonly && 'readonly'} required={required} className='mb-3'>
        <label htmlFor={label} className='form-label'>
          {label}
        </label>
        <p className='mt-4 text-gray-500'>{placeholder}</p>
      </div>
    </Wrapper>
  )
}

export default Description
