import formJSON from './formElement.json'
import { useState, useEffect } from 'react'
import Element from './components/Element'
import { FormContext } from './FormContext'
import React from 'react'
import AddSection from './components/AddSection'

function App() {
  const [elements, setElements] = useState(formJSON)
  const [pagei, setPagei] = useState(0)
  const [toggle, setToggle] = useState(false)

  const saveJSON = async (content) => {
    // save json into the file here
  }

  useEffect(() => {
    console.log('JSON TO BE SAVED: ', elements)
    // save the json file
    saveJSON(elements).then((e) => {
      console.log('E: ', e)
    })
  }, [elements])

  const handleSubmit = (event) => {
    event.preventDefault()
    // save file json
    // or POST it somewhere
    console.log(elements)
  }
  const handleChange = (id, event) => {
    // const newElements = { ...elements }
    // newElements[pagei].fields.forEach((field) => {
    //   const { field_type, field_id } = field
    //   if (id === field_id) {
    //     switch (field_type) {
    //       case 'checkbox':
    //         field['field_value'] = event.target.checked
    //         break

    //       default:
    //         field['field_value'] = event.target.value
    //         break
    //     }
    //   }
    //   setElements(newElements)
    // })
    console.log(elements)
  }

  const addNewfield = (item) => {
    const newElements = [...elements]
    newElements[pagei].fields.push(item)
    setElements(newElements)
  }

  const addNewpage = (id, label, desc) => {
    const newElements = [...elements]
    newElements.push({
      id: id,
      page: {
        label: label,
        desc: desc
      },
      fields: []
    })
    setElements(newElements)
  }

  const FormPage = ({ fields }) => {
    return fields.length > 0 ? (
      <div className='my-16'>
        {fields.map((field, i) => (
          <Element key={i} field={field} />
        ))}
      </div>
    ) : null
  }

  const addPageform = (evt) => {
    evt.preventDefault()
    const id = getElementslength() + 1
    const label = evt.target.page_label.value.trim()
    const desc = evt.target.page_desc.value.trim()
    if (label !== '' && desc !== '') {
      addNewpage(id, label, desc)
    }
    setToggle(!toggle)
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
                  element.id - 1 === pagei ? 'bg-cyan-500 text-white' : 'bg-cyan-200 text-cyan-600'
                } group-hover:bg-cyan-500 group-hover:text-white transition duration-200 ease-in-out flex-none rounded-xl flex items-center justify-center font-bold`}
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
        <li key={elements.length + 1} className={`relative flex items-start space-x-6 mb-9`}>
          <div
            onClick={() => setToggle(!toggle)}
            className={`h-12 w-12 cursor-pointer bg-gray-900 text-white transition duration-200 ease-in-out flex-none rounded-lg flex items-center justify-center font-bold`}
          >
            +
          </div>
          {toggle && (
            <form onSubmit={addPageform} className='flex flex-col gap-1 items-end'>
              <input
                type='text'
                placeholder='label'
                name='page_label'
                required
                className='px-2 py-1 text-xs border'
                id='page_label'
              />
              <input
                type='text'
                placeholder='desc'
                name='page_desc'
                required
                className='px-2 py-1 text-xs w-full border'
                id='page_desc'
              />
              <input
                className='text-xs font-semibold bg-gray-300 px-2 py-1'
                type='submit'
                value='Add Page'
              />
            </form>
          )}
        </li>
      </ul>
    )
  }

  const getElementslength = () => {
    return elements.length
  }

  return (
    <FormContext.Provider value={{ handleChange, addNewfield, addNewpage, getElementslength }}>
      <div className='grid grid-cols-12'>
        <div className='hidden md:inline-block md:col-span-3 bg-gray-100 min-h-screen border-r-4 p-16'>
          <h2 className='font-black text-2xl mb-12' alt='logo'>
            Form Builder
          </h2>
          {elements && <PagesList elements={elements} />}
        </div>
        <div className='col-span-12 md:col-span-9 p-5 sm:p-8 md:p-16'>
          <form>
            {elements && elements[pagei] && <FormPage fields={elements[pagei].fields} />}
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
