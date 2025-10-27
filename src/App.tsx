import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ProfilePage from './pages/ProfilePage'

export default function App(){
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-sky-200 text-sky-800 py-4 shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-sky-700">HotelEase</div>
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-slate-700 hover:text-sky-700">Home</Link>
            <Link to="/register" className="text-slate-700 hover:text-sky-700">Register</Link>
            <a href="#" className="text-slate-500">Sign-in</a>
             <Link to="booking"  className="text-slate-700 hover:text-sky-700">Book Now</Link>
             <Link to="/profile" aria-label="profile">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className="w-9 h-9 rounded-full" alt="avatar"/>
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
        </Routes>
      </main>

      <footer className="text-center text-sm text-slate-500 py-6">© {new Date().getFullYear()} HotelEase</footer>
    </div>
  )
}
