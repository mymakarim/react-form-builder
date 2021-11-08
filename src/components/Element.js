import React from 'react'
import Checkbox from './elements/Checkbox'
import Input from './elements/Input'
import Select from './elements/Select'
import Description from './elements/Description'
import Heading from './elements/Heading'
const Element = ({
  field: {
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
          readonly={readonly}
          options={options}
        />
      )
    case 'checkbox':
      return (
        <Checkbox
          id={id}
          placeholder={placeholder}
          required={required}
          label={label}
          readonly={readonly}
          options={options}
        />
      )
    case 'heading':
      return (
        <Heading
          id={id}
          placeholder={placeholder}
          required={required}
          label={label}
          readonly={readonly}
        />
      )
    case 'description':
      return (
        <Description
          id={id}
          placeholder={placeholder}
          required={required}
          label={label}
          readonly={readonly}
        />
      )

    default:
      return (
        <Input
          id={id}
          label={label}
          placeholder={placeholder}
          type={type}
          numbermin={numbermin}
          numbermax={numbermax}
          readonly={readonly}
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
