import React, { useContext } from 'react'
import Wrapper from './../elements/Wrapper'
import slugify from './../helper/slugify'
import { FormContext } from './../contexts/FormContext'

const CheckboxField = ({ id, orderId, label, options, placeholder, required, readonly, icon }) => {
  const newOptions = options.split(',')
  const { changeHandler, data } = useContext(FormContext)
  const checks = data && data[id] ? data[id] : []

  const changeHandlerhere = (evt) => {
    if (evt.target.checked) {
      checks.push(evt.target.name)
    } else {
      checks.splice(checks.indexOf(evt.target.name), 1)
    }
    changeHandler(id, checks)
    console.log('CHECKS: ', checks)
  }

  return (
    <Wrapper
      content='Checkbox'
      id={id}
      orderId={orderId}
      data={{ id, label, options, placeholder, required, readonly, icon }}
    >
      <div className='mb-3 form-check'>
        <fieldset required={required} readOnly={readonly && 'readonly'} disabled={readonly}>
          <legend className='text-sm font-medium text-gray-900 flex items-center gap-2'>
            <i className={icon} />
            <span>{label}</span>
            {required && <span>*</span>}
          </legend>
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
                          defaultChecked={data && data[id] && data[id].includes(slugify(option))}
                          onChange={(event) => changeHandlerhere(event)}
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
