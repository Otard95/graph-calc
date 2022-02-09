import styled, { ButtonVariants } from 'styled-components'
import { layout, LayoutProps, space, SpaceProps, variant } from 'styled-system'

interface ButtonProps extends SpaceProps, LayoutProps {
  variant: ButtonVariants
}
const Button = styled.button<ButtonProps>`
  ${space}
  ${layout}
  ${variant({ prop: 'variant', scale: 'buttons' })}
`
export default Button
