import React from 'react'
import 'boxicons/css/boxicons.min.css';


function About() {
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
        
                <button className='font-bold bg-blue-400 p-4 rounded-full mt-4 hover:bg-blue-500 hover:text-green-300'>
                TRY NOW 
                <i className="bx bx-arrow-out-up-right-square px-[1.8px] font-light" />
                </button>
            
        </div>

    
    
        </div>
    
  )
}

export default About