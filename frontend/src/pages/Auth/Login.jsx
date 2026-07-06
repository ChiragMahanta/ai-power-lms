import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Spinner } from '@/components/ui/spinner'
import { useLoginHook } from "@/hooks/User.hook.js";

const Login = () => {
  const { register, handleSubmit } = useForm()
  const {mutate, isPending } = useLoginHook()
  const loginFormHandler = (data) => {
    mutate(data)
    console.log(data)
  }
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <form
        className='flex flex-col gap-6 border border-zinc-700 p-7'
        onSubmit={handleSubmit(loginFormHandler)}
      >
        <input
          className="border-2 border-zinc-700"
          type="email"
          placeholder="Enter Your Email"
          {...register('email')}
        />
        <input
          className="border-2 border-zinc-600"
          type="password"
          placeholder="Enter Your password"
          {...register('password')}
        />
        <button type="submit" className='text-center'>
          {isPending?<Spinner/> :"login"}
        </button>
        <h1> Don't have an account <Link to={'/register'}> Register </Link> </h1>
      </form>
    </div>
  )
}

export default Login