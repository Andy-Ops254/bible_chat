import React from 'react'
import {useState, useEffect} from 'react'
import Footer from './Footer'


function DailyReading() {
    const [verse, setVerse] = useState(null)
    const [loading, setLoading]=useState(true)

    useEffect(() => {
        setLoading(true)

        fetch('http://127.0.0.1:5555/daily_reading')
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch verse!')
          }
          return res.json()
        })
        .then (data => {
          // console.log(data)
            setVerse({
                "date": data.date,
                "book" : data.book,
                "chapter" : data.chapter,
                "verse" : data.verse,
                "reference" : `${data.book} ${data.chapter}: ${data.verse}`,
                "text": data.text
            })
            setLoading(false)
        })
        .catch((err) => {
        console.error(" Failed to fetch:", err.message);
        setLoading(false)
    });
    },[])

    function daily_reading() {
      if(loading) {
        return (
        <div className='flex flex-col items-center justify-center p-6 mt-24'>
          <i className="bx bx-loader-lines-alt text-3xl animate-spin" />

          <p className='text-base mt-2 text-gray-600'>
            Loading verse ...
          </p>

        </div>)
      }
      else if (verse !==null) {
        return(
          <div className='dark:bg-gray-100 rounded-2xl shadow-xl p-6 md:p-8 max-w-3xl
          mx-auto my-30 flex flex-col gap-4 text-black dark:text-black'>
          
            <h3 className='text-xs md:text-sm text-gray-400 dark:text-gray-500 font-semibold font-serif'>
              {verse.date}
            </h3>

            <h1 className='text-lg md:text-2xl lg:text-3xl font-serif font-bold mb-2 leading-relaxed'>
              "{verse.text}"
            </h1>

            <h2 className='text-sm md:text-base text-gray-600 dark:text-gray-400 italic'>
              "{verse.reference}"
            </h2>
          </div>
        )
      }

      else{
        return(
          <div className='flex flex-col items-center justify-center p-6 text-center text-red-600 mt-32'>
            <i className="bx bx-sad text-3xl" />

            <p className='mt-2 text-2xl text-red-500'>
              Couldn't load Verse...!
            </p>
          </div>
        )
      }
    }
  
    return (
      <div
      data-aos="fade-right"
      data-aos-offset="300"
      data-aos-easing="ease-in-sine"
      >
        {daily_reading()}
        {/* <Footer /> */}
      </div>
      
    )
}

export default DailyReading