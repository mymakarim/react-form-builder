import React, { useState, useContext, useEffect } from 'react'
import { IconContext } from './../contexts/IconContext'
import { icons } from './../../fontIcons.json'

const Iconpicker2 = () => {
  const { changeIcon, data } = useContext(IconContext)

  const [icon, setIcon] = useState(data ? data.icon : 'far fa-address-book')
  const [toggle, setToggle] = useState(false)

  const setnewIcon = (icon) => {
    setIcon(icon)
    setToggle(!toggle)
  }

  useEffect(() => {
    changeIcon(icon)
  }, [icon, changeIcon])

  return (
    <div className='col-span-12 sm:col-span-6'>
      <label htmlFor='icon' className='block text-sm font-medium text-gray-700'>
        Icon
      </label>
      <div className='flex items-stretch mt-2 relative'>
        <button
          type='button'
          onClick={() => setToggle(!toggle)}
          className='cursor-pointer relative rounded-md w-full border pl-3 pr-10 py-1 text-left ring-2 ring-transparent focus:ring-gray-900 sm:text-sm'
        >
          <span className='flex items-center'>
            <span className={icon + ' h-8 w-8 flex items-center justify-center'}></span>
            <span className='ml-3 block truncate'>{icon.split('fa-')[1]}</span>
          </span>
          <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
            <svg
              className='h-5 w-5 text-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </span>
        </button>
        {toggle && (
          <ul
            className='grid grid-cols-8 gap-2 absolute top-8 z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md p-4 pr-2 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
            tabIndex='-1'
            role='listbox'
          >
            {icons.map((ic) => {
              return (
                <li
                  onClick={() => setnewIcon(ic)}
                  key={ic}
                  className={` ${
                    icon === ic && 'bg-cyan-400'
                  } col-span-1 cursor-pointer hover:bg-cyan-300 rounded-lg text-gray-900 h-8 w-8 flex items-center justify-center`}
                >
                  <span className={ic}></span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Iconpicker2
