import React, { useContext } from 'react'
import { FormContext } from '../../FormContext'

const Checkbox = ({ changeContent }) => {
  const { addNewfield } = useContext(FormContext)

  const addItem = () => {
    addNewfield({
      field_id: 'driving_license',
      field_label: '@mymakarim checkbox',
      field_type: 'checkbox',
      field_value: 'checked'
    })
    changeContent(null)
  }
  return (
    <section aria-labelledby='products-heading' className='p-4 sm:p-6 lg:p-8'>
      <h3 className='text-xl font-bold mb-3 border-b'>Add new Checkbox</h3>
      <button
        onClick={() => addItem()}
        className='uppercase font-semibold text-white cursor-pointer bg-red-600 ring-2 ring-indigo-500 px-4 py-2 rounded-sm'
      >
        Submit
      </button>
    </section>
  )
}

export default Checkbox
