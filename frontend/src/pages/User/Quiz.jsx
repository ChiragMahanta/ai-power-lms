import { useGetQuiz } from '@/hooks/quiz.hook'
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Quiz = () => {
    const { id } = useParams()
    const { data } = useGetQuiz(id)
    const navigate = useNavigate()

    const [selectedAnswer, setSelectedAnswer] = useState({})
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState(0)

    const handlerSelectAnswer = (questionId, selectOption) => {
        setSelectedAnswer(prev => ({
            ...prev,
            [questionId]: selectOption
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let correctCount = 0
        const questions = data?.quiz?.questions || []
        
        questions.forEach(question => {
            if (selectedAnswer[question._id] === question.correctOption) {
                correctCount++
            }
        })
        
        setScore(correctCount)
        setShowResult(true)
        
        const totalQuestion = questions.length
        const answerCount = Object.keys(selectedAnswer).length
        console.log(questions)
    }

    const questions = data?.quiz?.questions || []
    const totalQuestion = questions.length
    const answerCount = Object.keys(selectedAnswer).length

    return (
        <div>
            {
                showResult ?
                    <>
                        <div className='bg-white rounded-lg shadow-amber-200 p-8 text-center'>
                            <h1 
                                onClick={() => navigate(-1)} 
                                className='bg-white rounded-lg shadow-amber-200 p-8 text-center cursor-pointer'
                            >
                                back
                            </h1>
                            <h2 className='text-lg font-semibold mb-4'>
                                your score {score}/{totalQuestion}
                            </h2>
                            <p className='bg-white rounded-lg shadow-amber-200 p-8 text-center'>
                                {score === totalQuestion ? "Perfect Score"
                                    : score >= totalQuestion * 0.7
                                        ? "great job"
                                        : score >= totalQuestion * 0.5
                                            ? "good effort"
                                            : "keep learning"
                                }
                            </p>
                            
                            {/* show your answer */}
                            <div className='bg-white rounded-lg shadow-amber-200 p-8 text-center'>
                                <h3 className='bg-white rounded-lg shadow-amber-200 p-8 text-center'>
                                    
                                </h3>
                                {
                                    questions.map((question, index) => {
                                        const userAnswer = selectedAnswer[question._id]
                                        const isCorrect = userAnswer === question.correctOption
                                        return (
                                            <div 
                                                key={index}
                                                className={`bg-white rounded-lg shadow-amber-200 p-8 text-center ${isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}
                                            >
                                                <div className='bg-white rounded-lg shadow-amber-200 p-8 text-center'>
                                                    <span>
                                                        Q{index + 1}
                                                    </span>
                                                    <p className='bg-white rounded-lg shadow-amber-200 p-8 text-center'>
                                                        {question.content}
                                                    </p>
                                                </div>
                                                <div className='bg-white rounded-lg shadow-amber-200 p-8 text-center'>
                                                    <span>
                                                        your answer
                                                    </span>
                                                    <span className={`${isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                                                        your {userAnswer}
                                                    </span>
                                                    {!isCorrect && (
                                                        <p></p>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <form onSubmit={handleSubmit} action="">
                            {
                                questions.map((question, index) => {
                                    return (
                                        <div key={index}>
                                            <h3 className='text-lg font-semibold'>
                                                Question {index + 1} of {totalQuestion}
                                            </h3>
                                            <p className='mt-3 text-gray-800'>{question.content}</p>
                                            
                                            <div className='space-y-3'>
                                                {question.options.map((option, optIndex) => {
                                                    return (
                                                        <div key={optIndex}>
                                                            {/* Add your option rendering here */}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            
                                            {question.explanation && (
                                                <p>
                                                    <span className='text bg-gray-400 font-semibold'>
                                                        explanation: {question.explanation}
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                    )
                                })
                            }
                            
                            {/* submit button */}
                            <div className='flex justify-center'>
                                <button 
                                    type='submit'
                                    disabled={answerCount < totalQuestion}
                                    className={`px-8 py-3 rounded-lg font-semibold text-white transition ${answerCount < totalQuestion ? 'bg-grey-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-800'}`}
                                >
                                    {answerCount < totalQuestion 
                                        ? `Answer all Questions (${answerCount}/${totalQuestion})`
                                        : 'Submit'
                                    }
                                </button>
                            </div>
                        </form>
                    </>
            }
            
            <button 
                className='text bg-gray-400 font-semibold'
                onClick={() => {
                    setShowResult(false)
                    setSelectedAnswer({})
                    setScore(0)
                }}
            >
                retake quiz
            </button>
        </div>
    )
}

export default Quiz