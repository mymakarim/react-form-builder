import React, { useContext } from 'react'
import Wrapper from './../elements/Wrapper'
import slugify from './../helper/slugify'
import { FormContext } from './../contexts/FormContext'

const Radiobutton = ({ id, orderId, label, options, placeholder, required, readonly, icon }) => {
  const newOptions = options.split(',')
  const { changeHandler, data } = useContext(FormContext)

  return (
    <Wrapper
      content='radiobutton'
      id={id}
      orderId={orderId}
      data={{ id, label, options, placeholder, required, readonly, icon }}
    >
      <div className='mb-3 form-check'>
        <fieldset required={required} readOnly={readonly && 'readonly'} disabled={readonly}>
          <legend className='text-sm font-medium text-gray-700 flex items-center gap-2'>
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
                    <div key={i} className='flex items-center'>
                      <input
                        id={slugify(option)}
                        name={id}
                        type='radio'
                        value={slugify(option)}
                        defaultChecked={data && data[id] === slugify(option)}
                        onChange={(event) => changeHandler(event)}
                        className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
                      />
                      <label htmlFor={id} className='ml-3 block text-sm font-medium text-gray-700'>
                        {option}
                      </label>
                    </div>
                  )
              )}
          </div>
        </fieldset>
      </div>
    </Wrapper>
  )
}

export default Radiobutton
