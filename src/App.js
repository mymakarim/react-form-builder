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
    item.order = newElements[pagei].fields.length + 1
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
        newItem.order = Number(newElements[pagei].fields[x].order) + 1
        newItem.label = newElements[pagei].fields[x].label + ' copy'
        item = newItem
        for (var y = x + 1; y < newElements[pagei].fields.length; y++) {
          newElements[pagei].fields[y].order = Number(newElements[pagei].fields[y].order) + 1
        }
      }
    }
    //   }
    // }
    newElements[pagei].fields.push(item)
    newElements[pagei].fields.sort((a, b) => parseFloat(a.order) - parseFloat(b.order))
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
      newElement.id = id + 1
      newElement.page.label = newElements[id - 1].page.label + ' copy'
      for (var y = id; y < newElements.length; y++) {
        newElements[y].id = Number(newElements[y].id) + 1
      }
      newElements.push(newElement)
      newElements.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
      setElements(newElements)
    } else {
      // console.log('TOBE DUPLICATED PAGE NOT FOUND: ')
    }
  }

  function deletePage(id) {
    console.log('PAGEI: ', pagei)
    const newElements = [...elements]
    for (var i = 0; i < newElements.length; i++) {
      if (newElements[i].id === id) {
        console.log('DELETE PAGE: ', id)
        for (var y = i + 1; y < newElements.length; y++) {
          newElements[y].id = Number(newElements[y].id) - 1
        }
        newElements.splice(i, 1)
      }
    }
    console.log('BEFORE DELETE PAGE')
    setPagei(0)
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
        for (var y = x + 1; y < newElements[pagei].fields.length; y++) {
          newElements[pagei].fields[y].order = Number(newElements[pagei].fields[y].order) - 1
        }
        newElements[pagei].fields.splice(x, 1)
      }
    }
    //   }
    // }
    // console.log('BEFORE DELETE FIELDS')
    newElements[pagei].fields.sort((a, b) => parseFloat(a.order) - parseFloat(b.order))
    setElements(newElements)
  }

  function goUpField(orderId) {
    const newElements = [...elements]
    // for (var i = 0; i < newElements.length; i++) {
    // if (newElements[i].id === pagei + 1) {
    // console.log('PAGE FOUND: ', pagei + 1)
    console.log('PAGE I IN GOUP: ', pagei)
    console.log('ORDER ID IN GOUP: ', orderId)
    // for (var x = 0; x < newElements[pagei].fields.length; x++) {
    if (orderId !== 1) {
      newElements[pagei].fields[orderId - 1].order = orderId - 1
      newElements[pagei].fields[orderId - 2].order = orderId
    } else {
      console.log('CANNOT GOUP THE FIRST ELEMENT')
    }
    // }
    //   }
    // }
    // console.log('BEFORE GOUP FIELDS')
    newElements[pagei].fields.sort((a, b) => parseFloat(a.order) - parseFloat(b.order))
    setElements(newElements)
  }

  function goDownField(orderId) {
    const newElements = [...elements]
    // for (var i = 0; i < newElements.length; i++) {
    // if (newElements[i].id === pagei + 1) {
    // console.log('PAGE FOUND: ', pagei + 1)
    console.log('PAGE I IN GODOWN: ', pagei)
    console.log('ORDER ID IN GODOWN: ', orderId)
    // for (var x = 0; x < newElements[pagei].fields.length; x++) {
    if (orderId !== newElements[pagei].fields.length) {
      newElements[pagei].fields[orderId - 1].order = orderId + 1
      newElements[pagei].fields[orderId].order = orderId
    } else {
      console.log('IT IS THE LAST ITEM CANNOT REORDER ELEMENTS AFTER IT')
    }
    // }
    //   }
    // }
    // console.log('BEFORE GOUP FIELDS')
    newElements[pagei].fields.sort((a, b) => parseFloat(a.order) - parseFloat(b.order))
    setElements(newElements)
  }

  function goDownPage(id) {
    const newElements = [...elements]
    // for (var i = 0; i < newElements.length; i++) {
    // if (newElements[i].id === pagei + 1) {
    // console.log('PAGE FOUND: ', pagei + 1)
    console.log('PAGE I IN GODOWN: ', pagei)
    console.log('ORDER ID IN GODOWN: ', id)
    // for (var x = 0; x < newElements[pagei].fields.length; x++) {
    if (id !== newElements.length) {
      newElements[id - 1].id = id + 1
      newElements[id].id = id
    } else {
      console.log('IT IS THE LAST ITEM CANNOT REORDER ELEMENTS AFTER IT')
    }
    // }
    //   }
    // }
    // console.log('BEFORE GOUP FIELDS')
    newElements.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
    setElements(newElements)
  }
  function goUpPage(id) {
    const newElements = [...elements]
    // for (var i = 0; i < newElements.length; i++) {
    // if (newElements[i].id === pagei + 1) {
    // console.log('PAGE FOUND: ', pagei + 1)
    console.log('PAGE I IN GOUP: ', pagei)
    console.log('ORDER ID IN GOUP: ', id)
    // for (var x = 0; x < newElements[pagei].fields.length; x++) {
    if (id !== 1) {
      newElements[id - 1].id = id - 1
      newElements[id - 2].id = id
    } else {
      console.log('IT IS THE FIRST ITEM CANNOT REORDER ELEMENTS BEFORE IT')
    }
    // }
    //   }
    // }
    // console.log('BEFORE GOUP FIELDS')
    newElements.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
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
                  <div className='hidden absolute top-0 right-0 text-xs group-hover:flex items-center gap-1'>
                    <button
                      onClick={() => duplicatePage(element.id)}
                      className='h-7 w-7 font-semibold text-white rounded-md bg-indigo-600 hover:bg-indigo-700  flex items-center justify-center'
                    >
                      <svg
                        aria-hidden='true'
                        viewBox='0 0 16 16'
                        version='1.1'
                        fill='currentColor'
                        data-view-component='true'
                        className='h-5 w-5 p-0.5'
                      >
                        <path d='M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z'></path>
                        <path d='M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z'></path>
                      </svg>
                    </button>
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
                      className='disabled:opacity-50 disabled:cursor-not-allowed	 h-7 w-7 font-semibold text-white rounded-md bg-red-600 hover:bg-red-700  flex items-center justify-center'
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
                    <div className='flex flex-col justify-between gap-1 items-center'>
                      <button
                        disabled={1 === element.id}
                        onClick={() => goUpPage(element.id)}
                        className='disabled:cursor-not-allowed disabled:opacity-50 h-4 w-4 text-indigo-700 border-cyan-700 border-2 hover:bg-cyan-700 hover:text-white transition duration-500 ease-in-out flex items-center justify-center'
                      >
                        <svg
                          className='flex-shrink-0 h-3 w-3 transform rotate-180'
                          x-description='Heroicon name: solid/chevron-down'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            fillRule='evenodd'
                            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                            clipRule='evenodd'
                          ></path>
                        </svg>
                      </button>
                      <button
                        disabled={element.id === elements.length}
                        onClick={() => goDownPage(element.id)}
                        className='disabled:cursor-not-allowed disabled:opacity-50 h-4 w-4 text-indigo-700 border-cyan-700 border-2 hover:bg-cyan-700 hover:text-white transition duration-500 ease-in-out flex items-center justify-center'
                      >
                        <svg
                          className='flex-shrink-0 h-3 w-3'
                          x-description='Heroicon name: solid/chevron-down'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            fillRule='evenodd'
                            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                            clipRule='evenodd'
                          ></path>
                        </svg>
                      </button>
                    </div>
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
            className={`h-12 w-12 cursor-pointer bg-gray-900 hover:bg-cyan-500 text-white transition duration-200 ease-in-out flex-none rounded-lg flex items-center justify-center font-bold`}
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
  const getFieldslength = () => {
    return elements[pagei].fields.length
  }

  return (
    <FormContext.Provider
      value={{
        handleChange,
        addNewfield,
        addNewpage,
        getElementslength,
        getFieldslength,
        deleteField,
        duplicateField,
        updateField,
        updatePage,
        goUpField,
        goDownField
      }}
    >
      <div className='grid grid-cols-12'>
        <div className='hidden md:inline-block md:col-span-3 bg-gray-100 min-h-screen border-r-4 p-16 pr-4'>
          <h2 className='font-bold text-3xl mb-14 mt-2' alt='logo'>
            Form Builder
          </h2>
          {elements && <PagesList elements={elements} />}
        </div>
        <div className='col-span-12 md:col-span-9 p-5 sm:p-8 md:p-16'>
          <div className='relative group border-b'>
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
                  aria-hidden='true'
                  viewBox='0 0 16 16'
                  version='1.1'
                  fill='currentColor'
                  data-view-component='true'
                  className='h-5 w-5 p-0.5'
                >
                  <path d='M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z'></path>
                  <path d='M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z'></path>
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
                disabled={elements.length <= 1}
                onClick={() => deletePage(pagei + 1)}
                className='disabled:cursor-not-allowed disabled:opacity-50 px-3 py-2 font-semibold text-white rounded-md bg-red-600 hover:bg-red-700  flex items-center justify-between gap-1'
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
