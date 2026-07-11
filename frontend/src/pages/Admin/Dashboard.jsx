import React from 'react'
import { Link } from 'react-router-dom'
import { useGetCourseHook } from '@/hooks/course.hook'

const Dashboard = () => {
  const { data, isLoading, error } = useGetCourseHook('')

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Failed to load courses</div>

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header with Profile */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">AI Power LMS Dashboard</h1>
        
        <div className="flex items-center gap-4">
          {/* Profile Picture */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
            <span className="text-sm font-medium text-gray-700 hidden md:inline">Admin</span>
          </div>
        </div>
      </div>

      {/* Navigation Links (Tere original links preserved) */}
      <div className="flex gap-4 mb-8">
        {/* Navigation Links - FIXED */}
<div className="flex gap-4 mb-8 flex-wrap">
  <Link 
    to="/dashboard/analytics" 
    className="bg-white hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg shadow-sm border border-gray-200 transition-all font-medium"
  >
    📊 Analytics
  </Link>
  <Link 
    to="/dashboard/products" 
    className="bg-white hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg shadow-sm border border-gray-200 transition-all font-medium"
  >
    📦 Products
  </Link>
  <Link 
    to="/dashboard/products" 
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all font-medium ml-auto"
  >
    + Add New Course
  </Link>
  // ❌ OLD
<Link to="/dashboard/create-course" className="text-blue-600 hover:underline mt-2 inline-block">
  Create your first course →
</Link>

// ✅ NEW
<Link to="/dashboard/products" className="text-blue-600 hover:underline mt-2 inline-block">
  Create your first course →
</Link>
</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Total Courses</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{data?.courses?.length || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Active Students</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">--</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Revenue</p>
          <p className="text-3xl font-bold text-green-600 mt-1">--</p>
        </div>
      </div>

      {/* Course Grid */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">All Courses</h2>
      {data?.courses?.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-400 text-lg">No courses found</p>
          <Link to="/dashboard/create-course" className="text-blue-600 hover:underline mt-2 inline-block">
            Create your first course →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.courses?.map((course) => (
            <div key={course._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 truncate">{course.title}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{course.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-blue-600 font-bold">₹{course.amount}</span>
                  <Link to={`/CourseModule/${course._id}`} className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors">
                    Manage
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard