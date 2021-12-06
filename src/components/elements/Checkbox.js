import React, { useContext } from 'react'
import Wrapper from './../elements/Wrapper'
import slugify from './../helper/slugify'
import { FormContext } from './../contexts/FormContext'

const CheckboxField = ({ id, orderId, label, options, placeholder, required, readonly }) => {
  const newOptions = options.split(',')
  const { changeHandler, data } = useContext(FormContext)

  return (
    <Wrapper
      content='Checkbox'
      id={id}
      orderId={orderId}
      data={{ id, label, options, placeholder, required, readonly }}
    >
      <div className='mb-3 form-check'>
        <fieldset required={required} readonly={readonly && 'readonly'} disabled={readonly}>
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
                          name={slugify(option)}
                          defaultChecked={data && data[slugify(option)]}
                          onChange={(event) => changeHandler(event)}
                          type='checkbox'
                          className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                        />
                      </div>
                      <div className='ml-3 text-sm'>
                        <label htmlFor={slugify(option)} className='font-medium text-gray-700'>
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
