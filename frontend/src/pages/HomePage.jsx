import React, { useLayoutEffect } from 'react'
import Header from '../components/Layout/Header.jsx'
import Hero from '../components/Hero/Hero.jsx'
import Categories from '../components/Categories/Categories.jsx'
import BloomDiscounts from '../components/BloomDiscounts/BloomDiscounts.jsx'
import Events from '../components/Events/Events.jsx'
import Sponsors from '../components/Sponsors/Sponsors.jsx'
import Footer from '../components/Layout/Footer.jsx'

const HomePage = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
});
  return (
    <div className='select-none'>
        <Header activeHeading={1}/>
        <Hero />
        <Categories />
        <BloomDiscounts />
        <Events />
        <Sponsors />
        <Footer />
    </div>
  )
}

export default HomePage