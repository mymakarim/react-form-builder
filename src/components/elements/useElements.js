import { useState, useEffect } from 'react'
import formJSON from './../../formElement.json'

const useElements = () => {
  const [elements, setElements] = useState(null)

  useEffect(() => {
    setElements(formJSON[0])
  }, [])

  function changeElements(newElements) {
    setElements(newElements)
  }

  return {
    elements,
    changeElements
  }
}

export default useElements
