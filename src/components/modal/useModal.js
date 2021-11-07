import { useState, useEffect } from 'react'

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false)
  const [isContent, setIsContent] = useState(null)

  function toggle() {
    setIsShowing(!isShowing)
  }

  function changeContent(content) {
    setIsContent(content)
  }

  useEffect(() => {
    console.log('ISCONTENT: ', isContent)
  }, [isContent])

  return {
    isShowing,
    isContent,
    toggle,
    changeContent
  }
}

export default useModal
