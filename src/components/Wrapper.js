import React from 'react'

const Wrapper = (props) => {
  return (
    <div className='h-screen bg-gray-800 '>{props.children}</div>
  )
}

export default Wrapper