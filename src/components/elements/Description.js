import React from 'react'
import Wrapper from './../elements/Wrapper'

const Description = ({ id, orderId, label, placeholder, required, readonly }) => {
  return (
    <Wrapper
      content='description'
      orderId={orderId}
      id={id}
      data={{ id, label, placeholder, required, readonly }}
    >
      <div
        id={id}
        readonly={readonly && 'readonly'}
        disabled={readonly}
        required={required}
        className='mb-3'
      >
        <label htmlFor={label} className='hidden  text-sm font-medium text-gray-700'>
          {label}
        </label>
        <p className='mt-4 text-gray-500'>{placeholder}</p>
      </div>
    </Wrapper>
  )
}

export default Description
