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
    <main className='w-full md:w-8/12 mx-auto'>
      <Fade>
        <HeroSection />
      </Fade>
      <Fade>
        <HowItWorks></HowItWorks>
      </Fade>

      <Fade>
        <AllDebates></AllDebates>
      </Fade>

      <Fade>
        <Testimonials></Testimonials>
      </Fade>
      <Fade>
        <Counts></Counts>
      </Fade>
      <Fade>
        <FAQs></FAQs>
      </Fade>

    </main>
  )
}
