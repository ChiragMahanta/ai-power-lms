import { useGetDailyData, useGetDataHook } from '@/hooks/analytic.hook'
import React, { useMemo } from 'react'
import {
  CartesianGrid,
  Tooltip,
  LineChart,
  XAxis,
  YAxis,
  Line,
  ResponsiveContainer,
} from 'recharts'

const DashboardAnalytics = () => {
  const { data } = useGetDataHook()

  const { startDate, endDate } = useMemo(() => {
    const end = new Date()
    const start = new Date()
    start.setDate(end.getDate() - 6)
    end.setDate(end.getDate() + 1)
    const toStr = (d) => d.toISOString().split('T')[0]
    return {
      startDate: toStr(start),
      endDate: toStr(end),
    }
  }, [])

  const { data: dailyData, isLoading } = useGetDailyData(startDate, endDate)

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="flex gap-6 flex-wrap">
        <div className="p-6 shadow-md bg-zinc-100 rounded-lg flex-1 min-w-[200px]">
          <p className="text-gray-500 text-sm">Courses</p>
          <p className="text-2xl font-bold">{data?.courses ?? '--'}</p>
        </div>
        <div className="p-6 shadow-md bg-zinc-100 rounded-lg flex-1 min-w-[200px]">
          <p className="text-gray-500 text-sm">Total Enrollments</p>
          <p className="text-2xl font-bold">{data?.totalEnrollments ?? '--'}</p>
        </div>
        <div className="p-6 shadow-md bg-zinc-100 rounded-lg flex-1 min-w-[200px]">
          <p className="text-gray-500 text-sm">Revenue</p>
          <p className="text-2xl font-bold text-green-600">₹{data?.totalRevenue ?? '--'}</p>
        </div>
        <div className="p-6 shadow-md bg-zinc-100 rounded-lg flex-1 min-w-[200px]">
          <p className="text-gray-500 text-sm">Total Users</p>
          <p className="text-2xl font-bold">{data?.users ?? '--'}</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl shadow-md border border-blue-200 p-6">
        <h2 className="text-xl font-bold mb-4">Revenue (Daily)</h2>
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center text-gray-500">Loading...</div>
        ) : (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData || []}>
                <CartesianGrid stroke="#e5e5e5" strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'revenue') return [`₹${value}`, 'Revenue']
                    if (name === 'enrollments' || name === 'sales') return [value, 'Enrollments']
                    return [value, name]
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={2}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardAnalytics