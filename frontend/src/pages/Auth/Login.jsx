import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Spinner } from '@/components/ui/spinner'
import { useLoginHook } from "@/hooks/User.hook.js"

const Login = () => {
  const { register, handleSubmit } = useForm()
  const { mutate, isPending } = useLoginHook()

  const loginFormHandler = (data) => {
    console.log("Login Data:", data)
    mutate(data)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(loginFormHandler)}
        className="flex flex-col gap-5 border border-zinc-200 bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>

        <input
          className="border-2 border-zinc-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
          type="email"
          placeholder="Enter Your Email"
          {...register('email', { required: true })}
        />
        <input
          className="border-2 border-zinc-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
          type="password"
          placeholder="Enter Your Password"
          {...register('password', { required: true })}
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {isPending ? <Spinner /> : 'Login'}
        </button>

        <p className="text-center text-gray-600">
          Don't have an account?{' '}
          <Link className="text-blue-600 hover:underline font-medium" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login