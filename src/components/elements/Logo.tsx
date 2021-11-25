import React from 'react'
import styled from 'styled-components'

import avg from '$/utils/math/avg'

import logoLarge from '$/public/img/Logo-large.png'
import logoMedium from '$/public/img/Logo-medium.png'
import logoSmall from '$/public/img/Logo-small.png'

type LogoSizes = 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | number
const sizes: Record<LogoSizes, [number, string]> & { resolve: (size: number) => [number, string] } = {
  'x-large': [800, logoLarge],
  large: [500, logoLarge],
  medium: [300, logoMedium],
  small: [100, logoSmall],
  'x-small': [50, logoSmall],
  resolve: (size) => {
    if (size < avg(sizes['x-small'][0], sizes.small[0])) {
      return sizes['x-small']
    } else if (size < avg(sizes.small[0], sizes.medium[0])) {
      return sizes.small
    } else if (size < avg(sizes.medium[0], sizes.large[0])) {
      return sizes.medium
    } if (size < avg(sizes.large[0], sizes['x-large'][0])) {
      return sizes.large
    }
    return sizes['x-large']
  }
}
interface LogoImageProps {
  size: LogoSizes
}
const LogoImage = styled.img<LogoImageProps>`
  max-height: ${props => typeof props.size === 'number'
    ? props.size
    : sizes[props.size][0]}px;
`

interface LogoProps extends LogoImageProps {
}
const Logo: React.FC<LogoProps> = ({ size }) => (
  <LogoImage
    size={size}
    src={typeof size === 'number'
      ? sizes.resolve(size)[1]
      : sizes[size][1]
    } alt="Logo"
  />
)

export default Logo
