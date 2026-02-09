import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import About from './About'
import Register from './Register'
import LogIn from './LogIn '

function App() {
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
  return (
    <>
      <Navbar onOpenLoginModal={openLoginModal} />
      <About />
      {showLoginModal && <LogIn onCloseLoginModal={closeLoginModal} onSwitchToRegister={switchToRegister} />}
      {showRegisterModal && <Register onCloseRegisterModal={closeRegisterModal} onSwitchToLogin={switchToLogin} />}
    </>
  )
}

export default App