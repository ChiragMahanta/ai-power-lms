import { createQuiz, getQuizApi } from '@/Api/quiz.api'
import {useMutation} from '@tanstack/react-query'

export const useCreateQuiz =  ()=>{
    return useMutation({
        mutationFn:createQuiz,
        onSuccess:(data)=>{
           toast.success(data.message)
           console.log(data)
        },
        omError:(err)=>{
            console.log(err)
        }
})
}
export const useGetQuiz =  (id)=>{
    return useQuery({
        queryFn:()=>getQuizApi(id),
        queryKey:['getQuiz',id]
         
})
}
export const useCheckQuizApi =  (id)=>{
    return useQuery({
        queryFn:()=>checkQuizApi(id),
        queryKey:['checkQuiz',id]
           
        
})
}