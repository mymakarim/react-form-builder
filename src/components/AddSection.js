import Modal from './modal/modal'
import useModal from './modal/useModal'
import React from 'react'
import FormFields from './builderElements/FormFields.js'
import InputText from './builderElements/InputText.js'
import Checkbox from './builderElements/Checkbox.js'
import Select from './builderElements/Select.js'

const RenderSwitch = ({ isContent, changeContent }) => {
  console.log('RENDER SWTITCH IS CONTNET: ', isContent)
  console.log('inputText' === isContent)
  switch (isContent) {
    case null:
      return <FormFields changeContent={changeContent} />
    case 'inputText':
      return <InputText changeContent={changeContent} />
    case 'Checkbox':
      return <Checkbox changeContent={changeContent} />
    case 'Select':
      return <Select changeContent={changeContent} />
    default:
      return <FormFields changeContent={changeContent} />
  }
}

export default function AddSection({ className }) {
  const { isShowing, toggle, isContent, changeContent } = useModal()

  console.log('ADDSECTION CONTENT: ', isContent)

  return (
    <div
      className={`border-4 border-dashed border-gray-300 rounded-lg h-56 flex items-center justify-center ${className}`}
    >
      <button
        onClick={toggle}
        className='uppercase font-semibold text-white cursor-pointer bg-indigo-600 ring-2 ring-indigo-500 px-4 py-2 rounded-sm'
      >
        Add Sections or Pages
      </button>
      <Modal isShowing={isShowing} hide={toggle}>
        <main className='max-w-screen-lg bg-white mx-auto'>
          <div className='bg-gray-50 px-8 py-6 flex items-center justify-between'>
            <h4 className='font-semibold text-md'>Add Item</h4>
            <span onClick={toggle}>x</span>
          </div>

          <RenderSwitch isContent={isContent} changeContent={changeContent} />
        </main>
      </Modal>
    </div>
  )
}
