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
  const { deleteField, duplicateField, goUpField } = useContext(FormContext)
  const [edit, setEdit] = useState(false)

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
            className='px-3 py-2 font-semibold text-white rounded-md bg-indigo-600 hover:bg-indigo-700  flex items-center justify-between gap-1'
          >
            <svg
              className='h-5 w-5 stroke-current'
              aria-hidden='true'
              viewBox='0 0 32 32'
              fill='none'
            >
              <path
                d='M12.9975 10.7499L11.7475 10.7499C10.6429 10.7499 9.74747 11.6453 9.74747 12.7499L9.74747 21.2499C9.74747 22.3544 10.6429 23.2499 11.7475 23.2499L20.2475 23.2499C21.352 23.2499 22.2475 22.3544 22.2475 21.2499L22.2475 12.7499C22.2475 11.6453 21.352 10.7499 20.2475 10.7499L18.9975 10.7499'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
              <path
                d='M17.9975 12.2499L13.9975 12.2499C13.4452 12.2499 12.9975 11.8022 12.9975 11.2499L12.9975 9.74988C12.9975 9.19759 13.4452 8.74988 13.9975 8.74988L17.9975 8.74988C18.5498 8.74988 18.9975 9.19759 18.9975 9.74988L18.9975 11.2499C18.9975 11.8022 18.5498 12.2499 17.9975 12.2499Z'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
              <path
                d='M13.7475 16.2499L18.2475 16.2499'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
              <path
                d='M13.7475 19.2499L18.2475 19.2499'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
              <g className='transition-opacity'>
                <path
                  d='M15.9975 5.99988L15.9975 3.99988'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
                <path
                  d='M19.9975 5.99988L20.9975 4.99988'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
                <path
                  d='M11.9975 5.99988L10.9975 4.99988'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
              </g>
            </svg>
            <span>Duplicate</span>
          </button>
          <button
            onClick={() => setEdit(!edit)}
            className='px-3 py-2 font-semibold text-white rounded-md bg-cyan-500 hover:bg-cyan-700  flex items-center justify-between gap-1'
          >
            <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
              <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path>
            </svg>
            <span>Edit</span>
          </button>
          <button
            onClick={() => deleteField(id)}
            className='px-3 py-2  font-semibold text-white rounded-md bg-red-600 hover:bg-red-700  flex items-center justify-between gap-1'
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
            <span>Delete</span>
          </button>
          <button
            onClick={() => goUpField(orderId)}
            className='px-3 py-2 font-semibold text-white rounded-md bg-cyan-500 hover:bg-cyan-700  flex items-center justify-between gap-1'
          >
            <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
              <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path>
            </svg>
            <span>UP</span>
          </button>
        </div>
      </div>
      {edit && <RenderSwitch data={data} />}
      <br />
    </>
  )
}

export default Wrapper
