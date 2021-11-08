import React, { useContext } from 'react'
import { FormContext } from '../../FormContext'

const Textarea = ({ id, label, rows, placeholder, readonly, maxlength, footnote, required }) => {
  const { handleChange } = useContext(FormContext)
  return (
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
        onChange={(event) => handleChange(id, event)}
        maxlength={maxlength}
        readonly={readonly && 'readonly'}
        required={required}
      />
      <small className='text-gray-500 text-xs mt-1'>{footnote}</small>
    </div>
  )
}

export default Textarea
