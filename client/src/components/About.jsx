import React from 'react'
import 'boxicons/css/boxicons.min.css';
import {useState, useEffect} from 'react'
import LogIn from './LogIn ';
import Register from './Register';



function About() {
    // const  navigate = useNavigate()

    // state for the modals
    const[showRegisterModal, setShowRegisterModal] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)


 // useEffect to prevent scrolling on the backdrop
    useEffect(() => {
        if(showLoginModal || showRegisterModal) {
            document.body.style.overflow = 'hidden'
        }
        else {
            document.body.style.overflow=''
        }

        return () => {
            document.body.style.overflow= ''
        }
        

    }, [showLoginModal,showRegisterModal])

    // functions for the modal
    function openRegisterModal() {
        setShowRegisterModal(true);
    }

    function openLoginModal() {
        setShowLoginModal(true)
    }

    function closeRegisterModal() {
        setShowRegisterModal(false)
    }

    function closeLoginModal() {
        setShowLoginModal(false)
    }

    // functions for the links
    function switchToLogin() {
        
            setShowRegisterModal(false)
            setShowLoginModal(true)
        }
    

    function switchToRegister() {
        setShowLoginModal(false)
        setShowRegisterModal(true)
    }

    //  function handleClick (){
    //     navigate("/register")
    //  }
  return (
    <div className='min-h-screen flex flex-col bg-white text-slate-900'>
      <section className='relative overflow-hidden'>
        <div className='absolute inset-0'>
          <div
            className='h-full w-full bg-cover bg-center'
            style={{
              backgroundImage:
                'url("https://plus.unsplash.com/premium_photo-1764464679847-cc192d4034f0?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMyfHx8ZW58MHx8fHx8")',
            }}
          />
          <div className='absolute inset-0 bg-slate-950/40' />
        </div>

        <div className='relative z-10 flex min-h-[72vh] items-center justify-center px-4'>
          <div
            className='text-center text-white mx-auto max-w-2xl'
            data-aos='fade-right'
            data-aos-offset='300'
            data-aos-easing='ease-in-sine'
          >
            <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-serif'>
              Welcome to Bible-devotion
            </h2>
            <p className='mt-8 text-lg font-medium px-4 leading-relaxed'>
              "Life brings moments of joy, anxiety, and everything in between.
              We're here to meet you in those moments with Scripture that speaks directly to your heart,
              offering peace, hope, and a deeper connection with God."
            </p>

            <button
              className='font-bold bg-blue-600 px-6 py-4 rounded-lg mt-6 hover:bg-blue-500 active:bg-blue-700 transition-colors duration-200 cursor-pointer'
              onClick={openRegisterModal}
            >
              TRY NOW
              <i className='bx bx-arrow-out-up-right-square ml-2 text-xl' />
            </button>
          </div>
        </div>
      </section>

      <section className='bg-white min-h-[35vh]' />

      {/* Conditional rendering so that when state changes the forms render accordingly */}
      {showRegisterModal && (
        <Register onSwitchToLogin={switchToLogin} onCloseRegisterModal={closeRegisterModal} />
      )}

      {showLoginModal && (
        <LogIn onSwitchToRegister={switchToRegister} onCloseLoginModal={closeLoginModal} />
      )}
    </div>
  )
}

export default About