import React from 'react'
import Wrapper from './../elements/Wrapper'

const HeadingElement = ({ id, orderId, label, placeholder, required, readonly }) => {
  // console.log('ORDERID IN HEADINGELEMENT: ', orderId)
  return (
    <Wrapper
      content='heading'
      id={id}
      orderId={orderId}
      data={{ id, label, placeholder, required, readonly }}
    >
      <div
        id={id}
        readonly={readonly && 'readonly'}
        disabled={readonly}
        required={required}
        className='mb-3'
      >
        <label htmlFor={label} className='hidden text-sm font-medium text-gray-700'>
          {label}
        </label>
        <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
          {placeholder}
        </h2>
      </div>
    </Wrapper>
  )
}

export default HeadingElement
