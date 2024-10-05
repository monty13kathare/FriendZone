
import React from 'react'
import { ScaleLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <ScaleLoader color="#23d3ae" />
    </div>
  )
}

export default Loader