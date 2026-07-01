import { useCheckoutSuccess } from '@/hooks/payment.hook'
import React from 'react'
import { useEffect } from 'react'

const PaymentSuccess = () => {
    const [searchParam] = useSearchParams()
    const {mutate}= useCheckoutSuccess()
    useEffect(()=>{
        const sessionId= searchParam.get('session._id')
    
        if(sessionId){
          mutate(sessionId)
         }
         })[searchParam, mutate]


  return (
    <div><link to={'/'} > <button className='p-5 rounded-md bg-green-600'>
GO to home Page
        </button></link></div>
  )
}

export default PaymentSuccess