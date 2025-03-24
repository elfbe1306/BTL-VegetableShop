import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Filter from '../components/Filter'

function ListProduct() {
  return (
    <div>
      <Header />       
      <main className="home-content">
        <Filter/>
      </main>
      <Footer /> 
    </div>
  )
}

export default ListProduct