import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Form from './Form'


function App() {
  return (
    <div id="app">
      <nav>
        <Link to ='/'>Home</Link>
        <Link to ="/order">Order</Link>
        {/* NavLinks here */}
      </nav>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<Form />} />
      </Routes>
      {/* Route and Routes here */}

    </div>
  )
}

export default App
