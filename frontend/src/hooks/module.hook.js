import { createModuleApi } from "@/Api/module.api"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useCreateModule=()=>{
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:createModuleApi,
        onSuccess:(data)=>{
           queryClient.invalidateQueries(['getSingleCourse'])
        },
        onError:(err)=>{
            console.log(err)
        }
    })
}
export const useGetModule=(id)=>{
    return useQuery({
     queryFn:()=>getModuleApi(id),
     queryKey:['getModule']
        
    })
}
export const useGetComment=(id)=>{
    return useQuery({
     queryFn:()=>getCommentApi(id),
     queryKey:['getComment'],
     enabled:!!id
        
    
    })
}