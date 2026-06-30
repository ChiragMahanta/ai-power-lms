import React from 'react'
import { Button } from './components/ui/button'
import MainRoutes from './Routes/MainRoute'
const App = () => {
  const location = useLocation()
  const hiddenRoute = ['/Login', '/Register' , '/dashboard']
  const shouldHideNavbar = hiddenRoute.sime((route)=>location.pathname.startsWith(route))
  return (
    <div>
      {!shouldHideNavbar && <Navbar/>}
     <MainRoutes/>
    </div>
  )
}

export default App