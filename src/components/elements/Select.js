import React from 'react'
import Wrapper from './../elements/Wrapper'
import slugify from './../helper/slugify'

const Select = ({ id, label, options, placeholder, required, readonly, footnote, multiple }) => {
  const newOptions = options.split(',')
  return (
    <Wrapper
      content='Select'
      id={id}
      data={{ id, label, options, placeholder, required, readonly, footnote, multiple }}
    >
      <div className='my-3'>
        <label className='form-label'>{label}</label>
        <select
          title={label}
          required={required}
          readOnly={readonly && 'readonly'}
          className='form-select'
          multiple={multiple}
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
    </Wrapper>
  )
}

export default Select
