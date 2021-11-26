import React, { useState, useEffect } from 'react'
import Wrapper from './../elements/Wrapper'

const Geo = ({ id, orderId, label, geo, footnote }) => {
  const [longitude, setLongitude] = useState(geo ? geo.longitude : '')
  const [latitude, setLatitude] = useState(geo ? geo.latitude : '')
  const [disable, setDisable] = useState(false)
  useEffect(() => {
    if ('geolocation' in navigator) {
      console.log('GEO Available')
      setDisable(false)
    } else {
      console.log('GEO Not Available')
      setDisable(true)
    }
  }, [])

  function getLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('Latitude is :', position.coords.latitude)
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
      console.log('Longitude is :', position.coords.longitude)
    })
  }

  return (
    <Wrapper
      content='geo'
      id={id}
      orderId={orderId}
      data={{
        id,
        label,
        footnote
      }}
    >
      <div className='my-3'>
        <label htmlFor={label} className='block text-sm font-medium text-gray-700'>
          {label}
        </label>
        <div className='border border-gray-500 my-3 p-3 grid grid-cols-1 md:grid-cols-12 gap-2'>
          <button
            disabled={disable}
            onClick={getLocation}
            type='button'
            className='col-span-1 md:col-span-2 inline-flex items-center justify-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Click here
          </button>
          <div className='col-span-1 md:col-span-5 flex rounded-md shadow-sm'>
            <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
              Latitude
            </span>
            <input
              type='text'
              name='latitude'
              className='p-2.5 block w-full rounded-r-md border disabled:cursor-not-allowed'
              disabled
              value={latitude}
              id='latitude'
            />
          </div>
          <div className='col-span-1 md:col-span-5 flex rounded-md shadow-sm'>
            <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
              Longitude
            </span>
            <input
              type='text'
              name='longitude'
              className='p-2.5 block w-full rounded-r-md border disabled:cursor-not-allowed'
              disabled
              value={longitude}
              id='longitude'
            />
          </div>
        </div>
        <small className='text-gray-500 text-xs mt-1'>{footnote}</small>
      </div>
    </Wrapper>
  )
}

export default Geo
