import React from 'react'
import Checkbox from './elements/Checkbox'
import Input from './elements/Input'
import Select from './elements/Select'
import Radiobutton from './elements/Radiobutton'
import Description from './elements/Description'
import Heading from './elements/Heading'
import Textarea from './elements/Textarea'
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
    options,
    rows,
    multiple,
    accept
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
          multiple={multiple}
          footnote={footnote}
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
    case 'radiobutton':
      return (
        <Radiobutton
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

    case 'textarea':
      return (
        <Textarea
          id={id}
          placeholder={placeholder}
          required={required}
          label={label}
          readonly={readonly}
          rows={rows}
          maxlength={maxlength}
          footnote={footnote}
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
          multiple={multiple}
          accept={accept}
        />
      )
  }
}

export default Element
