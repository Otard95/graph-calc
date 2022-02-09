// import original module declarations
import React from 'react';
import 'styled-components';
import { ThemeConsumer } from 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface Color {
    light: string
    base: string
    dark: string
  }
  export interface ColorVariants {
    primary: Color
    secondary: Color
    highlight: Color
    green: Color
    red: Color
    gray: Color
  }
  
  export type ButtonVariants = 'primary' | 'secondary' | 'action' | 'green' | 'red'
  export type Buttons = Record<ButtonVariants, Record<string, any>>

  export type InputVariants = 'primary' | 'secondary'
  export type Inputs = Record<InputVariants, Record<string, any>>

  export type Themes = 'dark' | 'light'
  
  export interface DefaultTheme {
    name: Themes,
    buttons: Buttons
    inputs: Inputs
    colors: ColorVariants
    setTheme: React.Dispatch<React.SetStateAction<Themes>>
  }
}