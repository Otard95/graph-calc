import styled from 'styled-components'
import { typography, TypographyProps } from 'styled-system'

type HeadingProps = TypographyProps

const h1 = styled.h1<HeadingProps>`
  ${typography}
`
const h2 = styled.h2<HeadingProps>`
  ${typography}
`
const h3 = styled.h3<HeadingProps>`
  ${typography}
`
const h4 = styled.h4<HeadingProps>`
  ${typography}
`
const h5 = styled.h5<HeadingProps>`
  ${typography}
`
const h6 = styled.h6<HeadingProps>`
  ${typography}
`

export default {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
}
