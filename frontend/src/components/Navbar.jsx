import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useLoggedOut } from '@/hooks/User.hook'
import { Spinner } from './ui/spinner'
import { useUserStore } from '@/store/Module.store'

const Navbar = () => {
  const navigate = useNavigate()
  const { mutate, isPending } = useLoggedOut()
  const { user } = useUserStore()

  const logoutHandler = () => {
    mutate()
  }

  const userInitial = user?.fullName?.charAt(0)?.toUpperCase() || 'U'

  return (
    <div className='h-[12vh] w-full flex items-center justify-between px-9 shadow-md bg-white border-b'>
      <h1 
        onClick={() => navigate('/')} 
        className='text-xl font-bold cursor-pointer text-gray-800'
      >
        BeingSmart
      </h1>

      <div>
        <Popover>
          <PopoverTrigger className='cursor-pointer flex items-center gap-3 hover:bg-gray-50 px-3 py-1.5 rounded-full transition-colors'>
            <Avatar>
              <AvatarImage src={user?.profilePhoto || ''} alt={user?.fullName || 'User'} />
              <AvatarFallback className="bg-blue-600 text-white font-bold">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <span className='font-medium text-gray-700 hidden md:inline'>
              {user?.fullName || 'Guest'}
            </span>
          </PopoverTrigger>

          <PopoverContent className='w-48 px-4 py-3 flex flex-col gap-2 text-center mr-4'>
            <button 
              onClick={() => navigate('/dashboard')} 
              className='bg-zinc-100 hover:bg-zinc-200 rounded-lg py-2 px-4 cursor-pointer transition-colors text-sm font-medium'
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigate('/YourCourse')} 
              className='bg-zinc-100 hover:bg-zinc-200 rounded-lg py-2 px-4 cursor-pointer transition-colors text-sm font-medium'
            >
              Your Courses
            </button>
            <button 
              onClick={logoutHandler} 
              disabled={isPending}
              className='bg-red-50 hover:bg-red-100 text-red-600 rounded-lg py-2 px-4 cursor-pointer transition-colors text-sm font-medium disabled:opacity-50'
            >
              {isPending ? <Spinner /> : 'Logout'}
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default Navbar