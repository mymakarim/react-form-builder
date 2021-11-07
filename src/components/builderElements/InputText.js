import React, { useContext } from 'react'
import { FormContext } from '../../FormContext'

const InputText = ({ changeContent }) => {
  const { addNewfield } = useContext(FormContext)

  const addItem = () => {
    addNewfield({
      field_id: 'identitymymakarim',
      field_label: '@mymakarim',
      field_mandatory: 'yes',
      field_placeholder: 'e.g. 012 345 678',
      field_type: 'text'
    })
    changeContent(null)
  }
  return (
    <section aria-labelledby='products-heading' className='p-4 sm:p-6 lg:p-8'>
      <h3 className='text-xl font-bold mb-3 border-b'>Add new Text field</h3>
      <button
        onClick={() => addItem()}
        className='uppercase font-semibold text-white cursor-pointer bg-red-600 ring-2 ring-indigo-500 px-4 py-2 rounded-sm'
      >
        Submit
      </button>
    </section>
  )
}

export default InputText
