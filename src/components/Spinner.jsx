import React from 'react'
import { PulseLoader } from 'react-spinners'


const Spinner = ({ loading, message = "Loading..."}) => {
  if (!loading) return null

  return (
    <div className={`flex flex-col items-center justify-center min-h-[50vh]`}>
      <PulseLoader color="#36d7b7" size={20} margin={5}/>
      <p className="mt-4 text-lg font-medium text-white">{message}</p>
    </div>
  )
}

export default Spinner
