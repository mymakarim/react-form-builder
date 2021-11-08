import React from 'react'
import Checkbox from './elements/Checkbox'
import Input from './elements/Input'
import Select from './elements/Select'
const Element = ({
  field: {
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
    required,
    options
  }
}) => {
  switch (type) {
    case 'select':
      return (
        <Select
          id={id}
          placeholder={placeholder}
          required={required}
          label={label}
          options={options}
        />
      )
    case 'checkbox':
      return <Checkbox id={id} label={label} />

    default:
      return (
        <Input
          id={id}
          label={label}
          placeholder={placeholder}
          type={type}
          numbermin={numbermin}
          numbermax={numbermax}
          readOnly={readOnly}
          step={step}
          maxlength={maxlength}
          pattern={pattern}
          footnote={footnote}
          required={required}
        />
      )
  }
}

export default Element
