import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Navbar({onOpenLoginModal, onLogout, isAuthenticated}) {
  console.log("isAuthenticated:", isAuthenticated)
  const navigate = useNavigate()

  function handleLogout() {
    onLogout()
    navigate('/')
  }

  function handleChat() {
    navigate('/chatbot/emotion')
  }

  return (
    <nav className="relative z-20 bg-black/30 backdrop-blur-md w-full">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">

        <h1 
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
          className="text-3xl md:text-4xl lg:text-5xl font-light m-0 font-serif hover:opacity-80 transition-opacity text-white cursor-pointer"
          onClick={() => navigate('/')}
        >
          MY.DEVOTION
        </h1>

        <div className="flex items-center gap-8 md:gap-12">
          {isAuthenticated ? (
            <>
              <Link 
                to="/daily_reading" 
                className="text-sm md:text-base tracking-wider hover:text-blue-300 text-white transition-colors"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1000"
              >
                HOME
              </Link>

              <button
                className="text-sm md:text-base tracking-wider hover:text-blue-300 text-white transition-colors flex items-center gap-2"
                type="button"
                onClick={handleChat}
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1500"
              >
                <i className="bx bx-discussion"></i>
                <span className="hidden sm:inline">Chat</span>
              </button>

              <button
                type="button"
                className="text-sm md:text-base tracking-wider hover:text-blue-300 text-white transition-colors"
                onClick={handleLogout}
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="2000"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <button
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="1000"
                type="button"
                className="text-sm md:text-base tracking-wider hover:text-blue-300 text-white transition-colors px-6 py-2 border border-white/30 rounded-md hover:bg-white/10"
                onClick={onOpenLoginModal}
              >
                LOGIN
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar