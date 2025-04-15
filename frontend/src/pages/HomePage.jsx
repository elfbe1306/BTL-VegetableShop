import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function HomePage() {
  return (
    <div>
      <Header />       
      <main className="home-content">
        <h1>Welcome</h1>
      </main>
      <Footer /> 
    </div>
  )
}

export default HomePage