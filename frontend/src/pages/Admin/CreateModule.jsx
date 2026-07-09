import { useGetSingleCourseHook } from '@/hooks/course.hook'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useCreateModule } from '@/hooks/module.hook'

const CreateModule = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetSingleCourseHook(id)
  const [openModule, setOpenModule] = useState(false)
  const { register, handleSubmit, reset } = useForm()
  const { mutate, isPending } = useCreateModule()

  const moduleFormHandle = (formData) => {
    const submitData = new FormData()
    submitData.append('title', formData.title)
    submitData.append('description', formData.description || '')
    submitData.append('video', formData.video[0])
    submitData.append('CourseId', id)

    mutate(submitData, {
      onSuccess: () => {
        setOpenModule(false)
        reset()
        toast.success('Module created successfully')
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || 'Failed to create module')
      },
    })
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading course...</div>
  }

  return (
    <div className='flex flex-col items-start justify-start py-9 w-full max-w-3xl mx-auto px-4'>
      {/* Course Title */}
      <h1 className='text-3xl font-bold mb-2 text-gray-800'>{data?.title}</h1>
      <p className='text-gray-500 mb-6'>Total Modules: {data?.modules?.length || 0}</p>

      {/* Create Module Button */}
      <Dialog open={openModule} onOpenChange={setOpenModule}>
        <DialogTrigger className='bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors shadow-md mb-6 font-medium'>
          + Create Module
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Module</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(moduleFormHandle)} className='space-y-4 mt-2'>
            <div>
              <label className='block text-sm font-medium mb-1 text-gray-700'>Module Name</label>
              <input
                type='text'
                {...register('title', { required: true })}
                placeholder='Enter module name'
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1 text-gray-700'>Description</label>
              <textarea
                {...register('description')}
                placeholder='Enter module description'
                rows={3}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1 text-gray-700'>Video</label>
              <input
                type='file'
                accept='video/*'
                {...register('video', { required: true })}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <button
              type='submit'
              disabled={isPending}
              className='w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium'
            >
              {isPending ? 'Creating Module...' : 'Create Module'}
            </button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modules Accordion List */}
      {data?.modules?.length > 0 ? (
        <Accordion type="single" collapsible className="w-full space-y-3">
          {data.modules.map((module, index) => (
            <AccordionItem key={module._id} value={`module-${index}`} className="border border-gray-200 rounded-lg px-4 bg-white shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    {index + 1}
                  </span>
                  <span className="font-semibold text-gray-800">{module.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2 pb-3 pl-10">
                {module.description || 'No description available'}
                {module.video && (
                  <div className="mt-3">
                    <video controls src={module.video} className="w-full max-h-64 rounded-lg border" />
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="w-full bg-gray-50 border border-dashed border-gray-300 rounded-xl p-12 text-center">
          <p className="text-gray-400 text-lg">No modules yet</p>
          <p className="text-gray-400 text-sm mt-1">Click "Create Module" to add your first module</p>
        </div>
      )}
    </div>
  )
}

export default CreateModule