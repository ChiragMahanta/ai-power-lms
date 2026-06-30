import { useGetCourseHook } from '@/hooks/course.hook'
import React from 'react'

const CourseSection = ({ActiveSearch}) => {
    const {data, error} = useGetCourseHook({ ActiveSearch })
    // console.log(data)
    // console.log(error)
    const navigateSingleCourse=(id)=>{
        console.log(id)

        navigate(`/SingleCourse/${id}`)
    }
  return (
    <div className='flex flex-wrap grap-14'>
       <SearchResult/>
       {
            data?.courses?.map((item, index)=>(
                    <div onClick={()=>navigateSingleCourse(item.id)} key={item.id || index} className='border h-28 w-28 m-4'>
                        {item.title}
                        <img src={item.thumbnail} className='h-24 w-24 object-contain' alt="" />
                    </div>
            ))
       }
       </div>
  )
}

export default CourseSection