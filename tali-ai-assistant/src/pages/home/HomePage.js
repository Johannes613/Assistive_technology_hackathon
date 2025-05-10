import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import Hero from '../../components/hero/Hero'
import About from '../../components/about/About'
import Services from '../../components/Services/Services'
import Success from '../../components/success/Success'
import Premium from '../../components/premium/Premium'
import Tools from '../../components/tools/Tools'
import Faq from '../../components/faq/Faq'
import OurTeam from '../../components/our-team/OurTeam'
import Contact from '../../components/contact/Contact'
import Footer from '../../components/footer/Footer'

export default function HomePage() {
  return (
    <div>
        <NavBar/>
        <Hero/>
        <About/>
        <Services/>
        <Success/>
        <Premium/>
        <Tools/>
        <Faq/>
        {/* <OurTeam/> */}
        <Contact/>
        <Footer/>
    </div>
  )
}
