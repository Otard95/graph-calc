import React, { ChangeEvent, FC, FocusEvent, useState } from 'react'
import styled, { InputVariants } from 'styled-components'
import { space, SpaceProps, variant } from 'styled-system'

const typeAlignment: Record<string, string> = {
  number: 'right'
}

type StyledProps = SpaceProps
interface StyledInputProps extends StyledProps {
  variant: InputVariants
  invalid: boolean
}
const StyledInput = styled.input<StyledInputProps>`
  ${space}
  ${variant({ prop: 'variant', scale: 'inputs' })}
  text-align: ${props => typeAlignment[(props.type as string)] || 'left'};
  appearance: none;
`

interface InputProps extends StyledProps {
  variant?: InputVariants
  type: 'text' | 'number'
  label: string
  format?: (value: string) => string
  /**
   * Validate the input. return bool or string with an error message  
   * If format function is specified validate will receive its output.
   */
  validate?: (value: string) => boolean | string
  onChange?: (value: string) => void
}
const Input: FC<InputProps> = ({
  variant,
  type,
  label,
  onChange: parentOnChange,
  validate,
  format,
  ...props
}) => {
  const [ value, setValue ] = useState('')
  const [ invalid, setInvalid ] = useState(true)
  const [ _error, setError ] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value
    if (format) val = format(val)
    setValue(val)
  }
  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    let val = e.target.value
    if (format) val = format(val)
    if (validate) {
      const validation = validate(val)
      setInvalid(!(typeof validation === 'string' || !validation))
      if (typeof validation === 'string') setError(validation)
    }
    setValue(val)
    if (parentOnChange) parentOnChange(val)
  }

  return (
    <StyledInput
      {...props}
      variant={variant || 'primary'}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      invalid={invalid}
    />
  )
}
export default Input
