import formJSON from './formElement.json'
import { useState, useEffect, useRef } from 'react'
import Element from './components/Element'
import { FormContext } from './components/contexts/FormContext'
import React from 'react'
import AddSectionsimple from './components/AddSectionsimple'
import PageFields from './components/builderElements/PageFields'
import Reviewpage from './components/Reviewpage'
import ReactToPrint from 'react-to-print'

function App() {
  const componentRef = useRef()

  const [form, setForm] = useState(formJSON[0].form.name)
  const [elements, setElements] = useState(formJSON[0].pages)
  const [pagei, setPagei] = useState(0)
  const [toggle, setToggle] = useState(false)
  const [formtoggle, setFormtoggle] = useState(false)
  const [editid, setEditid] = useState(null)
  const [edit, setEdit] = useState(false)
  const [showp, setShowp] = useState(false)
  const [preview, setPreview] = useState(false)
  const [data, setData] = useState(null)
  const [review, setReview] = useState(false)

  useEffect(() => {
    console.log('DATA: ', data)
  }, [data])

  const revieworsubmit = () => {
    if (!review) {
      setReview(true)
    } else {
      console.log('SUBMITTED DATA: ', data)
    }
  }

  // const saveForm = async (content, name) => {
  //   // save json into the file here
  //   console.log('--------------------')
  //   console.log('SAVE FORM')
  //   console.log('--------------------')
  //   console.log('FORM NAME: ', name)
  //   console.log('FORM PAGES: ', content)
  // }

  // useEffect(() => {
  //   console.log('JSON TO BE SAVED: ', elements)
  //   // save the json file
  //   saveForm(elements, form).then((e) => {
  //     console.log('E: ', e)
  //   })
  // }, [elements, form])

  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   // save file json
  //   // or POST it somewhere
  //   console.log(elements)
  // }

  const changeHandler = (name, values) => {
    setData({
      ...data,
      [name]: values
    })
  }

  const changeFiles = (name, files) => {
    setData({
      ...data,
      [name]: files
    })
  }

  const matchedID = (item, field = 'id') => {
    const newElements = [...elements]
    for (var i = 0; i < newElements.length; i++) {
      for (let index = 0; index < newElements[i].fields.length; index++) {
        if (newElements[i].fields[index][field] === item[field]) {
          console.log('FIELD LABEL: ', newElements[i].fields[index][field])
          console.log('ITEM LABEL: ', item[field])
          return true
        }
      }
    }
  }

  const addNewfield = (item) => {
    const newElements = [...elements]
    item.order = newElements[pagei].fields.length + 1
    if (matchedID(item)) {
      console.log('FOUND A MATCH')
      item.id += (Math.random() + 1).toString(36).substring(7)
    }
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

        newItem.id += (Math.random() + 1).toString(36).substring(7)
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
        if (matchedID(edits)) {
          deleteData(id)
          console.log('FOUND A MATCH')
          edits.id += (Math.random() + 1).toString(36).substring(7)
        }
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
      newElement.fields.forEach((field) => {
        field.id += (Math.random() + 1).toString(36).substring(7)
      })
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
        deleteData(id)
      }
    }
    //   }
    // }
    // console.log('BEFORE DELETE FIELDS')
    newElements[pagei].fields.sort((a, b) => parseFloat(a.order) - parseFloat(b.order))
    setElements(newElements)
  }

  function deleteData(id) {
    if (data && data[id]) {
      console.log('DELETE DATA ID: ', id)
      delete data[id]
    }
  }

  function deleteFile(id, file) {
    if (data && data[id]) {
      let newData = Object.assign({}, data)
      console.log('DELETE DATA ID: ', id)
      console.log('DELETE DATA FILE: ', data[id][file])
      newData[id].splice(newData[id].indexOf(newData[id][file]), 1)
      setData(newData)
    }
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
      <div className='print:hidden'>
        <div className='flex lg:hidden items-center justify-between rounded-sm'>
          <span className='font-semibold'>Manage Pages</span>
          <div
            onClick={() => setShowp(!showp)}
            className='cursor-pointer h-7 w-7 flex items-center justify-center text-2xl bg-gray-700 text-gray-100 hover:bg-white hover:text-gray-700 rounded-md'
          >
            {showp ? '-' : '+'}
          </div>
        </div>

        <ul className={` ${!showp ? 'hidden' : 'mt-3'} lg:inline-block list-bordered-left w-full`}>
          {elements.map((element) => {
            return (
              <li key={element.id} className={`group relative flex items-center space-x-6 mb-9`}>
                <div
                  onClick={() => setPagei(element.id - 1)}
                  className={`h-12 w-12 ${
                    element.id - 1 === pagei
                      ? 'bg-cyan-500 text-white'
                      : 'bg-cyan-200 text-cyan-600'
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
                    {!preview && (
                      <div className='hidden absolute top-0 right-0 text-xs group-hover:flex items-center gap-1'>
                        <button
                          onClick={() => duplicatePage(element.id)}
                          className='h-7 w-7 font-semibold text-white rounded-md bg-indigo-600 hover:bg-indigo-700  flex items-center justify-center'
                        >
                          <i className='far fa-copy'></i>
                        </button>
                        <button
                          onClick={() => setEditid(element.id)}
                          className='h-7 w-7 font-semibold text-white rounded-md bg-cyan-500 hover:bg-cyan-700  flex items-center justify-center'
                        >
                          <i className='fas fa-pencil-alt'></i>
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
                          <i className='far fa-trash-alt'></i>
                        </button>
                        <div className='flex flex-col justify-between gap-1 items-center'>
                          <button
                            disabled={1 === element.id}
                            onClick={() => goUpPage(element.id)}
                            className='disabled:cursor-not-allowed disabled:opacity-50 h-4 w-4 text-indigo-700 border-cyan-700 border-2 hover:bg-cyan-700 hover:text-white transition duration-500 ease-in-out flex items-center justify-center'
                          >
                            <i className='fas fa-caret-up'></i>
                          </button>
                          <button
                            disabled={element.id === elements.length}
                            onClick={() => goDownPage(element.id)}
                            className='disabled:cursor-not-allowed disabled:opacity-50 h-4 w-4 text-indigo-700 border-cyan-700 border-2 hover:bg-cyan-700 hover:text-white transition duration-500 ease-in-out flex items-center justify-center'
                          >
                            <i className='fas fa-caret-down'></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </li>
            )
          })}
          {!preview && (
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
          )}
          <li key={elements.length + 2} className={`relative flex items-center space-x-6 mb-9`}>
            <div
              onClick={() => {
                setPreview(!preview)
                setReview(false)
              }}
              className={`h-12 px-6 cursor-pointer bg-gray-900 hover:bg-cyan-500 text-white transition duration-200 ease-in-out flex-none rounded-lg flex items-center justify-center font-bold`}
            >
              {preview && 'close'} Preveiw Mode
            </div>
          </li>
        </ul>
      </div>
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
        changeHandler,
        changeFiles,
        deleteFile,
        data,
        addNewfield,
        addNewpage,
        getElementslength,
        getFieldslength,
        deleteField,
        duplicateField,
        updateField,
        updatePage,
        goUpField,
        goDownField,
        preview
      }}
    >
      <div className='grid grid-cols-12'>
        <div className='col-span-12 lg:col-span-3 bg-gray-100 p-4 sm:p-6 lg:p-16 lg:min-h-screen lg:border-r-4'>
          {formtoggle ? (
            <form
              onSubmit={(evt) => {
                setForm(evt.target.form_name.value.trim())
                setFormtoggle(!formtoggle)
              }}
              className='flex gap-1 mb-16'
            >
              <input
                type='text'
                placeholder='name'
                name='form_name'
                required
                defaultValue={form}
                className='p-2.5 block w-full rounded-md border'
                id='form_name'
              />
              <input
                className='hidden text-xs font-semibold bg-gray-300 px-2 py-1'
                type='submit'
                value='Update'
              />
            </form>
          ) : (
            <div className='flex justify-between items-center mt-3 lg:mr-3 mb-3 sm:mb-16'>
              <h2 className='font-bold text-2xl'>{form}</h2>
              {!preview && (
                <button
                  onClick={() => setFormtoggle(!formtoggle)}
                  className='h-7 w-7 font-semibold text-white rounded-md bg-cyan-500 hover:bg-cyan-700  flex items-center justify-center'
                >
                  <i className='fas fa-pencil-alt'></i>
                </button>
              )}
            </div>
          )}
          {elements && <PagesList elements={elements} />}
        </div>
        <div
          className={`col-span-12 lg:col-span-9 p-4 sm:p-6 lg:p-16 bg-no-repeat bg-cover ${elements[pagei].page.placement}`}
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, ${elements[pagei].page.opacity}), rgba(255,255,255, ${elements[pagei].page.opacity})), url(${elements[pagei].page.bgimage})`
          }}
        >
          {!review && (
            <div className='relative group '>
              <div id={pagei} className='mb-3'>
                <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
                  {elements[pagei].page.label}
                </h2>
                <p className='text-gray-500'>{elements[pagei].page.placeholder}</p>
              </div>
              {!preview && (
                <div className='hidden group-hover:flex absolute top-0 right-0 mr-3 bottom-0 flex items-center gap-2'>
                  <button
                    onClick={() => duplicatePage(pagei + 1)}
                    className='px-3 py-2 font-semibold text-white rounded-md bg-indigo-600 hover:bg-indigo-700  flex items-center justify-between gap-1'
                  >
                    <i className='far fa-copy'></i>
                    <span className='hidden sm:inline-block'>Duplicate</span>
                  </button>
                  <button
                    onClick={() => setEdit(!edit)}
                    className='px-3 py-2 font-semibold text-white rounded-md bg-cyan-500 hover:bg-cyan-700  flex items-center justify-between gap-1'
                  >
                    <i className='fas fa-pencil-alt'></i>
                    <span className='hidden sm:inline-block'>Edit</span>
                  </button>
                  <button
                    disabled={elements.length <= 1}
                    onClick={() => deletePage(pagei + 1)}
                    className='disabled:cursor-not-allowed disabled:opacity-50 px-3 py-2 font-semibold text-white rounded-md bg-red-600 hover:bg-red-700  flex items-center justify-between gap-1'
                  >
                    <i className='far fa-trash-alt'></i>
                    <span className='hidden sm:inline-block'>Delete</span>
                  </button>
                </div>
              )}
            </div>
          )}
          {edit && !preview && (
            <PageFields data={{ id: elements[pagei].id, ...elements[pagei].page }} />
          )}
          {!review && elements && elements[pagei] && <FormPage fields={elements[pagei].fields} />}
          {review && <Reviewpage ref={componentRef} data={data} />}
          {!preview ? (
            <AddSectionsimple className='my-4' />
          ) : (
            <div className='bg-white py-3 flex items-center justify-between'>
              <div className='flex-1 sm:flex sm:items-center sm:justify-between'>
                <div className='hidden sm:inline-block'>
                  {!review && (
                    <p className='text-sm text-gray-700'>
                      Showing page <span className='font-semibold'>{pagei + 1}</span> of{' '}
                      <span className='font-semibold'>{getElementslength()}</span>
                    </p>
                  )}
                </div>
                <div className='flex items-center justify-between sm:justify-default gap-1.5'>
                  {!review ? (
                    <button
                      disabled={pagei === 0}
                      onClick={() => setPagei(pagei - 1)}
                      className='flex gap-2 items-center disabled:cursor-not-allowed disabled:opacity-50 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                    >
                      <i className='fas fa-chevron-left h-3'></i>
                      <span>Previous</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setReview(!review)
                        }}
                        className='flex gap-2 items-center disabled:cursor-not-allowed disabled:opacity-50 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                      >
                        <i className='fas fa-pencil-alt h-3'></i>
                        <span>Edit</span>
                      </button>
                      <ReactToPrint
                        trigger={() => (
                          <button className='flex gap-2 items-center disabled:cursor-not-allowed disabled:opacity-50 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
                            <i className='fas fa-print h-3'></i>
                            <span>Print</span>
                          </button>
                        )}
                        content={() => componentRef.current}
                        documentTitle={form}
                        bodyClass={'px-5'}
                      />
                    </>
                  )}
                  {pagei === getElementslength() - 1 ? (
                    <button
                      type='button'
                      onClick={revieworsubmit}
                      className='flex gap-2 items-center disabled:cursor-not-allowed disabled:opacity-50 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                    >
                      <span>{!review ? 'Review Answers' : 'Submit'}</span>
                      <i className='fas fa-chevron-right h-3'></i>
                    </button>
                  ) : (
                    <button
                      disabled={pagei === getElementslength() - 1}
                      onClick={() => setPagei(pagei + 1)}
                      className='flex gap-2 items-center disabled:cursor-not-allowed disabled:opacity-50 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                    >
                      <span>Next</span>
                      <i className='fas fa-chevron-right h-3'></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </FormContext.Provider>
  )
}

export default App
