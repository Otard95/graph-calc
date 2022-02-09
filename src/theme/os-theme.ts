import { useState, useEffect, Dispatch, SetStateAction,  } from 'react'
import { Themes } from 'styled-components'

const themeDetector = window.matchMedia('(prefers-color-scheme: dark)')

const useOSTheme = (): [Themes, Dispatch<SetStateAction<Themes>>] => {
  const [ theme, setTheme ] = useState<Themes>(themeDetector.matches ? 'dark' : 'light')
  
  useEffect(() => {
    const changeHandler = (mq: MediaQueryListEvent) => setTheme(mq.matches ? 'dark' : 'light')
    themeDetector.addEventListener('change', changeHandler)
    return () => themeDetector.removeEventListener('change', changeHandler)
  })
  
  return [theme, setTheme]
}
export default useOSTheme
