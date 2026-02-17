import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LogIn ({onCloseLoginModal, onSwitchToRegister, onLoginSuccess}) {

    const navigate = useNavigate()

    const [logData, setlogData] = useState({
        email:"",
        password:""

    })

    function handleChange(e) {
        const{name, value} = e.target
        setlogData({...logData, [name]:value})
    }

    const credentials = {
        ...logData
    }

    function handleSubmit(e){
    
        e.preventDefault()
    
    fetch('http://127.0.0.1:5555/login', {
        method:"POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    .then(response => {
        // console.log("success", response.status)
        if (!response.ok){
            throw new Error ("LogIn failed")
        }
        return response.json()
    })
    .then(data => {
        // console.log("Green", data)
        // Store token in localStorage
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        setlogData ({
            email: '',
            password: ''
        })
        onLoginSuccess()
        // Navigate to daily reading page
        navigate('/daily_reading')
        onCloseLoginModal()
    
    })

    .catch((err) => {
        console.error("❌ Login failed:", err.message);
    });
}
  return (
    // Backdrop
    <div className='fixed inset-0 bg-gray bg-opacity-20 backdrop-blur-md z-50 flex items-center justify-center cursor-pointer' onClick={onCloseLoginModal}>
        {/* form container */}
        <div className='bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full mx-4' onClick={(e) => e.stopPropagation()}>
        {/* <div className='max-w-md w-full mx-auto p-8 sm:p-10 bg-white space-y-8 rounded-2xl shadow-2xl'> */}
        <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8'>
            "Bonga Na God Binadamu Huzima Simu!"
        </h1>

        <form
        className='flex flex-col space-y-4 '
        onSubmit={handleSubmit}>
            <input 
            className='w-full h-12 px-4 py-3 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            type='text'
            name='email'
            value={logData.email}
            placeholder='Email'
            onChange={handleChange}
            required
            />

            <input 
            className='w-full h-12 px-4 py-3 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            type='password'
            name='password'
            value={logData.password}
            placeholder='password'
            onChange={handleChange}
            required
            />

            <button 
            type='submit'
            className='w-full h-12 mt-6 rounded-lg bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200'
            >
                LogIn
                </button>
        </form>

        <p 
        className='font-light tracking-wider text-base text-center mt-6'
        >
            Don't have an Account?
            <button
            type='button'
            onClick={onSwitchToRegister}
            className='font-medium hover:text-blue-500 px-2 underline cursor-pointer transition-colors'
            >
                SIGN UP HERE
            </button>
        </p>

    </div>
    </div>
    // </div>
  )
}

export default LogIn 