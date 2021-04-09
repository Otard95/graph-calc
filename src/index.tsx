import React from 'react'
import { render } from 'react-dom'

import App from './App'

const preloadContainer = document.querySelector('#pre-load')
const appMount = document.querySelector('#app')

if (appMount && preloadContainer) {
  preloadContainer.remove()
  render(<App/>, appMount)
} else {
  document.body.innerText = 'Failed to mount app'
}
