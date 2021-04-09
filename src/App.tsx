import React from 'react'
import styled from 'styled-components'

import Logo from '/components/base/Logo'

const AppContainer = styled.div`
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 10rem 0;
`

const App = () => (
  <AppContainer>
    <h1>Prosperous Universe Calculator</h1>
    <Logo size='large' alt="logo"/>
  </AppContainer>
)
export default App
