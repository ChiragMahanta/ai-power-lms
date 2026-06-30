import { Spinner } from '@/components/ui/spinner'
import { useRegisterHook } from '@/hooks/User.hook'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const Register = () => {
  const { register, handleSubmit } = useForm()
  const { mutate, isPending } = useRegisterHook()

  const registerFormHandler = (data) => {
    console.log(data)
    mutate(data)
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(registerFormHandler)}
        className="flex flex-col gap-6 border border-zinc-700 p-8"
      >
        <input
          className="border-2 border-zinc-400"
          type="text"
          placeholder="Enter Your Name"
          {...register('fullName')}
        />
        <input
          className="border-2 border-zinc-400"
          type="email"
          placeholder="Enter Your Email"
          {...register('email')}
        />
        <input
          className="border-2 border-zinc-400"
          type="password"
          placeholder="Enter Your Password"
          {...register('password')}
        />
        <button type="submit" className='text-center'>
          {isPending ? <Spinner/> : 'Register'}
        </button>
        <h1>
          Already have an account?{' '}
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </h1>
      </form>
    </div>
  )
}

export default Register