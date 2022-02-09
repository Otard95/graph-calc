import { Color, ColorVariants, DefaultTheme, Inputs } from 'styled-components'

const primary: Color = {
  light: '#242424',
  base: '#1c1c1c',
  dark: '#181818',
}
const secondary: Color = {
  light: '#73BBE7',
  base: '#3FA2DE',
  dark: '#1E77AE',
}
const highlight: Color = {
  light: '#FFBB33',
  base: '#F7A600',
  dark: '#cc8800',
}
const green: Color = {
  light: '#79DD7A',
  base: '#5CB85C',
  dark: '#449C44',
}
const red: Color = {
  light: '#79DD7A',
  base: '#D9534F',
  dark: '#A72925',
}
const gray: Color = {
  light: '#eeeeee',
  base: '#bbbbbb',
  dark: '#777777',
}

const removeFocusOutline = {
  ':focus': {
    outline: 'none'
  }
}
const buttons = {
  primary: {
    border: 'none',
    backgroundColor: highlight.base,
    color: gray.light,
    fontWeight: 700,
    padding: '2px 6px',
    '&:hover': {
      color: primary.base,
      fontWeight: 400,
    },
    ...removeFocusOutline
  },
  secondary: {
    border: 'none',
    backgroundColor: primary.light,
    color: gray.base,
    fontWeight: 400,
    fontSize: '11px',
    padding: '5px 6px',
    textTransform: 'uppercase',
    '&:hover': {
      color: gray.light,
    },
    ...removeFocusOutline
  },
  action: {
    border: 'none',
    backgroundColor: primary.light,
    color: gray.dark,
    fontWeight: 400,
    padding: '2px 6px',
    '&:hover': {
      backgroundColor: highlight.base,
      color: primary.base,
    },
    ...removeFocusOutline
  },
  green: {
    border: 'none',
    backgroundColor: green.base,
    color: gray.light,
    fontWeight: 400,
    padding: '2px 6px',
    '&:hover': {
      color: primary.base,
    },
    ...removeFocusOutline
  },
  red: {
    border: 'none',
    backgroundColor: red.base,
    color: gray.light,
    fontWeight: 400,
    padding: '2px 6px',
    '&:hover': {
      color: primary.base,
    },
    ...removeFocusOutline
  },
}

const inputs: Inputs = {
  primary: {
    border: `none`,
    borderBottom: `2px solid ${highlight.base}22`,
    backgroundColor: `${highlight.base}22`,
    ...removeFocusOutline
  },
  secondary: {
    ...removeFocusOutline
  },
}

const colors: ColorVariants = {
  primary,
  secondary,
  highlight,
  green,
  red,
  gray,
}

const dark: Omit<DefaultTheme, 'setTheme'> = {
  name: 'dark',
  colors,
  buttons,
  inputs
}

export default dark
