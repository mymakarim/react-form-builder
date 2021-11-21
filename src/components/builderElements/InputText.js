import React, { useState, useContext } from 'react'
import { FormContext } from '../../FormContext'
import slugify from './../helper/slugify'
const InputText = ({ changeContent, data = null }) => {
  const { addNewfield, updateField } = useContext(FormContext)

  const [label, setLabel] = useState(data ? data.readonly : '')
  const [placeholder, setPlaceholder] = useState(data ? data.readonly : '')
  const [required, setRequired] = useState(data ? data.readonly : false)
  const [type, setType] = useState(data ? data.readonly : 'text')
  const [numbermin, setNumbermin] = useState(data ? data.readonly : null)
  const [numbermax, setNumbermax] = useState(data ? data.readonly : null)
  const [readOnly, setReadonly] = useState(data ? data.readonly : false)
  const [multiple, setMultiple] = useState(data ? data.readonly : false)
  const [step, setStep] = useState(data ? data.readonly : null)
  const [maxlength, setMaxlength] = useState(data ? data.readonly : null)
  const [pattern, setPattern] = useState(data ? data.readonly : null)
  const [footnote, setFootnote] = useState(data ? data.readonly : null)
  const [accept, setAccept] = useState(data ? data.readonly : null)

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
      readOnly: readOnly,
      step: step,
      maxlength: maxlength,
      pattern: pattern,
      footnote: footnote,
      multiple: multiple,
      accept: accept
    }
    if (data) {
      updateField(data.id, field)
    } else {
      addNewfield(field)
      changeContent(null)
    }
  }
  return (
    <section>
      <form onSubmit={addItem} className='text-sm'>
        <div className='grid grid-cols-12 gap-6 p-4'>
          <div className='col-span-12 sm:col-span-6'>
            <label htmlFor='placeholder' className='block text-sm font-medium text-gray-700'>
              Type
            </label>
            <select
              required
              className='p-2.5 mt-2 block w-full rounded-md border'
              value={type}
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
            <div className='col-span-12 sm:col-span-6'>
              <label htmlFor='accept' className='block text-sm font-medium text-gray-700'>
                accept
              </label>
              <input
                type='text'
                name='accept'
                required
                defaultValue={data && data.accept}
                onChange={(e) => setAccept(e.target.value)}
                className='p-2.5 mt-2 block w-full rounded-md border'
              />
              <small className='text-xs text-gray-500'>Comma separted list</small>
            </div>
          )}
        </div>
        <div className='grid grid-cols-12 gap-6 mb-6 px-4'>
          <div className='col-span-12 sm:col-span-2 flex items-end'>
            <div>
              <label
                htmlFor='comments'
                className='font-medium text-gray-700 flex gap-2 items-center'
              >
                <input
                  name='required'
                  type='checkbox'
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
                htmlFor='readonly'
                className='font-medium text-gray-700 flex gap-2 items-center'
              >
                <input
                  name='readonly'
                  type='checkbox'
                  defaultChecked={data && data.readonly}
                  onChange={(e) => setReadonly(e.target.checked)}
                  className='focus:ring-cyan-500 h-4 w-4 text-cyan-500 border-gray-300 rounded'
                />
                {` `}readonly
              </label>
            </div>
          </div>
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
  )
}

export default InputText
