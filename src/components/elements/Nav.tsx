import React from 'react'

import Div from '$/components/base/Div'
import Button from '$/components/base/Button'
import Heading from '$/components/base/Heading'
import Logo from '$/components/elements/Logo'

interface NavProps {
  area: string
}
const Nav: React.FC<NavProps> = ({ area }) => (
  <Div
    height='50px' gridArea={area} p='5px'
    display='flex' alignItems='center'
    borderBottomWidth='2px' borderBottomStyle='solid'
    borderBottomColor='primary.light' backgroundColor='primary.dark'
  >
    <Logo size={40}/>
    <Div
      height='100%' p='0 10px'
      display='flex' flexDirection='column'
      justifyContent='center' borderRightWidth='2px'
      borderRightStyle='solid' borderRightColor='gray.base'
    >
      <Heading.h6>Prosperous Universe</Heading.h6>
      <Heading.h4 letterSpacing='.17rem'>Calculator</Heading.h4>
    </Div>
    <Button variant='secondary' ml='10px'>Test</Button>
  </Div>
)
export default Nav
