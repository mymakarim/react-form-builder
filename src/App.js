import formJSON from './formElement.json'
import { useState, useEffect } from 'react'
import Element from './components/Element'
import { FormContext } from './FormContext'
import React from 'react'
import AddSection from './components/AddSection'

function App() {
  const [elements, setElements] = useState(null)
  useEffect(() => {
    setElements(formJSON[0])
  }, [])

  useEffect(() => {
    console.log('ELEMENTS: ', elements)
  }, [elements])

  const { fields, page_label } = elements ? elements : {}
  const handleSubmit = (event) => {
    event.preventDefault()

    console.log(elements)
  }
  const handleChange = (id, event) => {
    const newElements = { ...elements }
    newElements.fields.forEach((field) => {
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
    const newElements = { ...elements }
    newElements.fields.push(item)
    setElements(newElements)
  }

  return (
    <FormContext.Provider value={{ handleChange, addNewfield }}>
      <div className='max-w-screen-xl mx-auto my-10'>
        <h3>{page_label}</h3>
        <form>
          {fields ? fields.map((field, i) => <Element key={i} field={field} />) : null}
          <button type='submit' className='hidden btn btn-primary' onClick={(e) => handleSubmit(e)}>
            Submit
          </button>
        </form>
        <AddSection className='my-4' />
      </div>
    </FormContext.Provider>
  )
}

export default App
