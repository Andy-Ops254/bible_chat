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
    <div>
        <img
        alt="Bible"
        src="https://plus.unsplash.com/premium_photo-1764464679847-cc192d4034f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMyfHx8ZW58MHx8fHx8"
        className='absolute inset-0 -z-10 size-full object-cover object-right md:object-center bg-black/20'
        />



        <div 
        className='text-center dark:text-white mx-auto max-w-2xl mt-36'>
            <h2 className='text-4xl md:text-4xl lg:text-6xl font-bold tracking-tight font-serif'>
                Welcome to Bible-devotion
            </h2>
            <p className='mt-8 text-lg text-pretty font-medium p-4'>
                "Life brings moments of joy, anxiety, and everything in between.
                We're here to meet you in those moments with Scripture that speaks directly to your heart, 
                offering peace, hope, and a deeper connection with God."
            </p>
        
                <button 
                className='font-bold bg-blue-700 p-4 rounded-lg mt-4 hover:bg-blue-500 hover:text-green-300 active:bg-blue-800 transition-colors duration-200 cursor-pointer'
                onClick={openRegisterModal}>
                TRY NOW 
                <i className="bx bx-arrow-out-up-right-square px-[1.8px] font-light" />
                </button>
            
        </div>

    {/* Conditional rendering so that when state changes the forms render accordingly */}
        {/* <Navbar onOpenLoginModal={openLoginModal} /> */}
        
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