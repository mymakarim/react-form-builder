import React from 'react'
import Wrapper from './../elements/Wrapper'
import slugify from './../helper/slugify'

const Select = ({
  id,
  orderId,
  label,
  options,
  placeholder,
  required,
  readonly,
  footnote,
  multiple
}) => {
  const newOptions = options.split(',')
  return (
    <Wrapper
      content='Select'
      id={id}
      orderId={orderId}
      data={{ id, label, options, placeholder, required, readonly, footnote, multiple }}
    >
      <div className='my-3'>
        <label className='block text-sm font-medium text-gray-700'>{label}</label>
        <select
          title={label}
          required={required}
          readonly={readonly && 'readonly'}
          disabled={readonly}
          className='p-2.5 mt-2 block w-full rounded-md border'
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
