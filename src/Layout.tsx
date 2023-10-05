import React from 'react'
import styled from 'styled-components'

import Div from '$/components/base/Div'
import Nav from '$/components/elements/Nav'

const DesktopAreas = `
"nav"
"page"
`

const AppContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10rem 0;
  grid-area: page;
`

const Layout: React.FC = () => (
  <Div
    height='100vh'
    gridTemplateRows={['50px 1fr']}
    gridTemplateAreas={[DesktopAreas]}
  >
    <Nav area='nav'/>
    <AppContainer>
    </AppContainer>
  </Div>
)
export default Layout
