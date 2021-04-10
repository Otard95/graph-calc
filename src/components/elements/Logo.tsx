import React from 'react'
import styled from 'styled-components'

import logoLarge from '$/public/img/Logo-large.png'
import logoMedium from '$/public/img/Logo-medium.png'
import logoSmall from '$/public/img/Logo-small.png'

type LogoSizes = 'x-small' | 'small' | 'medium' | 'large' | 'x-large'
const sizes: Record<LogoSizes, [number, string]> = {
  'x-large': [800, logoLarge],
  large: [500, logoLarge],
  medium: [300, logoMedium],
  small: [100, logoSmall],
  'x-small': [50, logoSmall],
}
interface LogoImageProps {
  size: LogoSizes
}
const LogoImage = styled.img<LogoImageProps>`
  max-height: ${props => sizes[props.size][0]}px;
`

interface LogoProps extends LogoImageProps {
}
const Logo: React.FC<LogoProps> = ({ size }) => (
  <LogoImage size={size} src={sizes[size][1]} alt="Logo"></LogoImage>
)

export default Logo
