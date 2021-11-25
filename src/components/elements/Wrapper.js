import React, { useContext, useState } from 'react'
import { FormContext } from './../contexts/FormContext'

import InputText from './../builderElements/InputText.js'
import Checkbox from './../builderElements/Checkbox.js'
import Radiobutton from './../builderElements/Radiobutton.js'
import Select from './../builderElements/Select.js'
import Description from './../builderElements/Description.js'
import Heading from './../builderElements/Heading.js'
import Textarea from './../builderElements/Textarea.js'
import InputGeo from './../builderElements/InputGeo.js'

const Wrapper = ({ children, id, orderId, data, content }) => {
  const { deleteField, duplicateField, goUpField, goDownField, getFieldslength, preview } =
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
      case 'geo':
        return <InputGeo data={data} />
      default:
        return <InputText data={data} />
    }
  }

  return (
    <>
      <div className='relative group'>
        {children}
        {!preview && (
          <div className='hidden group-hover:flex absolute top-0 right-0 mr-3 bottom-0 flex items-center gap-2'>
            <button
              onClick={() => duplicateField(id)}
              className='h-9 w-9 text-white rounded-full bg-indigo-600 hover:bg-indigo-700 border-2 border-indigo-700 flex items-center justify-center'
            >
              <i className='far fa-copy'></i>
            </button>
            <button
              onClick={() => setEdit(!edit)}
              className='h-9 w-9 text-white rounded-full bg-cyan-500 hover:bg-cyan-700 border-2 border-cyan-700 flex items-center justify-center'
            >
              <i className='fas fa-pencil-alt'></i>
            </button>
            <button
              onClick={() => deleteField(id)}
              className='h-9 w-9 text-white rounded-full bg-red-600 hover:bg-red-700 border-2 border-red-700 flex items-center justify-center'
            >
              <i className='far fa-trash-alt'></i>
            </button>
            <button
              disabled={orderId === 1}
              onClick={() => goUpField(orderId)}
              className='disabled:cursor-not-allowed disabled:opacity-50 h-9 w-9 rounded-full text-indigo-700 border-cyan-700 border-2 hover:bg-cyan-700 hover:text-white transition duration-500 ease-in-out flex items-center justify-center'
            >
              <i className='fas fa-caret-up'></i>
            </button>
            <button
              disabled={orderId === lastId}
              onClick={() => goDownField(orderId)}
              className='disabled:cursor-not-allowed disabled:opacity-50 h-9 w-9 rounded-full text-indigo-700 border-cyan-700 border-2 hover:bg-cyan-700 hover:text-white transition duration-500 ease-in-out flex items-center justify-center'
            >
              <i className='fas fa-caret-down'></i>
            </button>
          </div>
        )}
      </div>
      {edit && <RenderSwitch data={data} />}
      <br />
    </>
  )
}

export default Wrapper
