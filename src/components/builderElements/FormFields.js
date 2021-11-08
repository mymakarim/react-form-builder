import React from 'react'

export default function FormFields({ changeContent }) {
  return (
    <section aria-labelledby='products-heading' className='p-8 pb-16'>
      <h3 className='text-xl font-bold mb-6'>Select a field for your form</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-semibold text-gray-500'>
        <div
          onClick={() => changeContent('inputText')}
          className='col-span-1 cursor-pointer ring-2 ring-transparent focus:ring-cyan-500 hover:bg-cyan-200 p-2.5 rounded-sm border border-gray-500 hover:border-transparent flex items-center gap-2'
        >
          <span className='bg-yellow-500 w-12 h-8 rounded-md font-bold text-white flex items-center justify-center pb-0.5'>
            @
          </span>
          <span>Text Email Tel Date Number File URL Range ...</span>
        </div>
        <div
          onClick={() => changeContent('Checkbox')}
          className='col-span-1 cursor-pointer ring-2 ring-transparent focus:ring-cyan-500 hover:bg-cyan-200 p-2.5 rounded-sm border border-gray-500 hover:border-transparent flex items-center gap-2'
        >
          <span className='bg-green-600 w-12 h-8 rounded-md font-bold text-white flex items-center justify-center pb-0.5'>
            [x]
          </span>
          <span>Add Checkbox</span>
        </div>
        <div
          onClick={() => changeContent('Select')}
          className='col-span-1 cursor-pointer ring-2 ring-transparent focus:ring-cyan-500 hover:bg-cyan-200 p-2.5 rounded-sm border border-gray-500 hover:border-transparent flex items-center gap-2'
        >
          <span className='bg-red-600 w-12 h-8 rounded-md font-bold text-white flex items-center justify-center pb-0.5'>
            =
          </span>
          <span>Add Select</span>
        </div>
      </div>
    </section>
  )
}
