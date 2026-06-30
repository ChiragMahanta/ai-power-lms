import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useCreateCourseHook, useGetCourseHook } from '@/hooks/course.hook'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const DashboardProducts = () => {
  const { data } = useGetCourseHook()
  // console.log(data)
  const { register, handleSubmit } = useForm()
  const { mutate, isPending, reset } = useCreateCourseHook()
  const [openModule, setOpenModule] = useState(false)
  const getCourse=(id)=>{
    Navigate(`/dashboardCourseModule/{id}`)
    console.log(id)
  }

  const createCourseHandler =(data) =>{
    console.log(data)
    const formData = new FormData()
    formData.append('title',data.title)
    formData.append('description',data.description)
    formData.append('amount',data.amount)
    formData.append('thumbnail',data.thumbnail[0])
    mutate (formData,{
      onSuccess:(data)=>{
        setOpenModule(false)
        reset()
        toast.success(data.message)
      }
    })
    
  
  }

  return (
    <div onClick={()=> getCourseId(item._id) } className='flex flex-col py-8 px-8 gap-8'>
      
      <Dialog open={openModule} onOpenChange={setOpenModule}>
  <DialogTrigger className='rounded-md p-2 bg-green-600'>
    Add Course
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Course</DialogTitle>
      <DialogDescription>
        <form onSubmit={handleSubmit(createCourseHandler)} className='flex flex-col gap-7' action="">
          <input type="text" placeholder='Enter course title' className='border-2 border-zinc-600' {...register('title')} />
          <input type="text" placeholder='Enter Description' className='border-2 border-zinc-600' {...register('description')} />
          <input type="number" placeholder='Enter Amount' className='border-2 border-zinc-600' {...register('amount')} />
          <input type="file" accept='image/*' placeholder='Select Image' className='border-2 border-zinc-600' {...register('thumbnail')} />
          <button disabled={isPending} type="submit" className='p-2 bg-green-600 rounded-md'>{isPending ? <Spinner/> : "Add Course"} </button>
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
       <div className='flex gap-8 flex-wrap m-24'>      
        {
          data?.course?.map((item, index)=>{
            return(
              <div key={index}>
                <h1>{item.title}</h1>
              </div>
            )
          })
        }
    </div>
  </div>
  )
}

export default DashboardProducts