import formJSON from './formElement.json'
import { useState, useEffect } from 'react'
import Element from './components/Element'
import { FormContext } from './FormContext'
import React from 'react'
import AddSection from './components/AddSection'
import AddSectionsimple from './components/AddSectionsimple'
import PageFields from './components/builderElements/PageFields'

function App() {
  const [elements, setElements] = useState(formJSON)
  const [pagei, setPagei] = useState(0)
  const [toggle, setToggle] = useState(false)
  const [editid, setEditid] = useState(null)
  const [edit, setEdit] = useState(false)

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

  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   // save file json
  //   // or POST it somewhere
  //   console.log(elements)
  // }
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
    // for (var i = 0; i < newElements.length; i++) {
    // if (newElements[i].id === pagei + 1) {
    // console.log('PAGE FOUND: ', pagei + 1)
    for (var x = 0; x < newElements[pagei].fields.length; x++) {
      if (newElements[pagei].fields[x].id === id) {
        // console.log('DELTE FIELD ID: ', id)
        let newItem = Object.assign({}, newElements[pagei].fields[x])

        newItem.id = (Math.random() + 1).toString(36).substring(7)
        item = newItem
      }
    }
    //   }
    // }
    newElements[pagei].fields.push(item)
    setElements(newElements)
  }

  const updateField = (id, edits) => {
    const newElements = [...elements]
    // for (var i = 0; i < newElements.length; i++) {
    //   if (newElements[i].id === pagei + 1) {
    // console.log('PAGE FOUND: ', pagei + 1)
    for (var x = 0; x < newElements[pagei].fields.length; x++) {
      if (newElements[pagei].fields[x].id === id) {
        // console.log('DELTE FIELD ID: ', id)
        newElements[pagei].fields[x] = edits
      }
    }
    //   }
    // }
    setElements(newElements)
  }

  const addNewpage = (
    id,
    label,
    placeholder,
    bgimage = null,
    opacity = 1,
    placement = 'center center'
  ) => {
    const newElements = [...elements]
    newElements.push({
      id: id,
      page: {
        label: label,
        placeholder: placeholder,
        bgimage: bgimage,
        opacity: opacity,
        placement: placement
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
    const placeholder = evt.target.page_desc.value.trim()
    if (label !== '' && placeholder !== '') {
      addNewpage(id, label, placeholder)
    }
    setToggle(!toggle)
  }

  function updatePagequick(evt) {
    evt.preventDefault()
    const label = evt.target.page_label.value.trim()
    const desc = evt.target.page_desc.value.trim()
    const newElements = [...elements]
    if (label !== '' && desc !== '') {
      for (var i = 0; i < newElements.length; i++) {
        if (newElements[i].id === editid) {
          newElements[i].page = {
            label: label,
            placeholder: desc
          }
        }
      }
    }
    console.log('BEFORE SET ELEMENTS')
    setElements(newElements)
    setEditid(null)
  }

  // here
  const updatePage = (id, edits) => {
    const newElements = [...elements]
    // for (var i = 0; i < newElements.length; i++) {
    if (newElements[pagei].id === id) {
      newElements[pagei].page = edits
    }
    // }
    setElements(newElements)
    setEdit(!edit)
  }

  // here
  const duplicatePage = (id) => {
    const newElements = [...elements]
    let newElement = {}
    if (newElements[id - 1].id === id) {
      // console.log('FOUND THE PAGE: ', id)
      newElement = JSON.parse(JSON.stringify(newElements[id - 1]))
      newElement.id = newElements.length + 1
      newElement.page.label = newElements[id - 1].page.label + ' copy'
      newElements.push(newElement)
      setElements(newElements)
    } else {
      // console.log('TOBE DUPLICATED PAGE NOT FOUND: ')
    }
  }

  function deletePage(id) {
    const newElements = [...elements]
    for (var i = 0; i < newElements.length; i++) {
      if (newElements[i].id === id) {
        console.log('DELETE PAGE: ', id)
        newElements.splice(i, 1)
      }
    }
    console.log('BEFORE DELETE PAGE')
    setElements(newElements)
  }

  function deleteField(id) {
    const newElements = [...elements]
    // for (var i = 0; i < newElements.length; i++) {
    // if (newElements[i].id === pagei + 1) {
    // console.log('PAGE FOUND: ', pagei + 1)
    console.log('PAGE I IN DELETE: ', pagei)
    for (var x = 0; x < newElements[pagei].fields.length; x++) {
      if (newElements[pagei].fields[x].id === id) {
        // console.log('DELTE FIELD ID: ', id)
        newElements[pagei].fields.splice(x, 1)
      }
    }
    //   }
    // }
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
                <form onSubmit={updatePagequick} className='flex flex-col gap-1 items-end'>
                  <input type='hidden' name='id' value={element.id} />
                  <input
                    type='text'
                    placeholder='label'
                    name='page_label'
                    required
                    defaultValue={element.page.label}
                    className='px-2 py-1 text-xs border'
                    id='page_label'
                  />
                  <input
                    type='text'
                    placeholder='desc'
                    name='page_desc'
                    required
                    defaultValue={element.page.placeholder}
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
                    <p className='text-xs font-semibold text-gray-400'>
                      {element.page.placeholder}
                    </p>
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
                      disabled={elements.length <= 1}
                      onClick={() => deletePage(element.id)}
                      title={
                        elements.length <= 1
                          ? 'Cant Delete: There should be atleast one section'
                          : 'Delete'
                      }
                      className='disabled:bg-gray-400 disabled:cursor-not-allowed	 h-7 w-7 font-semibold text-white rounded-md bg-red-600 hover:bg-red-700  flex items-center justify-center'
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
        updateField,
        updatePage
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
          <div className='relative group'>
            <div id={pagei} className='mb-3'>
              <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
                {elements[pagei].page.label}
              </h2>
              <p className='text-gray-500'>{elements[pagei].page.placeholder}</p>
            </div>
            <div className='hidden group-hover:flex absolute top-0 right-0 mr-3 bottom-0 flex items-center gap-2'>
              <button
                onClick={() => duplicatePage(pagei + 1)}
                className='px-3 py-2 font-semibold text-white rounded-md bg-indigo-600 hover:bg-indigo-700  flex items-center justify-between gap-1'
              >
                <svg
                  className='h-5 w-5 stroke-current'
                  aria-hidden='true'
                  viewBox='0 0 32 32'
                  fill='none'
                >
                  <path
                    d='M12.9975 10.7499L11.7475 10.7499C10.6429 10.7499 9.74747 11.6453 9.74747 12.7499L9.74747 21.2499C9.74747 22.3544 10.6429 23.2499 11.7475 23.2499L20.2475 23.2499C21.352 23.2499 22.2475 22.3544 22.2475 21.2499L22.2475 12.7499C22.2475 11.6453 21.352 10.7499 20.2475 10.7499L18.9975 10.7499'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                  <path
                    d='M17.9975 12.2499L13.9975 12.2499C13.4452 12.2499 12.9975 11.8022 12.9975 11.2499L12.9975 9.74988C12.9975 9.19759 13.4452 8.74988 13.9975 8.74988L17.9975 8.74988C18.5498 8.74988 18.9975 9.19759 18.9975 9.74988L18.9975 11.2499C18.9975 11.8022 18.5498 12.2499 17.9975 12.2499Z'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                  <path
                    d='M13.7475 16.2499L18.2475 16.2499'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                  <path
                    d='M13.7475 19.2499L18.2475 19.2499'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                  <g className='transition-opacity'>
                    <path
                      d='M15.9975 5.99988L15.9975 3.99988'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>
                    <path
                      d='M19.9975 5.99988L20.9975 4.99988'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>
                    <path
                      d='M11.9975 5.99988L10.9975 4.99988'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>
                  </g>
                </svg>
                <span>Duplicate</span>
              </button>
              <button
                onClick={() => setEdit(!edit)}
                className='px-3 py-2 font-semibold text-white rounded-md bg-cyan-500 hover:bg-cyan-700  flex items-center justify-between gap-1'
              >
                <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                  <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path>
                </svg>
                <span>Edit</span>
              </button>
              <button
                onClick={() => deletePage(pagei)}
                className='px-3 py-2  font-semibold text-white rounded-md bg-red-600 hover:bg-red-700  flex items-center justify-between gap-1'
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
                <span>Delete</span>
              </button>
            </div>
          </div>
          {edit && <PageFields data={{ id: elements[pagei].id, ...elements[pagei].page }} />}
          {elements && elements[pagei] && <FormPage fields={elements[pagei].fields} />}
          <AddSectionsimple className='my-4' />
          <AddSection className='my-4' />
        </div>
      </div>
    </FormContext.Provider>
  )
}

export default App
