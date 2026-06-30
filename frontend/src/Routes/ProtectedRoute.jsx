import { useUserStore } from "@/store/user.store"
import { useGetUserHook } from "@/hooks/User.hook"
import { Navigate } from "react-router-dom"
import { useEffect } from "react"

export const ProtectedRoute = ({ children }) => {
    const setUser = useUserStore((state) => state.setUser)
    const { data, isLoading, isError, error } = useGetUserHook()

    useEffect(() => {
        if (data) setUser(data)
    }, 
)

    if (isLoading) return <div>Loading...</div>

    if (isError && error?.response?.status === 401) {
        return <Navigate to={'/login'} replace />
    }

    if (!data) return <Navigate to={'/login'} replace />

    return children
}