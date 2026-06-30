import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex'>
      <Link to={'/dashboard/analytics'}> Analytics</Link>
      <Link to={'/dashboard/analytics'}> Products</Link>
    </div>
  )
}

export default Dashboard