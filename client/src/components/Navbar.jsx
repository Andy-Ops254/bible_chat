import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Navbar({onOpenLoginModal, onLogout, isAuthenticated}) {
  console.log("isAthenticated:", isAuthenticated)
  const navigate = useNavigate()

  function handleLogout() {
    onLogout()
    navigate('/')
  }

  function handleChat() {
    navigate('/chatbot/emotion')
  }

  return (
    <div className='flex justify-between py-2 px-2 lg:px-20'>

        <h1 
        className='text-3xl md:text-4xl lg:text-5xl font-light m-0
        font-serif hover:opacity-80 transition-opacity text-blue-300'>

          MY.DEVOTION
        </h1>

        <div className='flex items-center gap-12'>
            {isAuthenticated ? (
              <>

                <Link to="/daily_reading" 
                className='text-base tracking-wider hover:text-blue-400 text-black'>
                  HOME
                </Link>

                <button
                className='text-base tracking wider hover:text-blue-400  text-black'
                type='button'
                onClick={handleChat}
                >
                  <i class="bx bx-discussion" />
                  Chat
                </button>

                <button
                  type='button'
                  className='text-base tracking-wider hover:text-blue-400  text-black'
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>

                
              </>
            ) : (
              <>
                <button
                  type='button'
                  className='text-base tracking-wider hover:text-blue-400 z-50 text-white transition-colors'
                  onClick={onOpenLoginModal}
                >
                  LOGIN
                </button>
              </>
            )}
        </div>

    </div>
  )
}

export default Navbar;