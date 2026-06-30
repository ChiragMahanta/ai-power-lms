import { useGetAllPurchaseCourseApi } from '@/hooks/course.hook'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const YourCourse = () => {
  const { data } = useGetAllPurchaseCourseApi()
  const navigate = useNavigate()

  const navigateSinglePurchaseCourse = (id) => {
    if (!id) return
    navigate(`/course/${id}`)
  }

  return (
    <div className='m-8 flex flex-wrap'>
      {
        data?.purchasedCourse?.map((item) => {
          return(
            <div key={item._id || item.id} className='cursor-pointer mr-4 mb-4' onClick={() => navigateSinglePurchaseCourse(item._id || item.id)}>
              <div className='h-28 w-28 border border-zinc-800'>
                <img className='h-full w-full object-contain' src={item.thumbnail} alt={item.title || 'thumbnail'}/> 

              </div>
              <h1> {item.title} </h1>
            </div>
          )
        })
      }
    </div>
  )
}

export default YourCourse