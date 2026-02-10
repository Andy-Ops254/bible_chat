import React from 'react'
import {useState, useEffect} from 'react'

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
        console.error("❌ Failed to fetch:", err.message);
        setLoading(false)
    });
    },[])

    function daily_reading() {
      if(loading) {
        return (
        <div>
          <i className="bx bx-loader-lines-alt" />
          <p>Loading verse ...</p>
        </div>)
      }
      else if (verse !==null) {
        return(
          <div>
            <h3>{verse.date}</h3>
            <h1>{verse.text}</h1>
            <h2>{verse.reference}</h2>
          </div>
        )
      }

      else{
        return(
          <div>
            <i className="bx bx-sad" />
            <p>Couldn't load Verse....!</p>
          </div>
        )
      }
    }
  
    return (
      <div>
        {daily_reading()}
      </div>
    )
}

export default DailyReading