import { useGetSingleCourseHook } from '@/hooks/course.hook'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import {
  Dialog,
  DialogContent,
  
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useCreateModule } from '@/hooks/module.hook'

const CreateModule = () => {
  const { id } = useParams()
  const { data } = useGetSingleCourseHook(id)
  const [openModule, setOpenModule] = useState(false)
  
  // ✅ Fixed useForm import and usage
  const { register, handleSubmit, reset } = useForm()
  const { mutate, isPending } = useCreateModule()

  console.log(data?.modules)

  // ✅ Fixed all syntax errors
  const moduleFormHandle = (formData) => {
    const submitData = new FormData()
    
    submitData.append('title', formData.title)
    submitData.append('video', formData.video[0])
    submitData.append('CourseId', id)

    mutate(submitData, {
      onSuccess: () => {
        setOpenModule(false)
        reset()
      }
    })
  }

  return (
    <div className='flex flex-col items-start justify-start py-9 w-full max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>{data?.title}</h1>
      
      {/* ✅ Added open and onOpenChange for controlled dialog */}
      <Dialog open={openModule} onOpenChange={setOpenModule}>
        <DialogTrigger className='bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mb-4'>
          Create Module
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Module</DialogTitle>
            
              {/* ✅ Changed to handleSubmit from useForm */}
              <form onSubmit={handleSubmit(moduleFormHandle)} className='space-y-4 mt-4'>
                
                {/* 1. Module Name - Added register */}
                <div>
                  <label className='block text-sm font-medium mb-1'>Module Name</label>
                  <input
                    type='text'
                    {...register('title', { required: true })}
                    placeholder='Enter module name'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  />
                </div>
                
                {/* 2. Module Description - Added register */}
                <div>
                  <label className='block text-sm font-medium mb-1'>Module Description</label>
                  <textarea
                    {...register('description')}
                    placeholder='Enter module description'
                    rows={4}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                {/* 3. Module Video - Added register */}
                <div>
                  <label className='block text-sm font-medium mb-1'>Module Video</label>
                  <input
                    type='file'
                    accept='video/*'
                    {...register('video', { required: true })}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  />
                </div>
                
                {/* ✅ Added isPending to button */}
                <button
                  type='submit'
                  disabled={isPending}
                  className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
                >
                  {isPending ? 'Creating Module...' : 'Create Module'}
                </button>
              </form>
            
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <h1 className='text-xl mb-2'>{AccordionItem.title}</h1>
      <div>
       <h1>total modules:{data?.module.length}</h1> 
      </div>
      
      
      
    </div>
  )
}

export default CreateModule