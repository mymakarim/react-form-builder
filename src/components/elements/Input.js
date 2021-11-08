import React, { useContext } from 'react'
import { FormContext } from '../../FormContext'

const Input = ({
  id,
  type,
  label,
  placeholder,
  numbermin,
  numbermax,
  readOnly,
  step,
  maxlength,
  pattern,
  footnote,
  required
}) => {
  const { handleChange } = useContext(FormContext)
  return (
    <div className='my-3'>
      <label htmlFor={label} className='form-label'>
        {label}
      </label>
      <input
        title={label}
        type={type}
        className='form-control'
        id={id}
        placeholder={placeholder ? placeholder : ''}
        onChange={(event) => handleChange(id, event)}
        min={numbermin}
        max={numbermax}
        maxlength={maxlength}
        readOnly={readOnly && 'readOnly'}
        step={step}
        pattern={pattern}
        required={required}
      />
      <small className='text-gray-500 text-xs mt-1'>{footnote}</small>
    </div>
  )
}

export default Input
