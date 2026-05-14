import React from 'react'

function Footer() {
  return (
    <footer className="bg-transparent text-slate-400 py-8 px-4 mt-auto w-full cursor-pointer">
    <div className="max-w-6xl mx-auto">
        {/* Desktop Layout */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
        
          {/* Brand */}
        <div className="text-center md:text-left"
        data-aos="fade-up"
        data-aos-duration="3000"
        >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100"
            
            >
            FORM NI GOD
            </h2>
        </div>

          {/* Contact Info */}
        <div className="space-y-2 text-center md:text-left"
        data-aos="fade-up"
        data-aos-duration="3500"
        >
            <p 
            className="flex items-center justify-center md:justify-start gap-2 text-slate-400 hover:text-slate-100 transition">
                <i className="bx bx-phone text-lg"></i>
                <span>+254 758 43316</span>
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2 text-slate-400 hover:text-slate-100 transition">
                <i className="bx bx-at text-lg"></i>
                <span>arimoneycreatives@gmail.com</span>
            </p>
            </div>

          {/* Copyright */}
        <div className="text-center md:text-right"
        data-aos="fade-up"
        data-aos-duration="4000"
        >
            <p className="text-sm text-slate-500">
                &copy; 2026 ARIMONEY CREATIVES
            </p>
        </div>

        </div>
    </div>
    </footer>
  )
}

export default Footer