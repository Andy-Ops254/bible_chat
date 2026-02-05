import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Register() {
    const [register, setRegister] = useState ({
        email:' ',
        password: ' '
    })

    const navigate = useNavigate()

    function handleChange(e) {
        const{name, value} =e.target
        setRegister({...register, [name]: value})
    }

    const registerData = {...register}

    function handleSubmit(){
        e.preventDefault()
        fetch('http//127.0.0.1:5555/users', {
            methods:'POST',
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
        return res.json
        })

        .then(data =>{
            console.log("Success", data),
            setRegister ({
                'email': '',
                'password': ''
            })
        })
        navigate("/login")

    }
  return (
    <div>
        <h1>"Scripture for Every Season"</h1>
        <form onSubmit={handleSubmit} >
            <input 
            type='text' 
            name='email' 
            placeholder='Email'
            value={register.email}
            onChange={handleChange}
            required 
            />

            <input 
            type='text'
            name='password'
            placeholder='Password'
            value={register.password}
            onChange={handleChange}
            required
            />

            <button type='submit' >
                Create Account
                </button>
        </form>

        <p>Already have an account? 
            <Link to={'/login'} >LogIn here</Link>
        </p>
    </div>
  )
}

export default Register