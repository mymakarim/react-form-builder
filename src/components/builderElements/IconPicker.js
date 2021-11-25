import React, { useState, useContext, useEffect } from 'react'
import { IconContext } from './../contexts/IconContext'
import { icons } from './../../fontIcons.json'

const Iconpicker = () => {
  const { changeIcon, data } = useContext(IconContext)

  const [icon, setIcon] = useState(data ? data.icon : 'fas fa-address-book')
  const [is, setIs] = useState(
    data ? icons.filter((icon) => icon.includes(data.icon.split(' ')[0])) : icons
  )
  const [icontype, setIcontype] = useState(data ? data.icon.split(' ')[0] : 'fas')

  useEffect(() => {
    changeIcon(icon)
  }, [icon, changeIcon])

  function changeIconHere(itype) {
    setIcontype(itype)
    const firstIcon = icons.filter((icon) => icon.includes(itype))[0]
    setIcon(firstIcon)
    setIs(icons.filter((icon) => icon.includes(itype)))
  }

  return (
    <div className='col-span-12 sm:col-span-6'>
      <label htmlFor='icon' className='block text-sm font-medium text-gray-700'>
        Icon
      </label>
      <div className='flex items-stretch mt-2'>
        <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
          <i className={icon} />
        </span>
        <div className='flex flex-grow'>
          <select
            required
            className='p-2.5 block w-full border'
            defaultValue={icon}
            onChange={(e) => setIcon(e.target.value)}
          >
            {is.map((icon) => {
              return (
                <option key={icon} value={icon} className='flex gap-1'>
                  {icon.split('fa-')[1]}
                </option>
              )
            })}
          </select>
          <div className='flex items-center'>
            <label htmlFor='icontype' className='sr-only'>
              Icon Type
            </label>
            <select
              id='icontype'
              name='icontype'
              defaultValue={icontype}
              onChange={(e) => changeIconHere(e.target.value)}
              className='p-2.5 block w-22 border border-l-0 rounded-r-md'
            >
              <option value='fas'>FAS</option>
              <option value='fab'>FAB</option>
              <option value='far'>FAR</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Iconpicker
