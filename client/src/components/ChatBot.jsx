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
                "Authorization": `Bearer ${token}`
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
            console.log(data)
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4">
        
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">
        Scripture ChatBot
        </h2>
        <p className="text-sm text-gray-500 text-center">
        Share how you're feeling and receive a verse
        </p>

        {/* Error Message */}
        {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
        </div>
        )}

        {/* Response Card */}
        {response && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
            <p className="text-sm text-gray-600 italic">
            "{response.verse.text}"
            </p>
            <p className="text-xs font-semibold text-blue-800">
                {response.verse.reference}
            </p>
            {response.message && (
            <p className="text-sm text-gray-700 mt-2">
                {response.message}
            </p>
            )}
            {response.emotion_detected && (
                <p className='text-sm text-red-500 mt-2'>
                    {response.emotion_detected}
                </p>
            )}
        </div>
        )}

        {/* Loading State */}
        {loading && (
        <div className="flex items-center justify-center gap-2 text-gray-600">
            <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <p>Finding verse...</p>
        </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Type your feelings..."
            value={input}
            onChange={handleChange}
            rows={4}
        />

          {/* Character Counter */}
        <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
            {input.length}/250 characters
            </span>
            
            {/* Send Button */}
            <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
            {loading ? 'Sending...' : 'Send'}
            </button>
        </div>
        </form>

    </div>
    </div>
    )
}

export default ChatBot