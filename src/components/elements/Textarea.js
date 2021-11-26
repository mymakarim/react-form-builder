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
        <label htmlFor={label} className='block text-sm font-medium text-gray-700'>
          {label}
        </label>
        <textarea
          title={label}
          className='p-2.5 mt-2 block w-full rounded-md border'
          id={id}
          rows={rows}
          placeholder={placeholder ? placeholder : ''}
          maxLength={maxlength}
          readonly={readonly && 'readonly'}
          disabled={readonly}
          required={required}
        />
        <small className='text-gray-500 text-xs mt-1'>{footnote}</small>
      </div>
    </Wrapper>
  )
}

export default Textarea
