import React from 'react'
import { useLocation } from 'react-router-dom'
import MainRoutes from './Routes/MainRoute'
import Navbar from './components/Navbar'

const App = () => {
  const location = useLocation()
  const hiddenRoutes = ['/login', '/register']
  const shouldHideNavbar = hiddenRoutes.some((route) =>
    location.pathname.toLowerCase().startsWith(route)
  )

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <MainRoutes />
    </div>
  )
}

export default App