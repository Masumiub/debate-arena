'use client'

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from "react";
import Lottie from "lottie-react";
import Img from '../../public/assets/Mental Therapy.json'

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


    <div className="w-full md:w-6/12 mx-auto">

      <div className="flex flex-col md:flex-row items-center my-20">

        <div className="w-full md:w-1/2">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <legend className="text-center text-4xl font-bold">Login</legend>

              <label className="label mt-3">Email</label>
              <input type="email" className="input w-full" placeholder="Email" {...register("email")} required />

              <label className="label mt-3">Password</label>
              <input type="password" className="input w-full" placeholder="Password" {...register("password")} required />

              <button className="btn btn-neutral mt-4 w-full rounded-full" type="submit">Login</button>
            </form>

            <div className="w-full">
              <button className="btn rounded-full w-full" onClick={() => signIn('google')}><FcGoogle />Login with Google</button>
            </div>
          </fieldset>
        </div>

        <div className='w-full md:w-1/2 mx-auto'>
          <Lottie className="w-[270px] md:w-[400px] lg:w-[400px] mx-auto" animationData={Img} loop={true} ></Lottie>
        </div>

      </div>

    </div>
  );
}

