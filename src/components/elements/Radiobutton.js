import React, { useContext } from 'react'
import { FormContext } from '../../FormContext'
import slugify from './../helper/slugify'

const Radiobutton = ({ id, label, options, placeholder, required, readonly }) => {
  const { handleChange } = useContext(FormContext)
  const newOptions = options.split(',')
  return (
    <div className='mb-3 form-check'>
      <fieldset required={required} readOnly={readonly && 'readonly'}>
        <legend className='text-base font-medium text-gray-900'>{label}</legend>
        <small className='text-xs text-gray-500'>{placeholder}</small>
        <div className='mt-4 space-y-4'>
          {newOptions.length > 0 &&
            newOptions.map(
              (option, i) =>
                option.trim() !== '' && (
                  <div key={i} className='flex items-center'>
                    <input
                      id={slugify(option)}
                      onChange={(event) => handleChange(id, event)}
                      name={label}
                      type='radio'
                      className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
                    />
                    <label for={label} className='ml-3 block text-sm font-medium text-gray-700'>
                      {option}
                    </label>
                  </div>
                )
            )}
        </div>
      </fieldset>
    </div>
  )
}

export default Radiobutton
