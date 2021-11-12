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
  const [editid, setEditid] = useState(null)

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

  const duplicateField = (id) => {
    let item
    const newElements = [...elements]
    for (var i = 0; i < newElements.length; i++) {
      if (newElements[i].id === pagei + 1) {
        // console.log('PAGE FOUND: ', pagei + 1)
        for (var x = 0; x < newElements[i].fields.length; x++) {
          if (newElements[i].fields[x].id === id) {
            // console.log('DELTE FIELD ID: ', id)
            let newItem = Object.assign({}, newElements[i].fields[x])

            newItem.id = (Math.random() + 1).toString(36).substring(7)
            item = newItem
          }
        }
      }
    }
    newElements[pagei].fields.push(item)
    setElements(newElements)
  }

  const updateField = (id, edits) => {
    const newElements = [...elements]
    for (var i = 0; i < newElements.length; i++) {
      if (newElements[i].id === pagei + 1) {
        // console.log('PAGE FOUND: ', pagei + 1)
        for (var x = 0; x < newElements[i].fields.length; x++) {
          if (newElements[i].fields[x].id === id) {
            // console.log('DELTE FIELD ID: ', id)
            newElements[i].fields[x] = edits
          }
        }
      }
    }
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

  function updatePage(evt) {
    evt.preventDefault()
    const label = evt.target.page_label.value.trim()
    const desc = evt.target.page_desc.value.trim()
    const newElements = [...elements]
    if (label !== '' && desc !== '') {
      for (var i = 0; i < newElements.length; i++) {
        if (newElements[i].id === editid) {
          newElements[i].page = {
            label: label,
            desc: desc
          }
        }
      }
    }
    console.log('BEFORE SET ELEMENTS')
    setElements(newElements)
    setEditid(null)
  }

  function deletePage(id) {
    const newElements = [...elements]
    for (var i = 0; i < newElements.length; i++) {
      if (newElements[i].id === id) {
        console.log('DELETE')
        newElements.splice(i, 1)
      }
    }
    console.log('BEFORE DELETE PAGE')
    setElements(newElements)
  }

  function deleteField(id) {
    const newElements = [...elements]
    for (var i = 0; i < newElements.length; i++) {
      if (newElements[i].id === pagei + 1) {
        // console.log('PAGE FOUND: ', pagei + 1)
        for (var x = 0; x < newElements[i].fields.length; x++) {
          if (newElements[i].fields[x].id === id) {
            // console.log('DELTE FIELD ID: ', id)
            newElements[i].fields.splice(x, 1)
          }
        }
      }
    }
    // console.log('BEFORE DELETE FIELDS')
    setElements(newElements)
  }

  const PagesList = ({ elements }) => {
    console.log('ELEMENTS IN PAGES LIST: ', elements)
    return (
      <ul className='list-bordered-left'>
        {elements.map((element) => {
          return (
            <li key={element.id} className={`group relative flex items-center space-x-6 mb-9`}>
              <div
                onClick={() => setPagei(element.id - 1)}
                className={`h-12 w-12 ${
                  element.id - 1 === pagei ? 'bg-cyan-500 text-white' : 'bg-cyan-200 text-cyan-600'
                } cursor-pointer group-hover:bg-cyan-500 group-hover:text-white transition duration-200 ease-in-out flex-none rounded-xl flex items-center justify-center font-bold`}
              >
                {element.id}
              </div>
              {editid === element.id ? (
                <form onSubmit={updatePage} className='flex flex-col gap-1 items-end'>
                  <input type='hidden' name='id' value={element.id} />
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
              ) : (
                <div className='group flex items-center justify-between w-full'>
                  <div
                    onClick={() => setPagei(element.id - 1)}
                    className={`${
                      element.id - 1 === pagei ? 'opacity-100' : 'opacity-50'
                    } group-hover:opacity-100 cursor-pointer`}
                  >
                    <h5 className='font-semibold mb-1'>{element.page.label}</h5>
                    <p className='text-xs font-semibold text-gray-400'>{element.page.desc}</p>
                  </div>
                  <div className='hidden text-xs group-hover:flex items-end gap-1'>
                    <button
                      onClick={() => setEditid(element.id)}
                      className='h-7 w-7 font-semibold text-white rounded-md bg-cyan-500 hover:bg-cyan-700  flex items-center justify-center'
                    >
                      <svg
                        className='h-5 w-5'
                        x-description='Heroicon name: solid/pencil'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => deletePage(element.id)}
                      className='h-7 w-7 font-semibold text-white rounded-md bg-red-600 hover:bg-red-700  flex items-center justify-center'
                    >
                      <svg
                        className='h-5 w-5'
                        x-description='Heroicon name: outline/exclamation'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </li>
          )
        })}
        <li
          key={elements.length + 1}
          className={`relative flex ${toggle ? 'items-start' : 'items-center'} space-x-6 mb-9`}
        >
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
    <FormContext.Provider
      value={{
        handleChange,
        addNewfield,
        addNewpage,
        getElementslength,
        deleteField,
        duplicateField,
        updateField
      }}
    >
      <div className='grid grid-cols-12'>
        <div className='hidden md:inline-block md:col-span-3 bg-gray-100 min-h-screen border-r-4 p-16 pr-4'>
          <h2 className='font-black text-2xl mb-12' alt='logo'>
            Form Builder
          </h2>
          {elements && <PagesList elements={elements} />}
        </div>
        <div className='col-span-12 md:col-span-9 p-5 sm:p-8 md:p-16'>
          {elements && elements[pagei] && <FormPage fields={elements[pagei].fields} />}
          <AddSection className='my-4' />
        </div>
      </div>
    </FormContext.Provider>
  )
}

export default App
