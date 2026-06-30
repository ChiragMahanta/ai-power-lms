import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useLoggedOut } from '@/hooks/User.hook'
import { Spinner } from './ui/spinner'

const Navbar = props => {
  const Navbar = ()=>{
    const {mutate, isPending} = useLoggedOut()
  }
  const logoutHandler=() => {
    mutate()
  }
  return (
    <div  className='h-[12vh] w-full flex items-center justify-between px-9 shadow'>
      <h1> BeingSmart</h1>
      <div>
        <Popover >
          <PopoverTrigger className='cursor-pointer flex items-center gap-3'>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1>name</h1>
          </PopoverTrigger>
          <PopoverContent className='w-fit px-7 flex flex-col gap-4 text-center'>
            <h1 onClick={()=>Navigate('/Dashboard')} className='bg-zinc-400 rounded-4xl cursor-pointer'>Dashboard</h1>
            <h1 onClick={()=>Navigate('/YourCourse')} className='bg-zinc-400 rounded-4xl cursor-pointer'>YourCourse</h1>
            <h1 onClick={logoutHandler} className='bg-zinc-400 rounded-4xl cursor-pointer'>Logout</h1>
            {isPending?<Spinner/>: "Logout"}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}



export default Navbar