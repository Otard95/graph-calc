import styled from 'styled-components'
import {
  space,
  layout,
  color,
  borders,
  borderWidth,
  borderStyle,
  borderRadius,
  shadow,
  LayoutProps,
  SpaceProps,
  ColorProps,
  BorderProps,
  BorderWidthProps,
  BorderStyleProps,
  BorderRadiusProps,
  ShadowProps,
  GridProps,
  grid,
  flexbox,
  FlexboxProps
} from 'styled-system'

type DivProps =
  SpaceProps
  & LayoutProps
  & ColorProps
  & BorderProps
  & BorderWidthProps
  & BorderStyleProps
  & BorderRadiusProps
  & ShadowProps
  & FlexboxProps
  & GridProps
const Div = styled.div<DivProps>`
  ${space}
  ${layout}
  ${color}
  ${borders}
  ${borderWidth}
  ${borderStyle}
  ${borderRadius}
  ${shadow}
  
  ${flexbox}
  ${grid}
`
export default Div
