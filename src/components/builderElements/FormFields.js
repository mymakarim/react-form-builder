import React from 'react'

export default function FormFields({ toggle, changeContent }) {
  return (
    <section>
      <div className='p-8'>
        <h3 className='text-xl font-bold mb-6'>Select a field for your form</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-semibold text-gray-500'>
          <div
            onClick={() => changeContent('heading')}
            className='col-span-1 cursor-pointer ring-2 ring-transparent focus:ring-cyan-500 hover:bg-cyan-200 p-2.5 rounded-sm border border-gray-500 hover:border-transparent flex items-center gap-2'
          >
            <span className='bg-gray-700 w-12 h-8 rounded-md font-bold text-white flex items-center justify-center pb-0.5'>
              H
            </span>
            <span>Heading (Title)</span>
          </div>
          <div
            onClick={() => changeContent('description')}
            className='col-span-1 cursor-pointer ring-2 ring-transparent focus:ring-cyan-500 hover:bg-cyan-200 p-2.5 rounded-sm border border-gray-500 hover:border-transparent flex items-center gap-2'
          >
            <span className='bg-indigo-600 w-12 h-8 rounded-md font-bold text-white flex items-center justify-center pb-0.5'>
              ---
            </span>
            <span>Description (Short Text)</span>
          </div>
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
            onClick={() => changeContent('textarea')}
            className='col-span-1 cursor-pointer ring-2 ring-transparent focus:ring-cyan-500 hover:bg-cyan-200 p-2.5 rounded-sm border border-gray-500 hover:border-transparent flex items-center gap-2'
          >
            <span className='bg-cyan-500 w-12 h-8 rounded-md font-bold text-white flex items-center justify-center pb-0.5'>
              ooo
            </span>
            <span>Long Text</span>
          </div>
          <div
            onClick={() => changeContent('Checkbox')}
            className='col-span-1 cursor-pointer ring-2 ring-transparent focus:ring-cyan-500 hover:bg-cyan-200 p-2.5 rounded-sm border border-gray-500 hover:border-transparent flex items-center gap-2'
          >
            <span className='bg-green-600 w-12 h-8 rounded-md font-bold text-white flex items-center justify-center pb-0.5'>
              [x]
            </span>
            <span>Checkbox (Select Multiple)</span>
          </div>
          <div
            onClick={() => changeContent('Select')}
            className='col-span-1 cursor-pointer ring-2 ring-transparent focus:ring-cyan-500 hover:bg-cyan-200 p-2.5 rounded-sm border border-gray-500 hover:border-transparent flex items-center gap-2'
          >
            <span className='bg-red-600 w-12 h-8 rounded-md font-bold text-white flex items-center justify-center pb-0.5'>
              =
            </span>
            <span>Dropdown (Select One or Multiple)</span>
          </div>
          <div
            onClick={() => changeContent('radiobutton')}
            className='col-span-1 cursor-pointer ring-2 ring-transparent focus:ring-cyan-500 hover:bg-cyan-200 p-2.5 rounded-sm border border-gray-500 hover:border-transparent flex items-center gap-2'
          >
            <span className='bg-red-600 w-12 h-8 rounded-md font-bold text-white flex items-center justify-center pb-0.5'>
              O-
            </span>
            <span>Radiobutton (Select One)</span>
          </div>
        </div>
      </div>
      <div className='px-6 py-3 bg-gray-50 flex items-center justify-between sm:px-6'>
        <button
          type='button'
          onClick={toggle}
          className='py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
        >
          Close
        </button>
        <button
          type='submit'
          className='py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
        >
          Save
        </button>
      </div>
    </section>
  )
}
