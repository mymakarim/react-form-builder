import Modal from './modal/modal'
import useModal from './modal/useModal'
import React from 'react'
import FormFields from './builderElements/FormFields.js'
import InputText from './builderElements/InputText.js'
import Checkbox from './builderElements/Checkbox.js'
import Select from './builderElements/Select.js'
import PageFields from './builderElements/PageFields.js'
import Description from './builderElements/Description.js'
import Heading from './builderElements/Heading.js'
import Textarea from './builderElements/Textarea.js'

const RenderSwitch = ({ isContent, toggle, changeContent }) => {
  console.log('RENDER SWTITCH IS CONTNET: ', isContent)
  console.log('inputText' === isContent)
  switch (isContent) {
    case null:
      return <FormFields toggle={toggle} changeContent={changeContent} />
    case 'page':
      return <PageFields toggle={toggle} changeContent={changeContent} />
    case 'heading':
      return <Heading changeContent={changeContent} />
    case 'description':
      return <Description changeContent={changeContent} />
    case 'textarea':
      return <Textarea changeContent={changeContent} />
    case 'inputText':
      return <InputText changeContent={changeContent} />
    case 'Checkbox':
      return <Checkbox changeContent={changeContent} />
    case 'Select':
      return <Select changeContent={changeContent} />
    default:
      return <FormFields toggle={toggle} changeContent={changeContent} />
  }
}

export default function AddSection({ className }) {
  const { isShowing, toggle, isContent, changeContent } = useModal()

  const openModal = (content = null) => {
    changeContent(content)
    toggle()
  }

  return (
    <div
      className={`border-4 border-dashed border-gray-300 rounded-lg h-56 flex items-center justify-center gap-3 ${className}`}
    >
      <button
        onClick={() => openModal()}
        className='uppercase font-semibold text-white cursor-pointer bg-cyan-500 ring-2 ring-cyan-500 px-4 py-2 rounded-sm'
      >
        Add Form Fields
      </button>
      <button
        onClick={() => openModal('page')}
        className='uppercase font-semibold text-white cursor-pointer bg-gray-700 ring-2 ring-gray-500 px-4 py-2 rounded-sm'
      >
        Add New Page
      </button>
      <Modal isShowing={isShowing} hide={toggle}>
        <main className='max-w-screen-lg bg-white mx-auto'>
          <div className='bg-gray-50 px-8 py-6 flex items-center justify-between'>
            <h4 className='font-semibold text-md'>Add New Item</h4>
            <button
              onClick={toggle}
              type='button'
              className='rounded-md text-gray-300 hover:text-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-300'
            >
              <span className='sr-only'>Close panel</span>
              <svg
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                ></path>
              </svg>
            </button>
          </div>

          <RenderSwitch isContent={isContent} toggle={toggle} changeContent={changeContent} />
        </main>
      </Modal>
    </div>
  )
}
