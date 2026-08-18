import React from 'react'
import 'boxicons/css/boxicons.min.css';
import {useState, useEffect} from 'react'
import LogIn from './LogIn ';
import Register from './Register';
import {Quote} from 'lucide-react'
import { useNavigate } from 'react-router-dom';
// import cross from '../assets/cross.svg';


const neuCard = `
    bg-[#F1F5FE]
    rounded-2xl
    shadow-[8px_8px_20px_rgba(18,34,62,0.10),-8px_-8px_20px_rgba(255,255,255,0.85)]
    transition-all duration-300 ease-out
    hover:shadow-[12px_12px_28px_rgba(18,34,62,0.13),-12px_-12px_28px_rgba(255,255,255,0.9)]
    hover:-translate-y-1`

    const features = [
      {
        icon:'📖',
        title:"Full Bible Library",
        body:"Access the complete Old and New Testament across multiple translations — KJV, NIV, ESV, and more — with sie-by-side comparison."
      },

      {
        icon:'✍️',
        title:"Guided Devotionals",
        body:"Daily readings and reflections crafted by theologians to bring scripture alive in your everyday moments."
      },

      {
        icon:'🤖',
        title:"Chatbot",
        body:"Get scriptures tailored for your feelings"
      }
    ]

function About() {
    const  navigate = useNavigate()

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
      <section className='flex-1 flex items-center justify-center px-4'>
      <div className='flex flex-col items-center text-center max-w-2xl  '>
        <div 
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
        className="w-[220px] h-[220px] rounded-full flex items-center justify-center"
          style={{
      background: 'radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)',
    }}
        
        >
          <svg
            viewBox="0 0 87.16 122.88"
            className="h-[150px] w-auto"
            aria-hidden="true"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF3B0" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#9C7A1E" />
              </linearGradient>

            <filter id="crossGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
            </defs>
            <polygon
              fill="url(#goldGradient)"
              points="87.16,28.3 87.16,51.47 55.17,51.47 55.17,122.88 31.99,122.88 31.99,51.47 0,51.47 0,28.3 31.99,28.3 31.99,0 55.17,0 55.17,28.3 87.16,28.3"
            />
          </svg>
        </div>

          <div
            className='text-center text-black mx-auto max-w-2xl'
            data-aos='fade-right'
            data-aos-offset='300'
            data-aos-easing='ease-in-sine'
          >
            <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-serif'>
              THE WORD,<br /> ILLUMINATED.
            </h2>
            <p className='mt-8 text-lg font-medium px-4 leading-relaxed italic text-[#c8b89a]'>
              "Life brings moments of joy, anxiety, and everything in between.
              We're here to meet you in those moments with Scripture that speaks directly to your heart,
              offering peace, hope, and a deeper connection with God."
            </p>

            <button
              className='font-bold bg-[linear-gradient(135deg,#c9a84c_0%,#8a6f2e_100%)] px-6 py-4 rounded-lg mt-6 hover:scale-105 hover:brightness-110 transition-all duration-300 cursor-pointer'
              onClick={openRegisterModal}
            >
              TRY NOW
              <i className='bx bx-arrow-out-up-right-square ml-2 text-xl' />
            </button>
          </div>
          </div>
      </section>

      <div>
          <div 
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
          className='text-center mt-20'>
            <h3 className='text-xs tracking-widest uppercase text-[#c9a84c] mb-4'>
              WHAT AWAITS YOU
            </h3>
            <h2 className='text-3xl md:text-4xl mb-14 text-black font-black '>
              DEEPEN YOUR FAITH
            </h2>
          </div>

          <div 
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14'>
            {features.map(({icon, title, body})=> (
              <div key={title} className={`${neuCard} p-7 flex flex-col gap-4`} > 
                <div className='w-5 h-5'>
                  {icon}
                </div>

                <div>
                  <h3 className='font-bold text-black text-base mb-1'>
                    {title}
                  </h3>
                  <p className='font-light italic font-mono text-xs leading-relaxed text-[#c9a84c]'> 
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className='h-64  max-w-full bg-[#1a2840] mt-24 flex items-center justify-center'>
            <div 
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
            className='flex flex-col items-center text-center gap-3'>
            
            <Quote className='w-8 h-8 text-[#c9a84c] opacity-30'/>
            <h2 className='text-2xl md:text-3xl leading-relaxed mb-6 italic text-[#f5ead7]'>
              Thy word is a lamp unto my feet, and a light unto my path.
            </h2>
            <p className='text-sm tracking-widest uppercase font-normal text-[#c9a84c]'>
              Psalm 119:105
            </p>
            </div>
          </div>

        <div className='h-80 flex items-center justify-center mt-24'>
          <div 
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
          className='flex flex-col items-center text-center gap-3 mt-4'>
            <h2 className='text-3xl md:text-4xl mb-4 font-bold'>
              "BEGIN YOUR JOURNEY"
            </h2>

            <p className='text-sm tracking-widest uppercase font-normal text-[#c9a84c] italic'>
              "If anyone thirsts, let him come to Me and drink. He who believes in Me,<br/>
              as the Scripture has said, out of his heart will flow rivers of living water."
            </p>

            <button 
            onClick={openRegisterModal}
            className='font-bold bg-[linear-gradient(135deg,#c9a84c_0%,#8a6f2e_100%)] px-6 py-4 rounded-lg mt-6 hover:scale-105 hover:brightness-110 transition-all duration-300 cursor-pointer'>
              Create Account
            </button>

            </div>
          </div>
        </div>

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