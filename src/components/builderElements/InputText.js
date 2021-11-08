import React, { useState, useContext } from 'react'
import { FormContext } from '../../FormContext'
import slugify from './../helper/slugify'
const InputText = ({ changeContent }) => {
  const { addNewfield } = useContext(FormContext)

  const [label, setLabel] = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const [required, setRequired] = useState(false)
  const [type, setType] = useState('text')
  const [numbermin, setNumbermin] = useState(null)
  const [numbermax, setNumbermax] = useState(null)
  const [readonly, setReadonly] = useState(false)
  const [step, setStep] = useState(null)
  const [maxlength, setMaxlength] = useState(null)
  const [pattern, setPattern] = useState(null)
  const [footnote, setFootnote] = useState(null)

  const addItem = (evt) => {
    evt.preventDefault()

    addNewfield({
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
      footnote: footnote
    })
    changeContent(null)
  }
  return (
    <section>
      <form onSubmit={addItem} className='text-sm'>
        <div className='grid grid-cols-12 gap-6 p-4 sm:p-6 md:p-12'>
          <div className='col-span-12 sm:col-span-6'>
            <label for='label' className='block text-sm font-medium text-gray-700'>
              Label & Title
            </label>
            <input
              type='text'
              name='label'
              onChange={(e) => setLabel(e.target.value)}
              className='p-2.5 mt-2 block w-full rounded-md border'
            />
          </div>
          <div className='col-span-12 sm:col-span-6'>
            <label for='placeholder' className='block text-sm font-medium text-gray-700'>
              Type
            </label>
            <select
              className='p-2.5 mt-2 block w-full rounded-md border'
              value={type}
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
          {(type === 'text' || type === 'email' || type === 'url' || type === 'tel') && (
            <div className='col-span-12 sm:col-span-6'>
              <label for='placeholder' className='block text-sm font-medium text-gray-700'>
                Placeholder
              </label>
              <input
                type='text'
                name='placeholder'
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
              <label for='pattern' className='block text-sm font-medium text-gray-700'>
                Pattern
              </label>
              <input
                type='text'
                name='pattern'
                onChange={(e) => setPattern(e.target.value)}
                className='p-2.5 mt-2 block w-full rounded-md border'
              />
            </div>
          )}
          <div className='col-span-12 sm:col-span-6'>
            <label for='footnote' className='block text-sm font-medium text-gray-700'>
              Footnote
            </label>
            <input
              type='text'
              name='footnote'
              onChange={(e) => setFootnote(e.target.value)}
              className='p-2.5 mt-2 block w-full rounded-md border'
            />
          </div>

          {type === 'text' && (
            <div className='col-span-3'>
              <label for='maxlength' className='block text-sm font-medium text-gray-700'>
                Maxlength
              </label>
              <input
                type='number'
                name='maxlength'
                onChange={(e) => setMaxlength(e.target.value)}
                className='p-2.5 mt-2 block w-full rounded-md border'
              />
            </div>
          )}

          {(type === 'number' || type === 'range') && (
            <div className='col-span-2'>
              <label for='min' className='block text-sm font-medium text-gray-700'>
                Min
              </label>
              <input
                type='number'
                name='min'
                onChange={(e) => setNumbermin(e.target.value)}
                className='p-2.5 mt-2 block w-full rounded-md border'
              />
            </div>
          )}
          {(type === 'number' || type === 'range') && (
            <div className='col-span-2'>
              <label for='max' className='block text-sm font-medium text-gray-700'>
                Max
              </label>
              <input
                type='number'
                name='max'
                onChange={(e) => setNumbermax(e.target.value)}
                className='p-2.5 mt-2 block w-full rounded-md border'
              />
            </div>
          )}
          {(type === 'number' || type === 'range') && (
            <div className='col-span-2'>
              <label for='step' className='block text-sm font-medium text-gray-700'>
                Step
              </label>
              <input
                type='number'
                name='step'
                onChange={(e) => setStep(e.target.value)}
                className='p-2.5 mt-2 block w-full rounded-md border'
              />
            </div>
          )}
        </div>
        <div className='grid grid-cols-12 gap-6 mb-12 px-4 sm:px-6 md:px-12'>
          <div className='col-span-2 flex items-end'>
            <div>
              <label for='comments' class='font-medium text-gray-700 flex gap-2 items-center'>
                <input
                  name='required'
                  type='checkbox'
                  onChange={(e) => setRequired(e.target.checked)}
                  class='focus:ring-cyan-500 h-4 w-4 text-cyan-500 border-gray-300 rounded'
                />
                {` `}Required
              </label>
            </div>
          </div>
          <div className='col-span-2 flex items-end'>
            <div>
              <label for='readonly' class='font-medium text-gray-700 flex gap-2 items-center'>
                <input
                  name='readonly'
                  type='checkbox'
                  onChange={(e) => setReadonly(e.target.checked)}
                  class='focus:ring-cyan-500 h-4 w-4 text-cyan-500 border-gray-300 rounded'
                />
                {` `}Readonly
              </label>
            </div>
          </div>
        </div>
        <div class='px-6 py-3 bg-gray-50 flex items-center justify-between sm:px-6'>
          <button
            type='button'
            onClick={() => changeContent(null)}
            class='py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
          >
            Back
          </button>
          <button
            type='submit'
            class='py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
          >
            Save
          </button>
        </div>
      </form>
    </section>
  )
}

export default InputText
