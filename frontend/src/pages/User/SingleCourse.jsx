import React from 'react'

const SingleCourse = () => {
    const {id}=useParams(
        // 
    )
    const {data} = iseGetSingleCourseHook(id)
    console.log(data)
  return (

    <div>
        <h1>{data?.title}</h1>
       <img src ={data?.thumbnail} className='h-28 object-contain' alt= " "/>
       <h1 className= ' font-bold' > Amount: {data?.amount} </h1>
       <button className='p-4  bg-green-600' > Buy</button>
     </div>
  )
}

export default SingleCourse