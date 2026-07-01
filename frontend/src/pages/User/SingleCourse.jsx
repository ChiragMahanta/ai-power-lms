import { usePayment } from '@/hooks/payment.hook'
import React from 'react'

const SingleCourse = () => {
    const {id}=useParams(
        // 
    )
    const {data} = useGetSingleCourseHook(id)
    console.log(data)
    const {mutate, iaPending} = usePayment
    const purchaseHandler=(data)=>{
      const product={
        product:{
        _id:data._id,
        name:data.title,
        price:data.amount,
        image:data.thumbnail
        }
      }
      mutate(product)
    }
  return (

    <div>
        <h1>{data?.title}</h1>
       <img src ={data?.thumbnail} className='h-28 object-contain' alt= " "/>
       <h1 className= ' font-bold' > Amount: {data?.amount} </h1>
       <button onClick={()=>purchaseHandler(data)} className='p-4  bg-green-600' > {isPending? <Spinner/>:"Buy"}</button>
     </div>
  )
}

export default SingleCourse