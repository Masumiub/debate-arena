'use client'

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from "react";
import Lottie from "lottie-react";
import Img from '../../public/assets/Mental Therapy.json'
import Link from "next/link";

export default function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await signIn("credentials", {
      ...data,
      callbackUrl: "/",
    });
  };

  const router = useRouter()
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/')
    }
  }, [status, router])


  return (


    <div className="w-full md:w-6/12 mx-auto bg-linear-to-r from-cyan-500 to-blue-500 rounded-2xl mt-5">

      <div className="flex flex-col xl:flex-row items-center mb-20 py-25 px-10">

        <div className="w-full xl:w-1/2 mx-auto p-3">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <legend className="text-center text-4xl font-bold">Login</legend>

              <label className="label mt-3">Email</label>
              <input type="email" className="input w-full" placeholder="Email" {...register("email")} required />

              <label className="label mt-3">Password</label>
              <input type="password" className="input w-full" placeholder="Password" {...register("password")} required />

              <button className="btn btn-primary mt-4 w-full rounded-full" type="submit">Login</button>
            </form>

            <div className="w-full">
              <button className="btn rounded-full w-full" onClick={() => signIn('google')}><FcGoogle />Login with Google</button>
            </div>

            <div className="text-center mt-2">
              <p>New to Debate Arena? <span className="text-primary"> <Link href='/Register'>Register</Link></span></p>
            </div>

          </fieldset>

        </div>

        <div className='w-full xl:w-1/2 mx-auto'>
          <Lottie className="w-full mx-auto" animationData={Img} loop={true} ></Lottie>
        </div>

      </div>

    </div>
  );
}

