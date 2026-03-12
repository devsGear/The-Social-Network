import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="landing-container font-mono max-w-2xl w-full bg-gray-50 border-2 border-black p-8 text-center">
        <header className="mb-10 pb-5 border-b-2 border-black">
          <h1 className="text-3xl uppercase tracking-widest">The Social Network</h1>
          <p className="italic text-lg mt-2">Connect with friends and the world around you.</p>
        </header>

        <main className="mb-10">
          <div className="mb-8">
            <h2 className="mb-4 font-serif text-2xl">Welcome to The Social Network</h2>
            <p className="leading-relaxed mb-6 text-base">
              Join our community to connect with friends, share updates, and discover new content.
              The Social Network has been connecting people since 1999.
            </p>
          </div>

          <div className="my-10 p-6 border-2 border-dashed border-black">
            <h3 className="underline mb-5 text-xl">Join Now!</h3>
            <div className="flex justify-center gap-6 mt-5">
              <Link to="/signup" className="px-6 py-3 border-2 border-black font-bold no-underline text-black text-lg hover:bg-gray-200">
                Sign Up
              </Link>
              <Link to="/signin" className="px-6 py-3 border-2 border-black font-bold no-underline text-black text-lg hover:bg-gray-200">
                Sign In
              </Link>
            </div>
          </div>
        </main>

        <footer className="border-t-2 border-black pt-4 text-sm">
          <p>© 1999-2025 The Social Network. All rights reserved.</p>
          <div className="mt-3">
            <Link to="/forgot-password" className="text-black mr-3 hover:underline">Forgot Password</Link>
            <span>|</span>
            <Link to="/home" className="text-black ml-3 hover:underline">Home Page</Link>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Landing