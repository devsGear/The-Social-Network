import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Password reset requested for:', email)

    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="font-mono max-w-lg w-full bg-gray-50 border-2 border-black p-6">
        <header className="mb-5 pb-3 border-b-2 border-black text-center">
          <h1 className="text-2xl uppercase tracking-widest">The Social Network</h1>
          <p className="italic text-base mt-1">Password Recovery</p>
        </header>

        {!submitted ? (
          <>
            <div className="mb-5 text-center">
              <p className="text-base">Enter your email address and we'll send you instructions to reset your password.</p>
            </div>

            <form onSubmit={handleSubmit} className="mb-5">
              <div className="mb-5">
                <label className="block mb-2 text-base font-bold" htmlFor="email">Email Address:</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email} 
                  onChange={handleEmailChange} 
                  className="w-full px-3 py-2 border-2 border-black font-mono text-base focus:outline-none"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full py-3 px-4 bg-gray-200 border-2 border-black font-bold hover:bg-gray-300 text-base"
              >
                RESET PASSWORD
              </button>
            </form>
          </>
        ) : (
          <div className="my-8 p-5 border-2 border-dashed border-black text-center">
            <p className="text-base mb-3">If an account with that email exists, we've sent password reset instructions.</p>
            <p className="text-sm italic">Please check your inbox and spam folder.</p>
          </div>
        )}
        
        <div className="text-center border-t-2 border-black pt-4">
          <p className="mb-3 text-sm">Remember your password?</p>
          <Link 
            to="/signin" 
            className="inline-block px-4 py-2 border-2 border-dashed border-black text-sm hover:bg-gray-200"
          >
            Back to Sign In
          </Link>
        </div>
        
        <footer className="mt-5 pt-3 text-sm text-center border-t border-black">
          <Link to="/" className="text-black hover:underline">Back to Landing Page</Link>
        </footer>
      </div>
    </div>
  )
}

export default ForgotPassword