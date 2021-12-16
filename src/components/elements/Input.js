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
  const { changeHandler, changeFiles, deleteFile, data } = useContext(FormContext)
  const fileshere = data && data[id] ? data[id] : []
  const [uploading, setUploading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const [error, setError] = useState([])
  function onFilesChange(files) {
    if (fileshere.length > maxFiles - 1) {
      setError(`error: Maximum number of files (${maxFiles}) reached!`)
      setDisabled(true)
    } else {
      setUploading(true)
      console.log('BEFORE LOOP ')

      const uploadedafter = files.map((file) => {
        console.log('FILE PARAMS: ', file)
        const filetype = file.type
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
            data['mimetype'] = filetype
            fileshere.push(data)
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
              onBlur={(event) => changeHandler(id, event.target.value)}
            />
          </div>
        ) : (
          <div className='mt-1 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
            <div className='space-y-1 text-center'>
              {uploading && 'uploading...'}
              {data && data[id] && data[id].length > 0 ? (
                <ul className='max-w-screen-sm mx-auto border border-gray-200 rounded-md divide-y divide-gray-200 text-xs'>
                  {data[id].map((image, ind) => {
                    console.log('IMAGE AFTER UPLOAD IN LOOP: ', image)
                    return (
                      <li
                        key={image.secure_url}
                        className='pl-3 pr-4 py-3 flex items-center justify-between'
                      >
                        <div className='w-0 flex-1 flex items-center'>
                          {image.mimetype.startsWith('image/') ? (
                            <img
                              src={image.secure_url}
                              alt={image.original_filename}
                              className='h-8 bg-gray-50'
                            />
                          ) : (
                            <svg
                              className='flex-shrink-0 h-5 w-5 text-gray-400'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              aria-hidden='true'
                            >
                              <path
                                fillRule='evenodd'
                                d='M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z'
                                clipRule='evenodd'
                              />
                            </svg>
                          )}
                          <span className='ml-2 flex-1 w-0 truncate text-sm'>
                            {image.original_filename}
                          </span>
                        </div>
                        <div className='ml-4 flex-shrink-0'>
                          <a
                            className='font-semibold text-indigo-600 hover:text-indigo-500'
                            rel='noreferrer'
                            href={image.secure_url}
                            target='_blank'
                          >
                            View
                          </a>
                        </div>
                        <div className='ml-4 flex-shrink-0'>
                          <span
                            onClick={() => deleteFile(id, ind)}
                            className='cursor-pointer font-semibold text-red-600 hover:text-red-500'
                          >
                            Delete
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
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
              {!disabled && (
                <Files
                  disabled={disabled}
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
              )}
              <p className='text-xs text-gray-500'>
                {'Only ' + maxFiles + ' ('}
                {accept && `${accept})`} up to
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
