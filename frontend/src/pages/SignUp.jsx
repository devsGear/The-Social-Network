import { Link, useNavigate  } from 'react-router-dom';
import { useState } from 'react';

import { signUp } from '../apicalls/authCalls';

function Signup(){

  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    console.log(name, value, type, checked);

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    console.log('Sign up attempted with:', formData);
    
    const user = {
      name: formData.fullName,
      userName: formData.userName,
      email: formData.email,
      password: formData.password
    }

    try {
      const response = await signUp(user);
      console.log("Sign Up Successful", response);

      navigate("/home");
      
      setFormData({
        fullName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
      });
      
      alert("Account created successfully! Please sign in.");
    } catch(error) {
      console.error("Error during sign up", error);
      alert("Sign Up Failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-3">
      <div className="font-mono max-w-lg w-full bg-gray-50 border-2 border-black p-4">
        <header className="mb-3 pb-2 border-b-2 border-black text-center">
          <h1 className="text-xl uppercase tracking-widest">The Social Network</h1>
          <p className="italic text-sm">Create New Account</p>
        </header>

        <form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-2">
            <label className="block mb-1 text-base font-bold" htmlFor="fullName">Full Name:</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              className="w-full px-3 py-1 border-2 border-black font-mono text-base focus:outline-none"
              required
            />
          </div>
          
          <div className="mb-2">
            <label className="block mb-1 text-base font-bold" htmlFor="userName">Username:</label>
            <input 
              type="text" 
              id="userName" 
              name="userName" 
              value={formData.userName} 
              onChange={handleChange} 
              className="w-full px-3 py-1 border-2 border-black font-mono text-base focus:outline-none"
              required
            />
          </div>
          
          <div className="mb-2">
            <label className="block mb-1 text-base font-bold" htmlFor="email">Email Address:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full px-3 py-1 border-2 border-black font-mono text-base focus:outline-none"
              required
            />
          </div>
          
          <div className="mb-2">
            <label className="block mb-1 text-base font-bold" htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              className="w-full px-3 py-1 border-2 border-black font-mono text-base focus:outline-none"
              required
              minLength="8"
            />
            <p className="text-xs italic">Min. 8 characters</p>
          </div>
          
          <div className="mb-2">
            <label className="block mb-1 text-base font-bold" htmlFor="confirmPassword">Confirm Password:</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              className="w-full px-3 py-1 border-2 border-black font-mono text-base focus:outline-none"
              required
            />
          </div>
          
          <div className="mb-3">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="agreeTerms" 
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mr-2 border border-black w-3 h-3" 
                required
              />
              <label htmlFor="agreeTerms" className="text-xs">
                I agree to the <span className="underline">Terms and Conditions</span>
              </label>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full py-2 px-3 bg-gray-200 border-2 border-black font-bold hover:bg-gray-300 text-base"
          >
            CREATE ACCOUNT
          </button>
        </form>
        
        <div className="text-center border-t border-black pt-2">
          <p className="mb-1 text-xs">Already have an account?</p>
          <Link 
            to="/signin" 
            className="inline-block px-3 py-1 border-2 border-dashed border-black text-xs hover:bg-gray-200"
          >
            Sign In Instead
          </Link>
        </div>
        
        <footer className="mt-2 pt-2 text-xs text-center border-t border-black">
          <Link to="/" className="text-black hover:underline">Back to Landing Page</Link>
        </footer>
      </div>
    </div>
  )
}

export default Signup