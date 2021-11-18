import React from 'react'
import Wrapper from './../elements/Wrapper'

const Textarea = ({
  id,
  orderId,
  label,
  rows,
  placeholder,
  readonly,
  maxlength,
  footnote,
  required
}) => {
  return (
    <Wrapper
      content='textarea'
      id={id}
      orderId={orderId}
      data={{ id, label, rows, placeholder, readonly, maxlength, footnote, required }}
    >
      <div className='my-3'>
        <label htmlFor={label} className='form-label'>
          {label}
        </label>
        <textarea
          title={label}
          className='form-control'
          id={id}
          rows={rows}
          placeholder={placeholder ? placeholder : ''}
          maxlength={maxlength}
          readonly={readonly && 'readonly'}
          required={required}
        />
        <small className='text-gray-500 text-xs mt-1'>{footnote}</small>
      </div>
    </Wrapper>
  )
}

export default Textarea
