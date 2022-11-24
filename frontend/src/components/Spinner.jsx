import React from 'react'
import { ColorRing } from 'react-loader-spinner';

const Spinner = ({ message }) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <ColorRing
        visible={true}
        wrapperClass="blocks-wrapper"
        ariaLabel="blocks-loading"
        colors={['#6b9080', '#a4c3b2', '#cce3de', '#eaf4f4', '#f6fff8']}
        height={50}
        width={200}
        className='m-5'
      />

      <p className='text-lg text-center px-2'>{message}</p>
    </div>
  )
}

export default Spinner