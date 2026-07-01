import { useGetQuiz } from '@/hooks/quiz.hook'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const Quiz = () => {
    const {id}= useParams()
    const {data} = useGetQuiz(id)

const [selectAnswer, setSelected] =useState({})
const [showResult, setShowResult] =useState(false)
const [score, setScore] =useState(0)
const navigate = useNavigate()
const handlerSelectAnswer= (questionId, selectOption)=>{
    setSelectedAnswer(prev=>({
        ...prev,
        [questionId]:selectOption
    }))
}
    const handelSubmit=(e)=>{
        e.preventDefault()
        let correctCount = 0
        data.quiz.questions.forEach(question=>{
            if(selectAnswer[question._id]===question.correctOption){
                correctCount++
            }
        })
        setScore(correctCount)
        setShowResult(true)
        const question = data?.quiz?.questions||[]
        const totalQuestion=questions.length
        const answerCount = Object.keys(selectedAnswer).length
        console.log(question)
    }
  return (
    <div>
        {
            showResult?
            <>
           <div className='bg-white rounded-lg shadow-amber-200 p-8text-center'>
            <h1 onClick={()=>Navigate(-1)}'bg-white rounded-lg shadow-amber-200 p-8text-center >back</h1>
            <h2 'text-lg front-semibold mb-4'>
                your  score {score}/{totalQuestion}
            </h2>
            <p className='bg-white rounded-lg shadow-amber-200 p-8text-center' >
                {score=== totalQuestion?"Perfect Score"
                :score>= totalQuestion*0.7
                ?"great job"
                :score>= <totalQuestion*0.5
                ?"good effort"
                :"keep learning"
                }
            </p>
            {/*show your answer */}
            <div className='bg-white rounded-lg shadow-amber-200 p-8text-center' >
                <h3 className='bg-white rounded-lg shadow-amber-200 p-8text-center'>
                    
                </h3>
                {
                    {question.map((question, index)=>{
                        const userAnswer = selectAnswer[question._id]
                        const CorrectAnswer = userAnswer
                        return (
                            <div key={index}
                            className={`'bg-white rounded-lg shadow-amber-200 p-8text-center ${}isCorrect?' border-green-500 bg-green-50 ':' border-red-500 bg-red-50' `}></div>
                        
                        )
                    })}
                }

                <div className='bg-white rounded-lg shadow-amber-200 p-8text-center'>
                    <span>
                        Q{index+1}
                        </span>
                        <p className='bg-white rounded-lg shadow-amber-200 p-8text-center'>
                        {question.content}
                        </p>
                    


                </div>
                <div className='bg-white rounded-lg shadow-amber-200 p-8text-center'>
                    <span>
                        your answer
                        </span>
                        <span className= { `${isCorrect?}" border-green-500 bg-green-50 ':' border-red-500 bg-red-50"`}>
                        your{userAnswer}
                        </span> 
                        {!isCorrect &&(
                        <p></p>)
                </div>
            </div>
            :
            <>
            {}

            <form onSubmit={handleSubmit} action="">
                {
                    question.map((question,index)=>{
 return ()
                        <h3 className='text-lg front-semibold'>
                            Question{index+1}of {totalQuestion}
                        </h3>
                        <p className='mt-3 text-gray-800'{question.content}></p>
    </div>
    <div className='space-y-3'>
                        {question.options.map((option,index)=>{
                            return ()
                        })}
    </div>
    {question.explantion&&(
    <P>
    <span className='text bg-gray-400 font-semeibold'  > 
    explaination${question.explantion}</span></P>)}

</div>
   
                    })
                }
                {/*submit button*/ }
                <div className='flex justify-center'>
                    <button type='submit'
                    disabled={answerCount<totalQuestion}
                    className= ` px-8 py-3 rounded-lg front-semibold text-white transition 
                    { ${answerCount<totalQuestion? ' bg-grey-400 cursor-not-allowed': 'bg-green-500 hover:bg-green-800'}
            `}
            >
                
            {
            answerCount<totalQuestion?`
            Answer all Question(${answerCount}/${totalQuestion})
            `:'}
                    </button>
                </div>
            </form>
            </>
        }
    </div>
     <button className='text bg-gray-400 font-semeibold onClick={()=
    >setShowResult(false)
    setSelectedAnswer({})
    setScore(0)
    }> retake quiz</button>
  )
}

export default Quiz