import React, { useContext } from 'react'
import Wrapper from './../elements/Wrapper'
import slugify from './../helper/slugify'
import { FormContext } from './../contexts/FormContext'

const Select = ({
  id,
  orderId,
  label,
  options,
  placeholder,
  required,
  readonly,
  footnote,
  multiple,
  icon
}) => {
  const newOptions = options.split(',')
  const { changeHandler, data } = useContext(FormContext)
  let checks = data && data[id] ? data[id] : []

  const changeHandlerhere = (e) => {
    var options = e.target.options
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        if (!multiple) {
          checks = []
        }
        checks.push(options[i].value)
      }
    }
    changeHandler(id, checks)
    console.log('SELECTS: ', checks)
  }

  return (
    <Wrapper
      content='Select'
      id={id}
      orderId={orderId}
      data={{ id, label, options, placeholder, required, readonly, footnote, multiple, icon }}
    >
      <div className='my-3'>
        <label
          htmlFor={label}
          className='block text-sm font-medium text-gray-700 flex items-center gap-2'
        >
          <i className={icon} />
          <span>{label}</span>
          {required && <span>*</span>}
        </label>
        <select
          title={label}
          name={id}
          required={required}
          readonly={readonly && 'readonly'}
          disabled={readonly}
          className='p-2.5 mt-2 block w-full rounded-md border'
          multiple={multiple}
          defaultValue={data && data[id]}
          onBlur={(event) => changeHandlerhere(event)}
        >
          <option disabled value={slugify(placeholder)}>
            {placeholder}
          </option>
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
