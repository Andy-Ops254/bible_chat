import React from 'react'
import { useState } from 'react'

function Register({onCloseRegisterModal, onSwitchToLogin}) {
    const [register, setRegister] = useState ({
        email:"",
        password:""
    })

    // const navigate = useNavigate()

    function handleChange(e) {
        const{name, value} =e.target
        setRegister({...register, [name]: value})
    }

    const registerData = {...register}

    function handleSubmit(){
        e.preventDefault()
        fetch('/users', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        })
        .then(res =>{
            console.log("Success", res.status)
            if (!res.ok) {
                throw new Error("Invalid Login")
            }
        return res.json()
        })

        .then(data =>{
            console.log("Success", data),
            // navigate("/login")
            setRegister ({
                'email': '',
                'password': ''
            })
        })
        

    }
  return (
    // backdrop div
    <div className='fixed inset-0 bg-gray bg-opacity-20 backdrop-blur-md z-50 flex items-center justify-center cursor-pointer' onClick={onCloseRegisterModal}>

        {/* form container*/}
        <div className='bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full mx-4' onClick={(e) => e.stopPropagation()}>

        {/* form details and functionalities */}
        {/* <div className='max-w-md w-full mx-auto p-8 sm:p-10 bg-white space-y-8 rounded-2xl shadow-2xl'> */}

        <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8'>
            "Scripture for Every Season"
        </h1>

        <form
        onSubmit={handleSubmit}
        className='flex flex-col space-y-4 '
        >
            <input
            className='w-full h-12 px-4 py-3 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            type='text' 
            name='email' 
            value={register.email}
            placeholder='Email'
            onChange={handleChange}
            required 
            />

            <input 
            className='w-full h-12 px-4 py-3 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            type='password'
            name='password'
            value={register.password}
            placeholder='Password'
            onChange={handleChange}
            required
            />

            <button 
            type='submit'
            className='w-full h-12 mt-6 rounded-lg bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200'
            >
                Create Account
                </button>
        </form>

        <p className='font-light tracking-wider text-base text-center mt-6'>
            Already have an account? 
            <button
            type='button'
            className='font-medium hover:text-blue-500 px-2 cursor-pointer underline transition-colors'
            onClick={onSwitchToLogin}
            >
                LogIn here
            </button>
        </p>
    </div>
    </div>
    // </div>
  )
}

export default Register