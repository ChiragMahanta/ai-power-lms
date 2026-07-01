import { Login } from '@/pages/Auth/Login.jsx'
import { Register } from '@/pages/Auth/Register'
import { Home } from '@/pages/User/Home'
import{ Route, Routes } from 'react-router-dom'
import React from 'react'
import SingleCourse from '@/pages/User/SingleCourse'
import YourCourse from '@/pages/User/YourCourse'
import Dashboard from '@/pages/Admin/Dashboard'
import DashboardAnalytics from '@/pages/Admin/DashboardAnalytics'
import { ProtectedRoute } from './ProtectedRoute'
import { CreativeCommons } from 'lucide-react'
import CreateModule from '@/pages/Admin/CreateModule'
import Quiz from '@/pages/User/Quiz'
const MainRoutes = () => {
  return (
    <Routes>
    <Route path ='/home'element={
      <ProtectedRoute>  
        <home/>
      </ProtectedRoute>
      }/>
       <Route path ='/YourCourse'element={
      <ProtectedRoute>  
        <YourCourse/>
      </ProtectedRoute>
      }/>
      <Route path ='/YourCourse/:id' element={
      <ProtectedRoute>  
        <SinglePurchasedCourse/>
      </ProtectedRoute>
      }/> 

      <Route path ='/quiz/:id' element={
      <ProtectedRoute>  
        <Quiz/>
      </ProtectedRoute>
      }/> 

      <Route path ='/dashboard' element={
        <ProtectedRoute>
        <Dashboard/>
        </ProtectedRoute>}> 
      

      <Route path ='dashboardProduct' element= {
        <ProtectedRoute>
          <DashboardProducts/>
        </ProtectedRoute>}/>

         <Route path='/' element={
        <ProtectedRoute>
        
        </ProtectedRoute>}/>

        <Route path='/cancel' element={
        <ProtectedRoute>
        <Cancel/>
        </ProtectedRoute>}/>

        <Route path='/purchase' element={
        <PaymentSuccess>
        <Cancel/>
        </PaymentSuccess>}/>

        <Route path='/singleCourse/:id' element={
        <ProtectedRoute>
        <DashboardAnalytics/>
        </ProtectedRoute>}/>

        
      </Route >
      <Route path='CourseModule/:id' element={
         <ProtectedRoute>
          <CreateModule/>
         </ProtectedRoute>
         }/>
    <Route path ='/login'element={<Login/>}/>
    <Route path ='/register'element={<Register/>}/>
   </Routes>
  )
}
export default MainRoute