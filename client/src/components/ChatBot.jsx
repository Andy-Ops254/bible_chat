import React from 'react'
import { useState } from 'react'

function ChatBot() {
    // states im going to need for this component
    const [input, setInput]=useState('')
    const[response, setResponse]=useState(null)
    const[loading, setLoading]=useState(false)
    const [error, setError] = useState(null)  


    function handleChange(e) {
        const value = e.target.value;
        if (value.length <= 250) {
            setInput(value)
            setError(null)
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!input.trim()) {
            setError("Please enter how you are feeling")
            return
            
        }
        if(input.length > 250) {
            setError("characters exceed 250")
            return
        }
        if(loading) {
            return
        }

        // start fetch
        setLoading(true)
        setError(null)

        const token = localStorage.getItem('access_token')

        fetch('http://127.0.0.1:5555/chatbot/emotion', {
            method:"POST",
            headers :{
                "Content-Type": "application/json",
                "Authorization": 'Bearer ${token}'
            },
            body:JSON.stringify({emotion_text:input}) 
        })
        .then(res => {
            if(!res.ok) {
                throw new Error("Couldn't match a Verse!")
            }
            return res.json()
        })
        .then(data => {
            setLoading(false)
            setResponse(data)
            setInput('')
        })
        .catch((err) => {
            setError("Failed to get verse, please try again!")
            console.error("Error:", err)
            setLoading(false)
            
        })
        }
    
    return (
    <div>
        {/* Error display */}
        {error && (
            <div style={{color: 'red'}}>
                {error}
            </div>
        )}
        
        {/* Response card */}
        {response && (
            <div>
                <p>You said: {input}</p>
                <p>{response.verse_text}</p>
                <p>{response.scripture}</p>
                <p>{response.message}</p>
            </div>
        )}
        
        {/* Loading */}
        {loading && (
            <div>
                <i className="bx bx-loader-alt animate-spin" />
                <p>Finding verse...</p>
            </div>
        )}
        
        {/* Input area */}
        <textarea
            placeholder='Type your feelings...' 
            value={input}
            onChange={handleChange}
        />
        
        {/* Character counter */}
        <p>{input.length}/250</p>
        
        {/* Send button */}
        <button 
            type="button" 
            onClick={handleSubmit} 
            disabled={loading || !input.trim()}  // Disable when loading or empty
        >
            {loading ? "Sending..." : "Send"}
        </button>
    </div>
)
}


export default ChatBot