import { Color, ColorVariants, DefaultTheme } from 'styled-components'

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
  dark: '#c80',
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
  light: '#eee',
  base: '#bbb',
  dark: '#777',
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
    }
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
    }
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
    }
  },
  green: {
    border: 'none',
    backgroundColor: green.base,
    color: gray.light,
    fontWeight: 400,
    padding: '2px 6px',
    '&:hover': {
      color: primary.base,
    }
  },
  red: {
    border: 'none',
    backgroundColor: red.base,
    color: gray.light,
    fontWeight: 400,
    padding: '2px 6px',
    '&:hover': {
      color: primary.base,
    }
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
}

export default dark
