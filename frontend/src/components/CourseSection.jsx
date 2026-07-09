import { useGetCourseHook } from '@/hooks/course.hook'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CourseSection = ({ activeSearch }) => {
  const navigate = useNavigate()
  const { data, error, isLoading } = useGetCourseHook(activeSearch)

  const navigateSingleCourse = (id) => {
    navigate(`/singleCourse/${id}`)
  }

  if (isLoading) {
    return <div className="text-center py-10">Loading courses...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Failed to load courses</div>
  }

  return (
    <div className='flex flex-wrap gap-6 p-4'>
      {data?.courses?.length === 0 && (
        <p className="text-gray-500">No courses found</p>
      )}
      {data?.courses?.map((item) => (
        <div
          key={item._id}
          onClick={() => navigateSingleCourse(item._id)}
          className='border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer w-48'
        >
          <img
            src={item.thumbnail}
            className='h-32 w-full object-cover'
            alt={item.title}
          />
          <div className='p-2'>
            <h3 className='font-semibold text-sm truncate'>{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CourseSection