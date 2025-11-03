/**
 * Color Palette - Neo Brutalism Style
 * Main color: #006C36 (dark green)
 */

export const colors = {
  // Primary green shades
  primary: {
    main: '#006C36',
    light: '#009955',
    lighter: '#00CC73',
    lightest: '#00FF91',
    dark: '#004D2A',
    darker: '#003320',
  },
  
  // Neutrals
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  
  // Status colors
  status: {
    success: '#00FF91',
    error: '#FF006E',
    warning: '#FFD60A',
    info: '#009955',
  },
  
  // Background colors
  background: {
    main: '#FFFFFF',
    secondary: '#FAFAFA',
    accent: '#F5F5F5',
  },
} as const;

export type ColorKey = keyof typeof colors;
export type PrimaryColorKey = keyof typeof colors.primary;
export type StatusColorKey = keyof typeof colors.status;

