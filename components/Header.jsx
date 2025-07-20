'use client'

import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import Lottie from "lottie-react";
import Img from '../public/assets/Business team.json'

const HeroSection = () => {
  const { data: session } = useSession()

  //console.log("Session Data:", session);

  return (
    <header className="min-h-[40vh] flex flex-col items-center justify-around md:flex-row px-4 bg-linear-to-r from-cyan-500 to-blue-500 rounded-2xl text-white">


      <div className="w-full md:w-1/2 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {session && (
            <p className="text-2xl mt-4">Welcome, {session.user.name}!</p>
          )}
          🗣️ Community Debate Arena
        </h1>
        <p className="text-md md:text-xl mb-6">
          Battle of Opinions — Create or join debates, argue your stance, vote for the most compelling responses, and climb the scoreboard!
        </p>


        {!session && (
          <button
            onClick={() => signIn('google')}
            className="btn btn-primary text-white px-6 py-3 rounded-full"
          >
            Login with Google
          </button>
        )}
        <Link href='/all-debates' className='btn btn-outline py-3  rounded-full ml-2'>Browse Debate</Link>

      </div>

      <div className='w-full md:w-1/2 mx-auto'>
        <Lottie className="w-[270px] md:w-[400px] lg:w-[400px] mx-auto" animationData={Img} loop={true} ></Lottie>
      </div>

    </header>
  )
}

export default HeroSection
