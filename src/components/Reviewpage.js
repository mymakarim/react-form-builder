import React from 'react'

export default function Reviewpage({ data }) {
  return (
    <section>
      <div className='bg-white overflow-hidden rounded-lg border my-4'>
        <div>
          <dl>
            {Object.entries(data).map((item, id) => {
              console.log('ITEM: ', item)
              return (
                <div
                  key={id}
                  className={`${
                    id % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                >
                  <dt className='text-sm font-medium text-gray-500'>{item[0]}</dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex gap-2'>
                    {Array.isArray(item[1])
                      ? item[1].map((itm) => {
                          return <span>{itm}</span>
                        })
                      : item[1]}
                  </dd>
                </div>
              )
            })}
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Attachments</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                <ul className='border border-gray-200 rounded-md divide-y divide-gray-200'>
                  <li className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'>
                    <div className='w-0 flex-1 flex items-center'>
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
                      <span className='ml-2 flex-1 w-0 truncate'>
                        resume_back_end_developer.pdf
                      </span>
                    </div>
                    <div className='ml-4 flex-shrink-0'>
                      <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
                        Download
                      </a>
                    </div>
                  </li>
                  <li className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'>
                    <div className='w-0 flex-1 flex items-center'>
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
                      <span className='ml-2 flex-1 w-0 truncate'>
                        coverletter_back_end_developer.pdf
                      </span>
                    </div>
                    <div className='ml-4 flex-shrink-0'>
                      <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
                        Download
                      </a>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
