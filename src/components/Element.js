import React from 'react'
import Checkbox from './elements/Checkbox'
import Input from './elements/Input'
import Select from './elements/Select'
import Radiobutton from './elements/Radiobutton'
import Description from './elements/Description'
import Heading from './elements/Heading'
import Textarea from './elements/Textarea'
import Geo from './elements/Geo'

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
    accept,
    maxFilesize,
    maxFiles,
    order,
    icon
  }
}) => {
  // console.log('ORDERID IN ELEMENT: ', order)
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
          orderId={order}
          icon={icon}
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
          orderId={order}
          icon={icon}
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
          orderId={order}
          icon={icon}
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
          orderId={order}
          icon={icon}
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
          orderId={order}
          icon={icon}
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
          maxLength={maxlength}
          footnote={footnote}
          orderId={order}
          icon={icon}
        />
      )

    case 'geo':
      return <Geo id={id} label={label} footnote={footnote} orderId={order} icon={icon} />

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
          maxLength={maxlength}
          pattern={pattern}
          footnote={footnote}
          required={required}
          multiple={multiple}
          accept={accept}
          maxFilesize={maxFilesize}
          maxFiles={maxFiles}
          orderId={order}
          icon={icon}
        />
      )
  }
}

export default Element
