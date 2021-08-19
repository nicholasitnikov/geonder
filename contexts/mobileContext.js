import React, { useContext, useState, useEffect } from 'react'

const MobileContext = React.createContext('mobile')

export const useMobile = () => {
  return useContext(MobileContext)
}



export const MobileProvider = ({ children }) => {

  useEffect(() => {

    setIsMobile(window.innerWidth < 530)

    if(window.innerWidth > 530) {
      setIsMenuOpen(true)
    }

    window.addEventListener('resize', windowResize)

    return(() => {
      window.removeEventListener('resize', windowResize)
    })

  }, [])

  const windowResize = () => {

    setIsMobile(window.innerWidth < 530)
    setIsMenuOpen(!window.innerWidth < 530)

  }

  const toggleMenu = () => setIsMenuOpen(prev => !prev)
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return(
    <MobileContext.Provider value={{
      isMobile,
      isMenuOpen,
      toggleMenu
    }}>
      {children}
    </MobileContext.Provider>
  )

}
