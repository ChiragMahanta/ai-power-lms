import { getUser, registerApi } from "@/Api/user.api"
import {}from "@tanstack/react-query"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
export const useRegisterHook = ()=>{
    const navigate = userNavigate()
    return useMutation({
        mutationFn:registerApi,
        onSuccess:(data)=>{
            toast.success(data?.message)
            Navigate("/")
            console.log(data)
        },
        onError:(err)=>{
            console.log(err)
        }
    })
}

export const useLoginHook = ()=>{
    const navigate = useNavigate()
    return useMutation({
        mutationFn:loginApi,
        onSuccess:(data)=>{
           toast.success(data?.message)
           navigate('/')
        },
        onError:(err)=>{
            console.log(err)
        }
    })
}
export const useGetUserHook =()=>{
    return useQuery({
        queryFn:getUser,
        queryKey:['getUser']
    })
}
export const useLoggedOut=()=>{
    return useMutation({
        mutationFn:logoutApi,
        onSuccess:(data)=>{
            toast.success(data?.message)
            console.log(data)
        },
        onError:(err)=>{
            console.log(err)
        }
    })
}
