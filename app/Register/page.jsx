'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Img from '../../public/assets/Animation - contact.json'
import Lottie from 'lottie-react';
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});



export default function Register() {
  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });

  const router = useRouter()
  
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/')
    }
  }, [status, router])

  const onSubmit = async (data) => {
    const userData = { ...data, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&s" };
    await axios.post("/api/auth/register", userData);


    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.ok) {
      router.push('/');
    } else {
      console.error("Login failed:", res?.error);
    }
  }

  return (


    <div className="w-full md:w-6/12 mx-auto">

      <div className="flex flex-col md:flex-row items-center my-20">

        <div className="w-full md:w-1/2">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <legend className="text-center text-4xl font-bold">Register</legend>

              <label className="label mt-3">Name</label>
              <input type="text" className="input w-full" placeholder="Name" {...register("name")} required />

              <label className="label mt-3">Email</label>
              <input type="email" className="input w-full" placeholder="Email" {...register("email")} required />

              <label className="label mt-3">Password</label>
              <input type="password" className="input w-full" placeholder="Password" {...register("password")} required />

              <button className="btn btn-neutral mt-4 w-full rounded-full" type="submit">Register</button>
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
};
