import React from 'react'
import SidebarImage from '../Atoms/SidebarImage/SidebarImage'
const image = '../../assets/images/network.jpg'
function AuthLayout({children}) {
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 bg-white">
        {children}
      </div>
      <SidebarImage />
    </div>
  )
}

export default AuthLayout