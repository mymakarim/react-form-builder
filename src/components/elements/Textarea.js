import React, { useContext } from 'react'
import Wrapper from './../elements/Wrapper'
import { FormContext } from './../contexts/FormContext'

const Textarea = ({
  id,
  orderId,
  label,
  rows,
  placeholder,
  readonly,
  maxlength,
  footnote,
  required,
  icon
}) => {
  const { changeHandler, data } = useContext(FormContext)

  return (
    <Wrapper
      content='textarea'
      id={id}
      orderId={orderId}
      data={{ id, label, rows, placeholder, readonly, maxlength, footnote, required, icon }}
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
        <textarea
          title={label}
          className='p-2.5 mt-2 block w-full rounded-md border'
          id={id}
          name={id}
          rows={rows}
          placeholder={placeholder ? placeholder : ''}
          maxLength={maxlength}
          readonly={readonly && 'readonly'}
          disabled={readonly}
          required={required}
          defaultValue={data && data[id]}
          onBlur={(event) => changeHandler(event)}
        />
        <small className='text-gray-500 text-xs mt-1'>{footnote}</small>
      </div>
    </Wrapper>
  )
}

export default Textarea
