import React, { useState, useContext } from 'react'
import { FormContext } from './../contexts/FormContext'
import { IconContext } from './../contexts/IconContext'
import slugify from './../helper/slugify'
import Iconpicker2 from './../builderElements/IconPicker2'

const InputGeo = ({ changeContent, data = null }) => {
  const { addNewfield, updateField } = useContext(FormContext)

  const [label, setLabel] = useState(data ? data.label : '')
  const [footnote, setFootnote] = useState(data ? data.footnote : null)
  const [icon, setIcon] = useState(data ? data.icon : 'fas fa-address-book')

  const addItem = (evt) => {
    evt.preventDefault()
    const field = {
      id: slugify(label),
      label: label,
      footnote: footnote,
      type: 'geo',
      icon: icon
    }
    if (data) {
      updateField(data.id, field)
    } else {
      addNewfield(field)
      changeContent(null)
    }
  }
  function changeIcon(i) {
    setIcon(i)
  }
  return (
    <IconContext.Provider
      value={{
        changeIcon,
        data
      }}
    >
      <section>
        <form onSubmit={addItem} className='text-sm'>
          <div className='grid grid-cols-12 gap-6 p-4'>
            <div className='col-span-12 sm:col-span-6'>
              <label htmlFor='label' className='block text-sm font-medium text-gray-700'>
                Label & Title
              </label>
              <input
                required
                type='text'
                name='label'
                defaultValue={data && data.label}
                onChange={(e) => setLabel(e.target.value)}
                className='p-2.5 mt-2 block w-full rounded-md border'
              />
            </div>
            <Iconpicker2 />
            <div className='col-span-12 sm:col-span-6'>
              <label htmlFor='footnote' className='block text-sm font-medium text-gray-700'>
                Footnote
              </label>
              <input
                type='text'
                name='footnote'
                defaultValue={data && data.footnote}
                onChange={(e) => setFootnote(e.target.value)}
                className='p-2.5 mt-2 block w-full rounded-md border'
              />
            </div>
          </div>
          <div className='px-6 py-3 bg-gray-50 flex items-center justify-between sm:px-6'>
            {!data && (
              <button
                type='button'
                onClick={() => changeContent(null)}
                className='py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
              >
                Back
              </button>
            )}
            <button
              type='submit'
              className='py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </IconContext.Provider>
  )
}

export default InputGeo
