
interface Color {
  light: string
  base: string
  dark: string
}
const primary: Color = {
  light: '#37516D',
  base: '#123',
  dark: '#040608',
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
  base: '#aaa',
  dark: '#777',
}

const buttons = {
  primary: {
    border: 'none',
    backgroundColor: highlight.base,
    color: gray.light,
    fontWeight: 700,
    '&:hover': {
      color: primary.base,
    }
  },
  secondary: {
    border: 'none',
    backgroundColor: primary.light,
    color: gray.base,
    fontWeight: 400,
    '&:hover': {
      color: gray.light,
    }
  },
  green: {
    border: 'none',
    backgroundColor: green.base,
    color: gray.light,
    fontWeight: 400,
    '&:hover': {
      color: primary.base,
    }
  },
  red: {
    border: 'none',
    backgroundColor: red.base,
    color: gray.light,
    fontWeight: 400,
    '&:hover': {
      color: primary.base,
    }
  },
}

const colors = {
  primary,
  secondary,
  highlight,
  green,
  red,
  gray,
}

const dark = {
  name: 'dark',
  colors,
  buttons,
}

export default dark
