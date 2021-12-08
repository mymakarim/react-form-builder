import React from 'react'

export default function FormFields({ changeContent }) {
  return (
    <section>
      <div className='p-2 sm:p-3 lg:p-8'>
        <h3 className='text-xl font-bold mb-6'>Select a field for your form</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-semibold text-gray-500'>
          <div
            onClick={() => changeContent('heading')}
            className='col-span-1 cursor-pointer ring-2 ring-transparent focus:ring-cyan-500 hover:bg-cyan-100 p-2.5 rounded-md border border-gray-500 hover:border-transparent flex items-center gap-2'
          >
            <span className='bg-gray-700 w-12 h-8 rounded-md font-bold text-white flex items-center justify-center pb-0.5'>
              H
            </span>
            <span>Heading (Title)</span>
          </div>
          <div
            onClick={() => changeContent('description')}
            className='col-span-1 cursor-pointer ring-2 ring-transparent focus:ring-cyan-500 hover:bg-cyan-100 p-2.5 rounded-md border border-gray-500 hover:border-transparent flex items-center gap-2'
          >
            <span className='bg-indigo-600 w-12 h-8 rounded-md font-bold text-white flex items-center justify-center pb-0.5'>
              ---
            </span>
            <span>Description (Short Text)</span>
          </div>
          <div
            onClick={() => changeContent('inputText')}
            className='col-span-1 cursor-pointer ring-2 ring-transparent focus:ring-cyan-500 hover:bg-cyan-100 p-2.5 rounded-md border border-gray-500 hover:border-transparent flex items-center gap-2'
          >
            <span className='bg-yellow-500 w-12 h-8 rounded-md font-bold text-white flex items-center justify-center '>
              <i className='fas fa-envelope'></i>
            </span>
            <span>Text Email Tel Date Number URL Range ...</span>
          </div>
          <div
            onClick={() => changeContent('textarea')}
            className='col-span-1 cursor-pointer ring-2 ring-transparent focus:ring-cyan-500 hover:bg-cyan-100 p-2.5 rounded-md border border-gray-500 hover:border-transparent flex items-center gap-2'
          >
            <span className='bg-cyan-500 w-12 h-8 rounded-md font-bold text-white flex items-center justify-center'>
              <i className='fas fa-expand'></i>
            </span>
            <span>Long Text</span>
          </div>
          <div
            onClick={() => changeContent('Checkbox')}
            className='col-span-1 cursor-pointer ring-2 ring-transparent focus:ring-cyan-500 hover:bg-cyan-100 p-2.5 rounded-md border border-gray-500 hover:border-transparent flex items-center gap-2'
          >
            <span className='bg-green-600 w-12 h-8 rounded-md font-bold text-white flex items-center justify-center '>
              <i className='far fa-check-square'></i>
            </span>
            <span>Checkbox (Select Multiple)</span>
          </div>
          <div
            onClick={() => changeContent('Select')}
            className='col-span-1 cursor-pointer ring-2 ring-transparent focus:ring-cyan-500 hover:bg-cyan-100 p-2.5 rounded-md border border-gray-500 hover:border-transparent flex items-center gap-2'
          >
            <span className='bg-red-600 w-12 h-8 rounded-md font-bold text-white flex items-center justify-center '>
              <i className='fas fa-angle-down'></i>
            </span>
            <span>Dropdown (Select One or Multiple)</span>
          </div>
          <div
            onClick={() => changeContent('radiobutton')}
            className='col-span-1 cursor-pointer ring-2 ring-transparent focus:ring-cyan-500 hover:bg-cyan-100 p-2.5 rounded-md border border-gray-500 hover:border-transparent flex items-center gap-2'
          >
            <span className='bg-pink-800 w-12 h-8 rounded-md font-bold text-white flex items-center justify-center '>
              O
            </span>
            <span>Radiobutton (Select One)</span>
          </div>
          <div
            onClick={() => changeContent('geo')}
            className='col-span-1 cursor-pointer ring-2 ring-transparent focus:ring-cyan-500 hover:bg-cyan-100 p-2.5 rounded-md border border-gray-500 hover:border-transparent flex items-center gap-2'
          >
            <span className='bg-purple-800 w-12 h-8 rounded-md font-bold text-white flex items-center justify-center '>
              <i className='fas fa-map-marker-alt'></i>
            </span>
            <span>Geo Location</span>
          </div>
          <div
            onClick={() => changeContent('inputFile')}
            className='col-span-1 cursor-pointer ring-2 ring-transparent focus:ring-cyan-500 hover:bg-cyan-100 p-2.5 rounded-md border border-gray-500 hover:border-transparent flex items-center gap-2'
          >
            <span className='bg-orange-600 w-12 h-8 rounded-md font-bold text-white flex items-center justify-center '>
              <i className='fas fa-file-upload'></i>
            </span>
            <span>Files (Images, Videos and ...)</span>
          </div>
        </div>
      </div>
    </section>
  )
}
