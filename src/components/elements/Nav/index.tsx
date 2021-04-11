import React from 'react'

import Div from '$/components/base/Div'
import Button from '$/components/base/Button'
import Logo from '$/components/elements/Logo'

interface NavProps {
  area: string
}
const Nav: React.FC<NavProps> = ({ area }) => (
  <Div
    height='50px'
    gridArea={area}
    display='flex'
    alignItems='center'
    borderBottomWidth='2px'
    borderBottomStyle='solid'
    borderBottomColor='primary.light'
    p='5px'
  >
    <Logo size='x-small'/>
    <Div
      height='100%'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      p='0 10px'
      borderRightWidth='2px'
      borderRightStyle='solid'
      borderRightColor='gray.base'
    >
      <h6>Prosperous Universe</h6>
      <h4>Calculator</h4>
    </Div>
    <Button variant='secondary' ml='10px'>Test</Button>
  </Div>
)
export default Nav
