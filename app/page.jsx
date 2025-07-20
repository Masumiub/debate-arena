'use client'
import { useSession, signIn } from 'next-auth/react'
import HeroSection from '../components/Header'
import HowItWorks from '../components/HowItWorks'
import AllDebates from '../components/AllDebates'
import Footer from '../components/Footer'
import FAQs from '../components/FAQs'
import { Fade } from "react-awesome-reveal";
import Testimonials from '../components/Testimonials'
import Counts from '../components/Counts'



export default function HomePage() {
  const { data: session } = useSession()

  return (
    <main className='w-full md:w-10/12 mx-auto'>
      <Fade delay={500}>
        <HeroSection />
      </Fade>
      <Fade delay={500}>
        <HowItWorks></HowItWorks>
      </Fade>

      <Fade delay={500}>
        <AllDebates></AllDebates>
      </Fade>

      <Fade delay={500}>
        <Testimonials></Testimonials>
      </Fade>
      <Fade delay={500}>
        <Counts></Counts>
      </Fade>
      <Fade delay={500}>
        <FAQs></FAQs>
      </Fade>

    </main>
  )
}
