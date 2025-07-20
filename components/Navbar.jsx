'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { FcGoogle } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { MdCreateNewFolder } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { GrScorecard } from "react-icons/gr";
import { BiSolidMessageDetail } from "react-icons/bi";


export default function Navbar() {
  const { data: session } = useSession()
  //console.log(session.user.image)
  return (

    <div className="navbar bg-base-100 shadow-sm w-full md:w-8/12 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><Link href='/'>Home</Link></li>
            <li>
              <Link href='/all-debates'>Debates</Link>
            </li>
            <li><Link href='/scoreboard'>Scoreboard</Link></li>
            <li>
              {
                session && (
                  <div className='flex gap-2 items-center'>
                    <MdCreateNewFolder />
                    <Link href="/create-debate" className="mr-4">Create Debate</Link>
                  </div>
                )
              }
            </li>
          </ul>
        </div>
        <img src="/assets/icons8-debate-100.png" alt="logo" className='w-12 mr-2' />
        <Link className="text-xl font-bold" href="/">Debate Arena</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">

          <div className='flex items-center'>
            <GoHome />
            <li><Link href='/'>Home</Link></li>
          </div>

          <div className='flex items-center'>
            <BiSolidMessageDetail />
            <li>
              <Link href='/all-debates'>Debates</Link>
            </li>
          </div>

          <div className='flex items-center'>
            <GrScorecard />
            <li><Link href='/scoreboard'>Scoreboard</Link></li>
          </div>

          {
            session && (
              <div className='flex gap-2 items-center'>
                <MdCreateNewFolder />
                <Link href="/create-debate" className="mr-4">Create Debate</Link>
              </div>
            )
          }

        </ul>
      </div>
      <div className="navbar-end gap-2">
        {session ? (
          <>


            <p className='text-xs'>{session?.user?.name}</p>
            <img src={session?.user?.image} alt="photoURL" className='w-10 rounded-full' />


            <button onClick={() => signOut()} className="btn"><FiLogOut /> Sign Out</button>
          </>
        ) : (
          <>
            {/* <button className="btn rounded-full" onClick={() => signIn('google')}><FcGoogle />Login</button> */}
            <Link href='/Login' className='btn btn-primary rounded-full'>Login</Link>
            <Link href='/Register' className='btn btn-outline rounded-full'>Register</Link>
          </>
        )}
      </div>
    </div>
  )
}