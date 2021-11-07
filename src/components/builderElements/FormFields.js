import React from 'react'

export default function FormFields({ changeContent }) {
  return (
    <section aria-labelledby='products-heading' className='p-4 sm:p-6 lg:p-8 '>
      <h3 className='text-xl font-bold mb-3'>Select a field for your form</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        <button
          onClick={() => changeContent('inputText')}
          className='col-span-1 uppercase font-semibold text-white cursor-pointer bg-indigo-600 ring-2 ring-indigo-500 px-4 py-2 rounded-sm'
        >
          Add Input Text here
        </button>
        <button
          onClick={() => changeContent('Checkbox')}
          className='col-span-1 uppercase font-semibold text-white cursor-pointer bg-indigo-600 ring-2 ring-indigo-500 px-4 py-2 rounded-sm'
        >
          Add Checkbox
        </button>
        <button
          onClick={() => changeContent('Select')}
          className='col-span-1 uppercase font-semibold text-white cursor-pointer bg-indigo-600 ring-2 ring-indigo-500 px-4 py-2 rounded-sm'
        >
          Add Select
        </button>
      </div>
    </section>
  )
}
