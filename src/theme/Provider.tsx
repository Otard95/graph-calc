import React from 'react'
import { ThemeProvider as BaseThemeProvider, createGlobalStyle, DefaultTheme, Themes } from 'styled-components'

import useOSTheme from './os-theme'
import dark from './dark'
import light from './light'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: 'Droid Sans', sans-serif;
  }
  body {
    background-color: ${props => props.theme.colors.primary.base};
    color: ${props => props.theme.colors.gray.base};
  }
`

const themes: Record<Themes, Omit<DefaultTheme, 'setTheme'>> = {
  dark,
  light,
}
const ThemeProvider: React.FC = ({ children }) => {
  const [ theme, setTheme ] = useOSTheme()
  
  return (
    <BaseThemeProvider theme={{ ...themes[theme], setTheme }}>
      <GlobalStyle/>
      {children}
    </BaseThemeProvider>
  )
}
export default ThemeProvider
