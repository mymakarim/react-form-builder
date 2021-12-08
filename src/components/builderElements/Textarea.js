import React, { useState, useContext } from 'react'
import { FormContext } from './../contexts/FormContext'
import { IconContext } from './../contexts/IconContext'
import slugify from './../helper/slugify'
import Iconpicker2 from './../builderElements/IconPicker2'

const Textarea = ({ changeContent, data = null }) => {
  const { addNewfield, updateField } = useContext(FormContext)

  const [label, setLabel] = useState(data ? data.label : '')
  const [placeholder, setPlaceholder] = useState(data ? data.placeholder : '')
  const [required, setRequired] = useState(data ? data.required : false)
  const [readonly, setReadonly] = useState(data ? data.readonly : false)
  const [maxlength, setMaxlength] = useState(data ? data.maxlength : null)
  const [footnote, setFootnote] = useState(data ? data.footnote : null)
  const [rows, setRows] = useState(data ? data.rows : 5)
  const [icon, setIcon] = useState(data ? data.icon : 'fas fa-address-book')

  const addItem = (evt) => {
    evt.preventDefault()
    const field = {
      id: slugify(label),
      label: label,
      required: required,
      placeholder: placeholder,
      maxlength: maxlength,
      footnote: footnote,
      readonly: readonly,
      rows: rows,
      type: 'textarea',
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
                type='text'
                name='label'
                required
                defaultValue={data && data.label}
                onChange={(e) => setLabel(e.target.value)}
                className='p-2.5 mt-2 block w-full rounded-md border'
              />
            </div>

            <div className='col-span-12 sm:col-span-6'>
              <label htmlFor='placeholder' className='block text-sm font-medium text-gray-700'>
                Placeholder
              </label>
              <input
                type='text'
                name='placeholder'
                defaultValue={data && data.placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                className='p-2.5 mt-2 block w-full rounded-md border'
              />
            </div>
            <Iconpicker2 />

            <div className='col-span-6 md:col-span-3'>
              <label htmlFor='maxlength' className='block text-sm font-medium text-gray-700'>
                Maxlength
              </label>
              <input
                type='number'
                name='maxlength'
                defaultValue={data && data.maxlength}
                onChange={(e) => setMaxlength(e.target.value)}
                className='p-2.5 mt-2 block w-full rounded-md border'
              />
            </div>
            <div className='col-span-6 md:col-span-3'>
              <label htmlFor='rows' className='block text-sm font-medium text-gray-700'>
                No. of rows
              </label>
              <input
                type='number'
                name='rows'
                defaultValue={data && data.rows}
                onChange={(e) => setRows(e.target.value)}
                className='p-2.5 mt-2 block w-full rounded-md border'
              />
            </div>
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
          <div className='grid grid-cols-12 gap-6 mb-6 px-4'>
            <div className='col-span-12 sm:col-span-2 flex items-end'>
              <div>
                <label
                  htmlFor='required'
                  className='font-medium text-gray-700 flex gap-2 items-center'
                >
                  <input
                    name='required'
                    type='checkbox'
                    id='required'
                    defaultChecked={data && data.required}
                    onChange={(e) => setRequired(e.target.checked)}
                    className='focus:ring-cyan-500 h-4 w-4 text-cyan-500 border-gray-300 rounded'
                  />
                  {` `}Required
                </label>
              </div>
            </div>
            <div className='col-span-12 sm:col-span-3 flex items-end'>
              <div>
                <label
                  htmlFor='readonly'
                  className='font-medium text-gray-700 flex gap-2 items-center'
                >
                  <input
                    name='readonly'
                    type='checkbox'
                    id='readonly'
                    defaultChecked={data && data.readonly}
                    onChange={(e) => setReadonly(e.target.checked)}
                    className='focus:ring-cyan-500 h-4 w-4 text-cyan-500 border-gray-300 rounded'
                  />
                  {` `}readonly & disabled
                </label>
              </div>
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

export default Textarea
