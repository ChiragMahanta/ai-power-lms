import { useMutation } from '@tanstack/react-query'
 export const usePayment =()=>{
    return useMutation({
        mutationFn:purchaseCourseApi,
        onSuccess:(data)=>{
            if(data.url){
                window.location.href = data.url
            }
            toast.success(data.message)
        },
        onError:(err)=>{

        }
    })
 }

 export const useCheckoutSuccess =()=>{
    return useMutation({
        mutationFn:(id)=>checkoutSuccessApi(id),
        onSuccess:(data)=>{
            toast.success(data.message)
        },
        onError:(err)=>{
            
        }
    })
 }