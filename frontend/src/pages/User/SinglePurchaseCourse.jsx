import React, { use } from 'react'
import { useGetPurchaseCourse } from '@/hooks/course.hook'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { useModuleStores } from '@/stores/module.store'
import { useGetComment } from '@/hooks/module.hook'
import { useCreateComment } from '@/hooks/comment.hook'
import { useCheckQuizApi } from '@/hooks/quiz.hook'


const SinglePurchaseCourse = () => {
    const { setModule, module } = useModuleStores()
    const { id } = useParams()
    const { data } = useGetPurchaseCourse(id)
    const { data: getCommentData } = useGetComment(module?._id)
    const { register, handleSubmit } = useForm()
    const { data :CheckQuiz } = useCheckQuiz(module?._id)
    const navigate =useNavigate()
    console.log(module)

    // const { data :getQuiz } = useGetQuiz(module?._id)
    // console.log(getQuiz)
     const { mutate:createQuiz } = useCreateQuiz()
    const createQuizHandler = (data) => {
        // console.log(data._id)
        createQuiz({
            moduleId:data._id,
            Content:data.title
        })
    }
    const getQuizHandler=(id)=>{
        navigate(`/quiz/${id}`)
    }

    const videoHandler = (item) => {
        setModule(item)
    }

    const { mutate } = useCreateComment()
    const createCommentHandler = (payload) => {
        if (!module?._id) return
        mutate({
            id: module._id,
            payload,
        })
    }
    return (
        <div className='flex'>
            <div className='left h-screen w-[50%] bg-yellow-800'>
                <div className='h-[50%] w-full border-b-2 border-zinc-500'>
                    <video className='h-full w-full object-contain' src={module?.video} controls></video>
                    <h1>Comment</h1>
                    {getCommentData ? (
                        module ? (
                            getCommentData?.map((item, index) => (
                                <div key={index}>
                                    <h1>{item.comment}</h1>
                                </div>
                            ))
                        ) : (
                            <h1>Please select module</h1>
                        )
                    ) : (
                        <h1>No comment</h1>
                    )}
                    <form onSubmit={handleSubmit(createCommentHandler)}>
                        <input type='text' className='border border-zinc-700' {...register('comment')} />
                        <button type='submit'>Add Comment</button>
                    </form>
                    
                </div>
                <div className='p-4'>
                    <h1 className='text-xl font-bold mb-2'>Comments</h1>
                    {/* Changed h1 to div so it doesn't break styling */}
                    <div>
                        {
                            module?.comments?.map((item, index) => {
                                return (
                                    <div key={index} className='mb-2'>
                                        <p>{item}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className='right h-screen w-[50%] flex items-start justify-center py-9'>
                {/* defaultValue changed to item-0 to match the first index */}
                <Accordion type="single" collapsible defaultValue="item-0" className='w-[70%]'>
                    {
                        data?.module?.map((item, index) => {
                            return (
                                // ⚠️ CRITICAL FIX: value MUST be unique for every item!
                                <AccordionItem 
                                    key={index} 
                                    className='border-zinc-500' 
                                    value={`item-${index}`}
                                >
                                    {/* Moved onClick here so it works better with the trigger */}
                                    <AccordionTrigger onClick={() => videoHandler(item)}>
                                        {item.title}
                                    </AccordionTrigger>
                                    <AccordionContent className='border-zinc-400'>
                                        <h1 onClick={(createQuizHandler)=>item}>Create Quiz</h1>
                                        {item.quiz?<><h1 onClick={()=>getQuizHandler(item.quiz)
                                        }>Get Quiz</h1></>:<><h1>No Quiz</h1></>}
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })
                    }
                </Accordion>
            </div>
        </div>
    )
}

export default SinglePurchaseCourse 