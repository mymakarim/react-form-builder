import React, { useContext, useState } from 'react'
import { FormContext } from '../../FormContext'

import InputText from './../builderElements/InputText.js'
import Checkbox from './../builderElements/Checkbox.js'
import Radiobutton from './../builderElements/Radiobutton.js'
import Select from './../builderElements/Select.js'
import Description from './../builderElements/Description.js'
import Heading from './../builderElements/Heading.js'
import Textarea from './../builderElements/Textarea.js'

const Wrapper = ({ children, id, orderId, data, content }) => {
  const { deleteField, duplicateField, goUpField, goDownField, getFieldslength } =
    useContext(FormContext)
  const [edit, setEdit] = useState(false)
  const lastId = getFieldslength()
  console.log('LAST FIELD ID: ', lastId)

  // console.log('ORDERID IN WRAPPER: ', orderId)

  const RenderSwitch = ({ data }) => {
    switch (content) {
      case 'heading':
        return <Heading data={data} />
      case 'description':
        return <Description data={data} />
      case 'textarea':
        return <Textarea data={data} />
      case 'inputText':
        return <InputText data={data} />
      case 'radiobutton':
        return <Radiobutton data={data} />
      case 'Checkbox':
        return <Checkbox data={data} />
      case 'Select':
        return <Select data={data} />
      default:
        return <InputText data={data} />
    }
  }

  return (
    <>
      <div className='relative group'>
        {children}
        <div className='hidden group-hover:flex absolute top-0 right-0 mr-3 bottom-0 flex items-center gap-2'>
          <button
            onClick={() => duplicateField(id)}
            className='p-2 text-white rounded-full bg-indigo-600 hover:bg-indigo-700 border-2 border-indigo-700 flex items-center justify-center'
          >
            <svg
              aria-hidden='true'
              viewBox='0 0 16 16'
              version='1.1'
              fill='currentColor'
              data-view-component='true'
              className='h-5 w-5 p-0.5'
            >
              <path d='M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z'></path>
              <path d='M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z'></path>
            </svg>
          </button>
          <button
            onClick={() => setEdit(!edit)}
            className='p-2 text-white rounded-full bg-cyan-500 hover:bg-cyan-700 border-2 border-cyan-700 flex items-center justify-center'
          >
            <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
              <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path>
            </svg>
          </button>
          <button
            onClick={() => deleteField(id)}
            className='p-2 text-white rounded-full bg-red-600 hover:bg-red-700 border-2 border-red-700 flex items-center justify-center'
          >
            <svg
              className='h-5 w-5'
              x-description='Heroicon name: outline/exclamation'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              ></path>
            </svg>
          </button>
          <button
            disabled={orderId === 1}
            onClick={() => goUpField(orderId)}
            className='disabled:cursor-not-allowed disabled:opacity-50 p-2 rounded-full text-indigo-700 border-cyan-700 border-2 hover:bg-cyan-700 hover:text-white transition duration-500 ease-in-out flex items-center justify-center'
          >
            <svg
              className='flex-shrink-0 h-5 w-5 transform rotate-180'
              x-description='Heroicon name: solid/chevron-down'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
          <button
            disabled={orderId === lastId}
            onClick={() => goDownField(orderId)}
            className='disabled:cursor-not-allowed disabled:opacity-50 p-2 rounded-full text-indigo-700 border-cyan-700 border-2 hover:bg-cyan-700 hover:text-white transition duration-500 ease-in-out flex items-center justify-center'
          >
            <svg
              className='flex-shrink-0 h-5 w-5'
              x-description='Heroicon name: solid/chevron-down'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {edit && <RenderSwitch data={data} />}
      <br />
    </>
  )
}

export default Wrapper
