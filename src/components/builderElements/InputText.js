import React, { useState, useContext } from 'react'
import { FormContext } from './../contexts/FormContext'
import { IconContext } from './../contexts/IconContext'
import slugify from './../helper/slugify'
import Iconpicker2 from './../builderElements/IconPicker2'

const InputText = ({ changeContent, data = null }) => {
  const { addNewfield, updateField } = useContext(FormContext)

  const [label, setLabel] = useState(data ? data.label : '')
  const [placeholder, setPlaceholder] = useState(data ? data.placeholder : '')
  const [required, setRequired] = useState(data ? data.required : false)
  const [type, setType] = useState(data ? data.type : 'text')
  const [numbermin, setNumbermin] = useState(data ? data.numbermin : null)
  const [numbermax, setNumbermax] = useState(data ? data.numbermax : null)
  const [readonly, setReadonly] = useState(data ? data.readonly : false)
  const [multiple, setMultiple] = useState(data ? data.multiple : false)
  const [step, setStep] = useState(data ? data.step : null)
  const [maxlength, setMaxlength] = useState(data ? data.maxlength : null)
  const [pattern, setPattern] = useState(data ? data.pattern : null)
  const [footnote, setFootnote] = useState(data ? data.footnote : null)
  const [accept, setAccept] = useState(data ? data.accept : null)
  const [maxFilesize, setMaxFilesize] = useState(data ? data.maxFilesize : null)
  const [maxFiles, setMaxFiles] = useState(data ? data.maxFiles : null)

  const [icon, setIcon] = useState(data ? data.icon : 'fas fa-address-book')

  const addItem = (evt) => {
    evt.preventDefault()
    const field = {
      id: slugify(label),
      label: label,
      required: required,
      placeholder: placeholder,
      type: type,
      numbermin: numbermin,
      numbermax: numbermax,
      readonly: readonly,
      step: step,
      maxlength: maxlength,
      pattern: pattern,
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
            {(!data || (data && data.type !== 'file')) && (
              <div className='col-span-12 sm:col-span-6'>
                <label htmlFor='placeholder' className='block text-sm font-medium text-gray-700'>
                  Type
                </label>
                <select
                  required
                  className='p-2.5 mt-2 block w-full rounded-md border'
                  defaultValue={data && data.type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value='text'>Text</option>
                  <option value='email'>Email</option>
                  <option value='tel'>Tel</option>
                  <option value='color'>Color</option>
                  <option value='date'>Date</option>
                  <option value='time'>Time</option>
                  <option value='datetime-local'>Datetime Local</option>
                  <option value='month'>Month</option>
                  <option value='week'>Week</option>
                  <option value='number'>Number</option>
                  <option value='file'>File</option>
                  <option value='url'>URL</option>
                  <option value='range'>Range</option>
                </select>
              </div>
            )}
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

            {(type === 'text' || type === 'email' || type === 'url' || type === 'tel') && (
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
            )}
            <Iconpicker2 />
            {(type === 'text' ||
              type === 'email' ||
              type === 'url' ||
              type === 'tel' ||
              type === 'number') && (
              <div className='col-span-12 sm:col-span-6'>
                <label htmlFor='pattern' className='block text-sm font-medium text-gray-700'>
                  Pattern
                </label>
                <input
                  type='text'
                  name='pattern'
                  defaultValue={data && data.pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  className='p-2.5 mt-2 block w-full rounded-md border'
                />
              </div>
            )}
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

            {type === 'text' && (
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
            )}

            {(type === 'number' || type === 'range') && (
              <div className='col-span-6 md:col-span-2'>
                <label htmlFor='min' className='block text-sm font-medium text-gray-700'>
                  Min
                </label>
                <input
                  type='number'
                  name='min'
                  defaultValue={data && data.min}
                  onChange={(e) => setNumbermin(e.target.value)}
                  className='p-2.5 mt-2 block w-full rounded-md border'
                />
              </div>
            )}
            {(type === 'number' || type === 'range') && (
              <div className='col-span-6 md:col-span-2'>
                <label htmlFor='max' className='block text-sm font-medium text-gray-700'>
                  Max
                </label>
                <input
                  type='number'
                  name='max'
                  defaultValue={data && data.max}
                  onChange={(e) => setNumbermax(e.target.value)}
                  className='p-2.5 mt-2 block w-full rounded-md border'
                />
              </div>
            )}
            {(type === 'number' || type === 'range') && (
              <div className='col-span-6 md:col-span-2'>
                <label htmlFor='step' className='block text-sm font-medium text-gray-700'>
                  Step
                </label>
                <input
                  type='number'
                  name='step'
                  defaultValue={data && data.step}
                  onChange={(e) => setStep(e.target.value)}
                  className='p-2.5 mt-2 block w-full rounded-md border'
                />
              </div>
            )}
            {type === 'file' && (
              <>
                <div className='col-span-12 sm:col-span-6'>
                  <label htmlFor='accept' className='block text-sm font-medium text-gray-700'>
                    accept
                  </label>
                  <select
                    className='p-2.5 mt-2 block w-full rounded-md border'
                    name='accept'
                    multiple
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
                <div className='col-span-6 sm:col-span-3'>
                  <label htmlFor='maxFilesize' className='block text-sm font-medium text-gray-700'>
                    Max File Size
                  </label>
                  <input
                    type='number'
                    name='maxFilesize'
                    defaultValue={data ? data.maxFilesize : 2}
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
                    type='number'
                    name='maxFiles'
                    defaultValue={data ? data.maxFiles : 1}
                    onChange={(e) => setMaxFiles(e.target.value)}
                    className='p-2.5 mt-2 block w-full rounded-md border'
                  />
                  <small className='text-xs text-gray-500'>How many file max</small>
                </div>
              </>
            )}
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
            {type !== 'file' && (
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
            )}
            {(type === 'file' || type === 'email') && (
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
            )}
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

export default InputText
