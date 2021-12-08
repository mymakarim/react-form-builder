import React, { useState, useContext } from 'react'
import Wrapper from './../elements/Wrapper'
import Files from 'react-files'
import { FormContext } from './../contexts/FormContext'

const Input = ({
  id,
  orderId,
  type,
  label,
  placeholder,
  numbermin,
  numbermax,
  readonly,
  step,
  maxlength,
  pattern,
  footnote,
  required,
  multiple,
  accept,
  maxFilesize,
  maxFiles,
  icon
}) => {
  const { changeHandler, changeFiles, data } = useContext(FormContext)
  const fileshere = data && data[id] ? data[id] : []
  const [uploading, setUploading] = useState(false)

  console.log('DATA ID: ', data && data[id])

  const [error, setError] = useState([])
  function onFilesChange(files) {
    setUploading(true)
    console.log('BEFORE LOOP ')

    const uploadedafter = files.map((file) => {
      const data = new FormData()
      data.append('file', file)
      data.append('upload_preset', 'eb6apais')
      data.append('cloud_name', 'iapadmin')
      return fetch('https://api.cloudinary.com/v1_1/iapadmin/image/upload', {
        method: 'post',
        body: data
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log('UPLOADED: ', data)
          fileshere.push(data.secure_url)
        })
        .catch((err) => {
          console.log(err)
          setUploading(false)
        })
    })
    Promise.all(uploadedafter).then((arrOfResults) => {
      console.log('AFTER LOOP ')
      console.log('FILES HERE: ', fileshere)
      changeFiles(id, fileshere)
      setUploading(false)
    })
  }

  function onFilesError(error, file) {
    console.log('error code ' + error.code + ': ' + error.message)
    setError('error code ' + error.code + ': ' + error.message)
  }

  return (
    <Wrapper
      content='inputText'
      id={id}
      orderId={orderId}
      data={{
        id,
        type,
        label,
        placeholder,
        numbermin,
        numbermax,
        readonly,
        step,
        maxlength,
        pattern,
        footnote,
        required,
        multiple,
        accept,
        maxFilesize,
        maxFiles,
        icon
      }}
    >
      <div className='my-3'>
        <label
          htmlFor={label}
          className='block text-sm font-medium text-gray-700 flex items-center gap-2'
        >
          <i className={icon} />
          <span>{label}</span>
          {required && <span>*</span>}
        </label>
        {type !== 'file' ? (
          <div className='flex items-stretch mt-2'>
            <input
              title={label}
              type={type}
              className='p-2.5 block w-full rounded-md border disabled:cursor-not-allowed'
              id={id}
              name={id}
              placeholder={placeholder ? placeholder : ''}
              min={numbermin}
              max={numbermax}
              maxLength={maxlength}
              readonly={readonly && 'readonly'}
              disabled={readonly}
              step={step}
              pattern={pattern}
              multiple={multiple}
              required={required}
              defaultValue={data && data[id]}
              onBlur={(event) => changeHandler(event)}
            />
          </div>
        ) : (
          <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
            <div className='space-y-1 text-center'>
              {uploading && 'uploading...'}
              {data && data[id] && data[id].length > 0 ? (
                <div className='flex items-start justify-center gap-2 mb-4'>
                  {data[id].map((image) => {
                    console.log('IMAGE AFTER UPLOAD IN LOOP: ', image)
                    return (
                      <div
                        key={image}
                        className='flex-shrink-0 w-24 h-24 ring-1 ring-indigo-600 p-0.5 rounded-md overflow-hidden'
                      >
                        <img
                          alt='to upload'
                          src={image}
                          className='w-full h-full object-center object-contain rounded-md'
                        />
                      </div>
                    )
                  })}
                </div>
              ) : (
                <svg
                  className='mx-auto h-12 w-12 text-gray-400'
                  stroke='currentColor'
                  fill='none'
                  viewBox='0 0 48 48'
                  aria-hidden='true'
                >
                  <path
                    d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              )}
              <Files
                className='cursor-pointer files-dropzone'
                onChange={onFilesChange}
                onError={onFilesError}
                multiple={multiple}
                accepts={accept}
                maxFiles={maxFiles}
                maxFileSize={Number(maxFilesize) * 1000000}
                minFileSize={0}
                clickable
              >
                Drop files here or <span className='text-indigo-600'>click to upload</span>
              </Files>
              <p className='text-xs text-gray-500'>
                <span className='font-semibold'>{accept && `Only ${accept}`}</span> up to
                {maxFilesize && ` ${maxFilesize} mb`}
              </p>
              {error && <p className='text-xs font-sembold mt-1 text-red-600'>{error}</p>}
            </div>
          </div>
        )}
        <small className='text-gray-500 text-xs mt-1'>{footnote}</small>
      </div>
    </Wrapper>
  )
}

export default Input
