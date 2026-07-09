import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useCreateCourseHook, useGetCourseHook } from '@/hooks/course.hook'
import { Spinner } from '@/components/ui/spinner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const DashboardProducts = () => {
  const navigate = useNavigate()
  const { data } = useGetCourseHook()
  const { register, handleSubmit, reset } = useForm()
  const { mutate, isPending } = useCreateCourseHook()
  const [openModule, setOpenModule] = useState(false)

  const getCourse = (id) => {
    navigate(`/CourseModule/${id}`)
  }

  const createCourseHandler = (formData) => {
    const submitData = new FormData()
    submitData.append('title', formData.title)
    submitData.append('description', formData.description)
    submitData.append('amount', formData.amount)
    submitData.append('thumbnail', formData.thumbnail[0])

    mutate(submitData, {
      onSuccess: (res) => {
        setOpenModule(false)
        reset()
        toast.success(res?.message || 'Course created successfully')
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || 'Failed to create course')
      },
    })
  }

  return (
    <div className='flex flex-col py-8 px-8 gap-8'>
      <Dialog open={openModule} onOpenChange={setOpenModule}>
        <DialogTrigger className='rounded-md px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors w-fit'>
          + Add Course
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription asChild>
              <form onSubmit={handleSubmit(createCourseHandler)} className='flex flex-col gap-4 mt-4'>
                <input
                  type="text"
                  placeholder='Enter course title'
                  className='border-2 border-zinc-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none'
                  {...register('title', { required: true })}
                />
                <textarea
                  placeholder='Enter Description'
                  className='border-2 border-zinc-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none'
                  rows={3}
                  {...register('description', { required: true })}
                />
                <input
                  type="number"
                  placeholder='Enter Amount'
                  className='border-2 border-zinc-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none'
                  {...register('amount', { required: true })}
                />
                <input
                  type="file"
                  accept='image/*'
                  className='border-2 border-zinc-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none'
                  {...register('thumbnail', { required: true })}
                />
                <button
                  disabled={isPending}
                  type="submit"
                  className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                >
                  {isPending ? <Spinner /> : "Add Course"}
                </button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Course List */}
      <div className='flex gap-6 flex-wrap'>
        {data?.courses?.length === 0 && (
          <p className="text-gray-500">No courses found. Create your first course!</p>
        )}
        {data?.courses?.map((item) => (
          <div
            key={item._id}
            onClick={() => getCourse(item._id)}
            className='border rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer transition-shadow w-64 bg-white'
          >
            {item.thumbnail && (
              <img src={item.thumbnail} alt={item.title} className='w-full h-32 object-cover rounded-lg mb-3' />
            )}
            <h3 className='font-semibold text-gray-800 truncate'>{item.title}</h3>
            <p className='text-blue-600 font-bold mt-1'>₹{item.amount}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardProducts