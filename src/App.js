import formJSON from './formElement.json'
import { useState, useEffect } from 'react'
import Element from './components/Element'
import { FormContext } from './FormContext'
import React from 'react'
import AddSection from './components/AddSection'

function App() {
  const [elements, setElements] = useState(null)
  const [pagei, setPagei] = useState(0)

  useEffect(() => {
    setElements(formJSON)
  }, [pagei])

  useEffect(() => {
    console.log('ELEMENTS: ', elements)
  }, [elements])

  const handleSubmit = (event) => {
    event.preventDefault()
    // save file json
    // or POST it somewhere
    console.log(elements)
  }
  const handleChange = (id, event) => {
    const newElements = { ...elements }
    newElements[pagei].fields.forEach((field) => {
      const { field_type, field_id } = field
      if (id === field_id) {
        switch (field_type) {
          case 'checkbox':
            field['field_value'] = event.target.checked
            break

          default:
            field['field_value'] = event.target.value
            break
        }
      }
      setElements(newElements)
    })
    console.log(elements)
  }

  const addNewfield = (item) => {
    const newElements = [...elements]
    newElements[pagei].fields.push(item)
    setElements(newElements)
  }

  const FormPage = ({ fields }) => {
    return fields.length > 0 ? (
      <div className='mb-4 border-b'>
        {fields.map((field, i) => (
          <Element key={i} field={field} />
        ))}
      </div>
    ) : null
  }

  const PagesList = ({ elements }) => {
    console.log('ELEMENTS IN PAGES LIST: ', elements)
    return (
      <ul className='list-bordered-left'>
        {elements.map((element) => {
          return (
            <li
              key={element.id}
              onClick={() => setPagei(element.id - 1)}
              className={`cursor-pointer group relative flex items-center space-x-6 mb-9`}
            >
              <div
                className={`h-12 w-12 ${
                  element.id - 1 === pagei ? 'bg-indigo-600 text-white' : 'bg-indigo-300'
                } group-hover:bg-indigo-600 group-hover:text-white transition duration-200 ease-in-out flex-none rounded-lg flex items-center justify-center font-bold`}
              >
                {element.id}
              </div>
              <div
                className={`${
                  element.id - 1 === pagei ? 'opacity-100' : 'opacity-50'
                } group-hover:opacity-100 `}
              >
                <h5 className='font-semibold mb-1'>{element.page.label}</h5>
                <p className='text-xs font-semibold text-gray-400'>{element.page.desc}</p>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <FormContext.Provider value={{ handleChange, addNewfield }}>
      <div className='grid grid-cols-12'>
        <div className='hidden md:inline-block md:col-span-3 bg-gray-100 min-h-screen border-r-4 p-16'>
          <h2 className='font-black text-2xl mb-12' alt='logo'>
            Componentity
          </h2>
          {elements && <PagesList elements={elements} />}
        </div>
        <div className='col-span-12 md:col-span-9 p-5 sm:p-8 md:p-16'>
          <form>
            {elements && <FormPage fields={elements[pagei].fields} />}
            <button
              type='submit'
              className='hidden btn btn-primary'
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          </form>
          <AddSection className='my-4' />
        </div>
      </div>
    </FormContext.Provider>
  )
}

export default App
