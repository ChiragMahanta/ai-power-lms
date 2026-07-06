import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '@/pages/Auth/Login.jsx'
import Register from '@/pages/Auth/Register'
import Home from '@/pages/User/Home'
import SingleCourse from '@/pages/User/SingleCourse'
import YourCourse from '@/pages/User/YourCourse'
import Dashboard from '@/pages/Admin/Dashboard'
import DashboardAnalytics from '@/pages/Admin/DashboardAnalytics'
import CreateModule from '@/pages/Admin/CreateModule'
import Quiz from '@/pages/User/Quiz'
import ProtectedRoute from './ProtectedRoute'

const MainRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      {/* Protected User Routes */}
      <Route path='/' element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path='/home' element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path='/singleCourse/:id' element={
        <ProtectedRoute>
          <SingleCourse />
        </ProtectedRoute>
      } />
      <Route path='/YourCourse' element={
        <ProtectedRoute>
          <YourCourse />
        </ProtectedRoute>
      } />
      <Route path='/YourCourse/:id' element={
        <ProtectedRoute>
          <SingleCourse />
        </ProtectedRoute>
      } />
      <Route path='/quiz/:id' element={
        <ProtectedRoute>
          <Quiz />
        </ProtectedRoute>
      } />

      {/* Protected Admin Routes */}
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path='/dashboard/analytics' element={
        <ProtectedRoute>
          <DashboardAnalytics />
        </ProtectedRoute>
      } />
      <Route path='/CourseModule/:id' element={
        <ProtectedRoute>
          <CreateModule />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default MainRoutes