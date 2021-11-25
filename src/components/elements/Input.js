import React from 'react'
import Wrapper from './../elements/Wrapper'

const Input = ({
  id,
  orderId,
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
  accept,
  icon
}) => {
  return (
    <Wrapper
      content='inputText'
      id={id}
      orderId={orderId}
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
        accept,
        icon
      }}
    >
      <div className='my-3'>
        <label htmlFor={label} className='block text-sm font-medium text-gray-700'>
          {label}
        </label>
        {type !== 'file' ? (
          <div className='flex items-stretch mt-2'>
            <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
              <i className={icon} />
            </span>
            <input
              title={label}
              type={type}
              className='p-2.5 block w-full rounded-r-md border'
              id={id}
              name={id}
              placeholder={placeholder ? placeholder : ''}
              min={numbermin}
              max={numbermax}
              maxLength={maxlength}
              readOnly={readonly && 'readonly'}
              step={step}
              pattern={pattern}
              required={required}
            />
          </div>
        ) : (
          <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
            <div className='space-y-1 text-center'>
              <svg
                className='mx-auto h-12 w-12 text-gray-400'
                stroke='currentColor'
                fill='none'
                viewBox='0 0 48 48'
                aria-hidden='true'
              >
                <path
                  d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <div className='flex text-sm text-gray-600'>
                <label
                  htmlFor={id}
                  className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
                >
                  <span>
                    Upload {!multiple && 'a '}file{multiple && 's'}
                  </span>
                  <input id={id} name={id} type='file' class='sr-only' />
                </label>
                <p className='pl-1'>or drag and drop</p>
              </div>
              <p className='text-xs text-gray-500'>
                <span className='font-semibold'>{accept}</span> up to 10MB
              </p>
            </div>
          </div>
        )}
        <small className='text-gray-500 text-xs mt-1'>{footnote}</small>
      </div>
    </Wrapper>
  )
}

export default Input
