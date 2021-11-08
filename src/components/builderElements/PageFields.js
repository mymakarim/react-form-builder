import React, { useState, useContext } from 'react'
import { FormContext } from '../../FormContext'

const PageFields = ({ toggle, changeContent }) => {
  const { addNewpage, getElementslength } = useContext(FormContext)
  const [label, setLabel] = useState(null)
  const [placeholder, setPlaceholder] = useState(null)

  const lastId = getElementslength()

  console.log('LAST ID: ', lastId)

  const addItem = (evt) => {
    evt.preventDefault()

    addNewpage(lastId + 1, label, placeholder)
    changeContent(null)
    toggle()
  }
  return (
    <section>
      <form onSubmit={addItem} className='text-sm'>
        <div className='grid grid-cols-12 gap-6 p-4 sm:p-6 md:p-12'>
          <div className='col-span-12 sm:col-span-6'>
            <label htmlFor='label' className='block text-sm font-medium text-gray-700'>
              Page Label
            </label>
            <input
              type='text'
              name='label'
              required
              onChange={(e) => setLabel(e.target.value)}
              className='p-2.5 mt-2 block w-full rounded-md border'
            />
          </div>
          <div className='col-span-12 sm:col-span-6'>
            <label htmlFor='placeholder' className='block text-sm font-medium text-gray-700'>
              Short Description
            </label>
            <input
              type='text'
              name='placeholder'
              required
              onChange={(e) => setPlaceholder(e.target.value)}
              className='p-2.5 mt-2 block w-full rounded-md border'
            />
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
      </form>
    </section>
  )
}

export default PageFields
