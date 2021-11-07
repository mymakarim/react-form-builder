import React, { useContext } from 'react'
import { FormContext } from '../../FormContext'

const Select = ({ changeContent }) => {
  const { addNewfield } = useContext(FormContext)

  const addItem = () => {
    addNewfield({
      field_id: 'employment',
      field_label: '@mymakarim select field',
      field_value: 'Part-Time',
      field_mandatory: 'yes',
      field_options: [
        {
          option_label: 'Full-Time'
        },
        {
          option_label: 'Part-Time'
        }
      ],
      field_type: 'select'
    })
    changeContent(null)
  }
  return (
    <section aria-labelledby='products-heading' className='p-4 sm:p-6 lg:p-8'>
      <h3 className='text-xl font-bold mb-3 border-b'>Add new Select Field</h3>
      <button
        onClick={() => addItem()}
        className='uppercase font-semibold text-white cursor-pointer bg-red-600 ring-2 ring-indigo-500 px-4 py-2 rounded-sm'
      >
        Submit
      </button>
    </section>
  )
}

export default Select
