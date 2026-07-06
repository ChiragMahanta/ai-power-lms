import React from 'react'
import { Navigate } from 'react-router-dom'
import { useGetUserHook } from '@/hooks/User.hook'

const ProtectedRoute = ({ children }) => {
  const { data: user, isLoading } = useGetUserHook()

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute;  