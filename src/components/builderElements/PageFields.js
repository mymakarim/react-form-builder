import React, { useContext } from 'react'
import { FormContext } from '../../FormContext'

const PageFields = ({ changeContent }) => {
  const { addNewpage } = useContext(FormContext)

  const addItem = () => {
    addNewpage({
      id: 3,
      page: {
        label: 'New Page',
        desc: 'Form Builder descripton'
      },
      fields: []
    })
    changeContent(null)
  }
  return (
    <section aria-labelledby='products-heading' className='p-4 sm:p-6 lg:p-8'>
      <h3 className='text-xl font-bold mb-3 border-b'>Add new Page</h3>
      <button
        onClick={() => addItem()}
        className='uppercase font-semibold text-white cursor-pointer bg-red-600 ring-2 ring-indigo-500 px-4 py-2 rounded-sm'
      >
        Submit
      </button>
    </section>
  )
}

export default PageFields
