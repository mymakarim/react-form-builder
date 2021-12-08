import React, { useState, useContext } from 'react'
import { FormContext } from './../contexts/FormContext'
import { IconContext } from './../contexts/IconContext'
import slugify from './../helper/slugify'
import Iconpicker2 from './../builderElements/IconPicker2'

const InputFile = ({ changeContent, data = null }) => {
  const { addNewfield, updateField } = useContext(FormContext)

  const [label, setLabel] = useState(data ? data.label : '')
  const [required, setRequired] = useState(data ? data.required : false)
  const [multiple, setMultiple] = useState(data ? data.multiple : false)
  const [footnote, setFootnote] = useState(data ? data.footnote : null)
  const [accept, setAccept] = useState(data ? data.accept : null)
  const [maxFilesize, setMaxFilesize] = useState(data ? data.maxFilesize : 2)
  const [maxFiles, setMaxFiles] = useState(data ? data.maxFiles : 1)
  const [icon, setIcon] = useState(data ? data.icon : 'fas fa-address-book')

  const addItem = (evt) => {
    evt.preventDefault()
    const field = {
      id: slugify(label),
      label: label,
      required: required,
      type: 'file',
      footnote: footnote,
      multiple: multiple,
      accept: accept,
      maxFilesize: maxFilesize,
      maxFiles: maxFiles,
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
  function changeAccept(e) {
    var options = e.target.options
    var value = []
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value)
      }
    }
    setAccept(value)
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
            <Iconpicker2 />
            <div className='col-span-6 sm:col-span-3'>
              <label htmlFor='maxFilesize' className='block text-sm font-medium text-gray-700'>
                Max File Size
              </label>
              <input
                required
                type='number'
                name='maxFilesize'
                defaultValue={maxFilesize}
                onChange={(e) => setMaxFilesize(e.target.value)}
                className='p-2.5 mt-2 block w-full rounded-md border'
              />
              <small className='text-xs text-gray-500'>In Megabytes</small>
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <label htmlFor='maxFiles' className='block text-sm font-medium text-gray-700'>
                maxFiles
              </label>
              <input
                required
                type='number'
                name='maxFiles'
                defaultValue={maxFiles}
                onChange={(e) => setMaxFiles(e.target.value)}
                className='p-2.5 mt-2 block w-full rounded-md border'
              />
              <small className='text-xs text-gray-500'>How many file max</small>
            </div>

            <div className='col-span-12 sm:col-span-6'>
              <label htmlFor='accept' className='block text-sm font-medium text-gray-700'>
                accept
              </label>
              <select
                className='p-2.5 mt-2 block w-full rounded-md border'
                name='accept'
                multiple
                required
                defaultValue={data && data.accept}
                onChange={(e) => changeAccept(e)}
              >
                <option value='image/*'>image/*</option>
                <option value='.jpg'>JPG</option>
                <option value='.png'>PNG</option>
                <option value='.jpeg'>JPEG</option>
                <option value='audio/*'>audio/*</option>
                <option value='video/*'>video/*</option>
                <option value='video/*'>video/*</option>
                <option value='.pdf'>PDF</option>
                <option value='.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'>
                  DOC
                </option>
              </select>
              <small className='text-xs text-gray-500'>Hold CTRL/CMD to select multiple</small>
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
            <div className='col-span-12 sm:col-span-2 flex items-end'>
              <div>
                <label
                  htmlFor='multiple'
                  className='font-medium text-gray-700 flex gap-2 items-center'
                >
                  <input
                    name='multiple'
                    type='checkbox'
                    id='multiple'
                    defaultChecked={data && data.multiple}
                    onChange={(e) => setMultiple(e.target.checked)}
                    className='focus:ring-cyan-500 h-4 w-4 text-cyan-500 border-gray-300 rounded'
                  />
                  {` `}Multiple
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

export default InputFile
