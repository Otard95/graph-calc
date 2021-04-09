import React from 'react'
import styled from 'styled-components'

import logo from './public/img/Logo-medium.png'

const AppContainer = styled.div`
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 10rem 0;
`
const Logo = styled.img`
  height: 500px;
`

const App = () => (
  <AppContainer>
    <h1>Prosperous Universe Calculator</h1>
    <Logo src={logo} alt="logo"/>
  </AppContainer>
)
export default App
