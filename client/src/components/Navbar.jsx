import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex justify-between py-2 px-2 lg:px-20 text-white'>

        <h1 className='text-3xl md:text-4xl lg:text-5xl font-light m-0 font-serif'>
          MY.DEVOTION
          </h1>

        <div className='flex items-center gap-12'>
            <Link to ="/" className='text-base tracking-wider hover:text-gray-300 z-50'>HOME</Link>
            {/* <Link to ="/about" className='text-base tracking-wider hover:text-gray-300 z-50' >ABOUT</Link> */}
            <Link to ="/login" className='text-base tracking-wider hover:text-gray-300 z-50'>LOGIN</Link>
            {/* <Link to ="/register">SIGNUP</Link> */}
        </div>

    </div>
  )
}

export default Navbar;