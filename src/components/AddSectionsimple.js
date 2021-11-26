import useModal from './modal/useModal'
import React from 'react'
import FormFields from './builderElements/FormFields.js'
import InputText from './builderElements/InputText.js'
import InputFile from './builderElements/InputFile.js'
import Checkbox from './builderElements/Checkbox.js'
import Radiobutton from './builderElements/Radiobutton.js'
import Select from './builderElements/Select.js'
import PageFields from './builderElements/PageFields.js'
import Description from './builderElements/Description.js'
import Heading from './builderElements/Heading.js'
import Textarea from './builderElements/Textarea.js'
import InputGeo from './builderElements/InputGeo.js'

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
    case 'inputFile':
      return <InputFile changeContent={changeContent} />
    case 'radiobutton':
      return <Radiobutton changeContent={changeContent} />
    case 'Checkbox':
      return <Checkbox changeContent={changeContent} />
    case 'Select':
      return <Select changeContent={changeContent} />
    case 'geo':
      return <InputGeo changeContent={changeContent} />
    default:
      return <FormFields toggle={toggle} changeContent={changeContent} />
  }
}

export default function AddSectionsimple({ className }) {
  const { toggle, isContent, changeContent } = useModal()

  return (
    <div
      className={`border-4 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 md:p-8 lg:p-12 ${className}`}
    >
      <RenderSwitch isContent={isContent} toggle={toggle} changeContent={changeContent} />
    </div>
  )
}
