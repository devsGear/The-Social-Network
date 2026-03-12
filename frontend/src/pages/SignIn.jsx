import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signIn } from "../apicalls/authCalls";
import { setUserData } from "../redux/userSlice";

function Signin() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      userName: formData.userName,
      password: formData.password,
    };

    try {
      const response = await signIn(user);
      console.log("Sign In Successful", response);

      dispatch(setUserData(response));

      setFormData({
        userName: "",
        password: "",
      });

      navigate("/home");
      window.location.reload();
      
    } catch (error) {
      console.error("Error during sign in", error);
      alert("Sign In Failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="font-mono max-w-lg w-full bg-gray-50 border-2 border-black p-6">
        <header className="mb-5 pb-3 border-b-2 border-black text-center">
          <h1 className="text-2xl uppercase tracking-widest">
            The Social Network
          </h1>
          <p className="italic text-base mt-1">Sign In</p>
        </header>

        <form onSubmit={handleSubmit} className="mb-5">
          <div className="mb-4">
            <label className="block mb-2 text-base font-bold" htmlFor="userName">
              Username:
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-black font-mono text-base focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-base font-bold" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-black font-mono text-base focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-5">
            <div>
              <input
                type="checkbox"
                id="remember"
                className="mr-2 border border-black w-4 h-4"
              />
              <label htmlFor="remember" className="text-sm">
                Remember Me
              </label>
            </div>
            <Link to="/forgot-password" className="text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gray-200 border-2 border-black font-bold hover:bg-gray-300 text-base"
          >
            SIGN IN
          </button>
        </form>

        <div className="text-center border-t-2 border-black pt-4">
          <p className="mb-3 text-sm">Don't have an account?</p>
          <Link
            to="/signup"
            className="inline-block px-4 py-2 border-2 border-dashed border-black text-sm hover:bg-gray-200"
          >
            Create New Account
          </Link>
        </div>

        <footer className="mt-5 pt-3 text-sm text-center border-t border-black">
          <Link to="/" className="text-black hover:underline">
            Back to Landing Page
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default Signin;
