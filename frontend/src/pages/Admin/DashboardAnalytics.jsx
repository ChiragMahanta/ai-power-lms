import { useGetDailyData, useGetDataHook } from '@/hooks/analytic.hook'
import React from 'react'
import { useMemo } from 'react'
import { CartesianGrid, Tooltip } from 'recharts'

const DashboardAnalytics = () => {
  const {data} = useGetDataHook()
   const {startDate, endDate}=useMemo(()=>{
const end = new Date()
    const start = new Date()
    start.setDate(end.getDate()-6)
    end.setDate(end.getData()+1)
    const toStr = (d)=>d.toISOString('i')[0]
    return{
      startDate:toStr(start),
      endDate:toStr(end)
    }
   },[])
  const {data:dailyData,isLoading } = useGetDailyData(
    
    startDate,
    endDate
  )
  
  return (
    <div>
      <div className='flex gao-6'>
        <div className='p-6 shadow-md bg-zinc-100 rounded-lg '>Course:{data?.courses}
   </div>
      <div className='p-6 shadow-md bg-zinc-100 rounded-lg '>
        Total enrollment:{data?.totalEnrollments}
      </div>
      <div className='p-6 shadow-md bg-zinc-100 rounded-lg '> 
        revenue:{data?.totalRevenue} </div>
      <div className='p-6 shadow-md bg-zinc-100 rounded-lg '>
         total user :{data?.users}</div>
         <div className='bg-white rounded-x1 shadow-md border border-blue-200 '>
          <h2>Revenue(Daily)</h2>
          {isLoading?<>
          <h1> Loading</h1>
          </>
        :<>
        <div className='h-[70%] with-full bg-white rounded-md shadow-md' >
          <ResponseContainer width={'100%'} height={'100%'}>
          <LineChart data={dailyDate||[]}>
            <CartesianGrid stroke='#e5e666' strokeDasharray={"3 3"} />
            <XAxis dartKey="date" tick= {{frontSize:12}}/>
            <YAxis tick= {{frontSize:12}} />

              <Tooltip
              formatter={(value, name)=>{
                if(name==='revenue')
                return[`${value}`]
                if(name ==='enrollments'|| name==="sales")return[value, "Enrollment"]
                return [value, name]                
              
              }}/>
                <Line
                type={'monotone'}
                dataKey={'revenue'}
                stroke='#256'
                strokewidth={2}
                activeDot={{r:5}}
                s
                />
                

          </LineChart>
          </ResponseContainer> 
        </div>
        </>}
         </div>
      </div>
    </div>
    
  )
}

export default DashboardAnalytics