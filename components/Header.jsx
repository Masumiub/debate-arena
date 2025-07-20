'use client'

import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'

const HeroSection = () => {
  const { data: session } = useSession()

  //console.log("Session Data:", session);

  return (
    <header className="min-h-[40vh] flex flex-col items-center justify-center text-center px-4 bg-base-300 rounded-2xl">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {session && (
            <p className="text-2xl text-gray-500 mt-4">Welcome, {session.user.name}!</p>
          )}
          🗣️ Community Debate Arena
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
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
    </header>
  )
}

export default HeroSection
