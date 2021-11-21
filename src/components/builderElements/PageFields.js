import React, { useState, useContext } from 'react'
import { FormContext } from '../../FormContext'

const PageFields = ({ changeContent, data }) => {
  const { addNewpage, getElementslength, updatePage } = useContext(FormContext)
  const [label, setLabel] = useState(data ? data.label : null)
  const [placeholder, setPlaceholder] = useState(data ? data.placeholder : null)
  const [placement, setPlacement] = useState(data ? data.placement : 'center center')
  const [opacity, setOpacity] = useState(data ? data.opacity : 1)
  const [bgimage, setBgimage] = useState(data ? data.bgimage : null)

  const lastId = getElementslength()
  console.log('LAST ID: ', lastId)

  const addItem = (evt) => {
    evt.preventDefault()
    if (data) {
      updatePage(data.id, {
        label: label,
        placeholder: placeholder,
        bgimage: bgimage,
        opacity: opacity,
        placement: placement
      })
    } else {
      addNewpage(lastId + 1, label, placeholder, bgimage, opacity, placement)
      changeContent(null)
    }
  }
  return (
    <section>
      <form onSubmit={addItem} className='text-sm'>
        <div className='grid grid-cols-12 gap-6 p-4'>
          <div className='col-span-12 sm:col-span-6'>
            <label htmlFor='label' className='block text-sm font-medium text-gray-700'>
              Page Label
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
          <div className='col-span-12 sm:col-span-6'>
            <label htmlFor='bgimage' className='block text-sm font-medium text-gray-700'>
              Background Image
            </label>
            <input
              type='url'
              name='bgimage'
              defaultValue={data && data.bgimage}
              onChange={(e) => setBgimage(e.target.value)}
              className='p-2.5 mt-2 block w-full rounded-md border'
            />
          </div>
          <div className='col-span-12 sm:col-span-6 md:col-span-3'>
            <label htmlFor='opacity' className='block text-sm font-medium text-gray-700'>
              Opacity
            </label>
            <input
              type='number'
              name='opacity'
              defaultValue={data && data.opacity}
              onChange={(e) => setOpacity(e.target.value)}
              className='p-2.5 mt-2 block w-full rounded-md border'
            />
          </div>
          <div className='col-span-12 sm:col-span-6 md:col-span-3'>
            <label htmlFor='placement' className='block text-sm font-medium text-gray-700'>
              Placement
            </label>
            <select
              required
              className='p-2.5 mt-2 block w-full rounded-md border'
              defaultValue={data && data.placement}
              onChange={(e) => setPlacement(e.target.value)}
            >
              <option value='center center'>Center Center</option>
              <option value='top center'>Top Center</option>
              <option value='bottom center'>Bottom Center</option>
              <option value='top right'>Top Right</option>
              <option value='top left'>Top Left</option>
              <option value='bottom right'>Bottom Right</option>
              <option value='bottom left'>Bottom Left</option>
            </select>
          </div>
        </div>
        <div className='px-6 py-3 bg-gray-50 flex items-center justify-end sm:px-6'>
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
