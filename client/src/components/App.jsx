import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import About from './About'
import Register from './Register'
import LogIn from './LogIn '
import DailyReading from './DailyReading'
import { Routes, Route, useLocation } from 'react-router-dom'
import ChatBot from './ChatBot'

function App() {
      const location = useLocation()

      // state for the modals
    const[showRegisterModal, setShowRegisterModal] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Check if user is already logged in on mount
    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if (token) {
            setIsAuthenticated(true)
        }
    }, [])

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

    function handleLogout() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        setIsAuthenticated(false)
    }

    function handleLogin (){
        setIsAuthenticated(true)
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
    <Navbar
     onOpenLoginModal={openLoginModal}  
     isAuthenticated={isAuthenticated} 
     onLogout={handleLogout}/>

    <Routes>
        <Route path='/' element={<About />} />
        <Route path='/daily_reading' element={<DailyReading />} />
        <Route path ='/chatbot/emotion' element={<ChatBot />} />
    </Routes>

    {showLoginModal && 
    <LogIn onCloseLoginModal={closeLoginModal} 
    onSwitchToRegister={switchToRegister} 
    onLoginSuccess={handleLogin} />}

    {showRegisterModal
     && <Register onCloseRegisterModal={closeRegisterModal} 
     onSwitchToLogin={switchToLogin}  
     onLoginSuccess={handleLogin}/>}
    </>
    )
}

export default App