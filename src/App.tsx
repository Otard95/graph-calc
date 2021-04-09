import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import dark from '/theme/dark'
import Logo from '/components/elements/Logo'

const AppContainer = styled.div`
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 10rem 0;
`

const App = () => (
  <ThemeProvider theme={dark}>
    <AppContainer>
      <h1>Prosperous Universe Calculator</h1>
      <Logo size='large'/>
    </AppContainer>
  </ThemeProvider>
)
export default App
