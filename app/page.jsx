'use client'
import { useSession, signIn } from 'next-auth/react'
import HeroSection from '../components/Header'
import HowItWorks from '../components/HowItWorks'
import AllDebates from '../components/AllDebates'
import Footer from '../components/Footer'
import FAQs from '../components/FAQs'

export default function HomePage() {
  const { data: session } = useSession()

  return (
    <main className='w-full md:w-8/12 mx-auto'>
      <HeroSection />
      <HowItWorks></HowItWorks>
      <AllDebates></AllDebates>
      <FAQs></FAQs>
    </main>
  )
}
