import React from 'react'
import Wrapper from './../elements/Wrapper'
import slugify from './../helper/slugify'

const CheckboxField = ({ id, label, options, placeholder, required, readonly }) => {
  const newOptions = options.split(',')

  return (
    <Wrapper
      content='checkbox'
      id={id}
      data={{ id, label, options, placeholder, required, readonly }}
    >
      <div className='mb-3 form-check'>
        <fieldset required={required} readOnly={readonly && 'readonly'}>
          <legend className='text-base font-medium text-gray-900'>{label}</legend>
          <small className='text-xs text-gray-500'>{placeholder}</small>
          <div className='mt-4 space-y-4'>
            {newOptions.length > 0 &&
              newOptions.map(
                (option, i) =>
                  option.trim() !== '' && (
                    <div key={i} className='flex items-start'>
                      <div className='flex items-center h-5'>
                        <input
                          id={slugify(option)}
                          name={option}
                          type='checkbox'
                          className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                        />
                      </div>
                      <div className='ml-3 text-sm'>
                        <label htmlFor={option} className='font-medium text-gray-700'>
                          {option}
                        </label>
                      </div>
                    </div>
                  )
              )}
          </div>
        </fieldset>
      </div>
    </Wrapper>
  )
}

export default CheckboxField
