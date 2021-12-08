import React, { useState, useContext } from 'react'
import { FormContext } from './../contexts/FormContext'
import { IconContext } from './../contexts/IconContext'
import slugify from './../helper/slugify'
import Iconpicker2 from './../builderElements/IconPicker2'

const Checkbox = ({ changeContent, data = null }) => {
  const { addNewfield, updateField } = useContext(FormContext)
  const [label, setLabel] = useState(data ? data.label : null)
  const [placeholder, setPlaceholder] = useState(data ? data.placeholder : null)
  const [required, setRequired] = useState(data ? data.required : false)
  const [readonly, setReadonly] = useState(data ? data.readonly : false)
  const [options, setOptions] = useState(data ? data.options : null)
  const [icon, setIcon] = useState(data ? data.icon : 'fas fa-address-book')

  const addItem = (evt) => {
    evt.preventDefault()
    const field = {
      id: slugify(label),
      label: label,
      required: required,
      readonly: readonly,
      options: options,
      placeholder: placeholder,
      type: 'checkbox',
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
                Label
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
            <Iconpicker2 />
            <div className='col-span-12'>
              <label htmlFor='placeholder' className='block text-sm font-medium text-gray-700'>
                Short Description
              </label>
              <input
                type='text'
                name='placeholder'
                required
                defaultValue={data && data.placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                className='p-2.5 mt-2 block w-full rounded-md border'
              />
            </div>
            <div className='col-span-12'>
              <label htmlFor='options' className='block text-sm font-medium text-gray-700'>
                Options
              </label>
              <input
                type='text'
                name='options'
                required
                defaultValue={data && data.options}
                onChange={(e) => setOptions(e.target.value)}
                className='p-2.5 mt-2 block w-full rounded-md border'
              />
              <small className='text-xs text-gray-500'>Comma separted list</small>
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

export default Checkbox
