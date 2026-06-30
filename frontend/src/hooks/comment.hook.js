import { useMutation} from '@tanstack/react-query'
import { createComment } from '@/Api/comment.api'
export const useCreateComment=()=>{
    const queryClient =useQueryClient     ()
    return useMutation({
        mutationFn:createComment,
    onSuccess:(data)=>{
        queryClient.invalidateQueries(['getComment'])
        toast.success(data.message)
    },
    onError:(err)=>{

    }
    })
}