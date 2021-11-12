import React from 'react'
import Wrapper from './../elements/Wrapper'

const Input = ({
  id,
  type,
  label,
  placeholder,
  numbermin,
  numbermax,
  readonly,
  step,
  maxlength,
  pattern,
  footnote,
  required,
  multiple,
  accept
}) => {
  return (
    <Wrapper
      content='inputText'
      id={id}
      data={{
        id,
        type,
        label,
        placeholder,
        numbermin,
        numbermax,
        readonly,
        step,
        maxlength,
        pattern,
        footnote,
        required,
        multiple,
        accept
      }}
    >
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
          min={numbermin}
          max={numbermax}
          maxlength={maxlength}
          readonly={readonly && 'readonly'}
          step={step}
          pattern={pattern}
          required={required}
          multiple={multiple}
          accept={accept}
        />
        <small className='text-gray-500 text-xs mt-1'>{footnote}</small>
      </div>
    </Wrapper>
  )
}

export default Input
