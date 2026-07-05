import React from 'react'
import { useLocation } from 'react-router-dom'
import MainRoutes from './Routes/MainRoute'

const App = () => {
  const location = useLocation()
  const hiddenRoutes = ['/login', '/register', '/dashboard']
  const shouldHideNavbar = hiddenRoutes.some((route) =>
    location.pathname.toLowerCase().startsWith(route)
  )

  return (
    <div>
      {!shouldHideNavbar && (
        <nav className="p-4 bg-white shadow-md">
          <h1 className="text-xl font-bold">AI Power LMS</h1>
        </nav>
      )}
      <MainRoutes />
    </div>
  )
}

export default App