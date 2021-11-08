import React, { useContext } from 'react'
import { FormContext } from '../../FormContext'
import slugify from './../helper/slugify'

const Select = ({ id, label, options, placeholder, required, readonly, footnote, multiple }) => {
  const { handleChange } = useContext(FormContext)
  const newOptions = options.split(',')
  return (
    <div className='my-3'>
      <label className='form-label'>{label}</label>
      <select
        title={label}
        required={required}
        readOnly={readonly && 'readonly'}
        className='form-select'
        onChange={(event) => handleChange(id, event)}
      >
        <option>{placeholder}</option>
        {newOptions.length > 0 &&
          newOptions.map(
            (option, i) =>
              option.trim() !== '' && (
                <option value={slugify(option)} key={i}>
                  {option}
                </option>
              )
          )}
      </select>
      <small className='text-xs text-gray-500'>{footnote}</small>
    </div>
  )
}

export default Select
