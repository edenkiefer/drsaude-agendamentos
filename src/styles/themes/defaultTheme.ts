import { css } from 'styled-components'

export const defaultTheme = {
  colors: {
    white: '#FFFFFF',
    yellow: '#FFCC69',
    'yellow-light': '#FFD686',

    'red-700': '#880808',

    'blue-300': '#215A8D',
    'blue-500': '#0f497b',

    'gray-100': '#f5f8fa',
    'gray-200': '#e3e3e3',
    'gray-300': '#D3D3D3',
    'gray-400': '#878787',
    'gray-600': '#444444',
    'gray-800': '#222222',
  },
  mixins: {
    titleL: css`
      font-family: 'Open Sans', sans-serif;
      font-size: 2rem;
      line-height: 130%;
      font-weight: 800;
    `,
    titleM: css`
      font-family: 'Open Sans', sans-serif !important;
      font-size: 1.5rem !important;
      line-height: 130% !important;
      font-weight: 800 !important;
    `,
    textL: css`
      font-family: Poppins, sans-serif;
      font-size: 1.25rem;
      line-height: 130%;
      font-weight: 400;
    `,
    textM: css`
      font-family: Poppins, sans-serif;
      font-size: 1rem;
      line-height: 130%;
      font-weight: 400;
    `,
    textS: css`
      font-family: Poppins, sans-serif;
      font-size: 0.875rem;
      line-height: 130%;
      font-weight: 400;
    `,
    button: css`
      font-family: Poppins, sans-serif;
      font-size: 1.25rem;
      line-height: 160%;
      font-weight: 500;
    `,
  },
}
