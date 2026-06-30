import { Link } from 'lucide-react'
import React from 'react'

const DashboardSideBar = () => {
  return (
    <div className='flex flex-col gap-7 font-semibold h-screen w-[30%] bg-zinc-700'>
      <Link to ={'/'}>Home </Link>
      <Link to= {'/dashboard'}>Analytics</Link>
      <Link to={'/dashboard/dashboardProduct'}>Product </Link>
    </div>
  )
}

export default DashboardSideBar