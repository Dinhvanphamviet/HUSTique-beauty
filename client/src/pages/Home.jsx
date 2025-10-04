import React from 'react'
import Hero from '../components/Hero'
import Feature from '../context/Feature'
import NewArrivals from '../components/NewArrivals'
import PopularProducts from '../components/PopularProducts'
import Testimonial from '../components/Testimonial'

function Home() {
  return (
    <>
    <Hero/>
    <Feature/>
    <NewArrivals/>
    <PopularProducts/>
    <div> Banner</div>
    <Testimonial/>
    </>
  )
}

export default Home