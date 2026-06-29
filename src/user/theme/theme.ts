import { alpha, createTheme, Theme, ThemeOptions } from '@mui/material/styles';

const zambia = {
  green: {
    main: '#198A00',
    light: '#3AA922',
    dark: '#126800',
    subtle: '#E3F5DD',
    contrastText: '#FFFFFF',
  },
  red: {
    main: '#D7261E',
    light: '#F04A43',
    dark: '#AD1A15',
  },
  black: {
    900: '#0B0D09',
    800: '#141912',
    700: '#20271B',
  },
  orange: {
    main: '#EF8B00',
    light: '#FFAA33',
    dark: '#C96F00',
    subtle: '#FFF1D9',
    contrastText: '#111111',
  },
  cream: {
    50: '#FFFDF5',
    100: '#F7F2E8',
    200: '#E9E1CD',
  },
};

export function getTheme(mode: 'light' | 'dark'): Theme {
  const darkThemeOptions: ThemeOptions = {
    palette: {
      mode: 'dark',
      primary: {
        main: zambia.green.main,
        light: zambia.green.light,
        dark: zambia.green.dark,
        contrastText: zambia.green.contrastText,
      },
      secondary: {
        main: zambia.orange.main,
        light: zambia.orange.light,
        dark: zambia.orange.dark,
        contrastText: zambia.orange.contrastText,
      },
      error: {
        main: zambia.red.main,
        light: zambia.red.light,
        dark: zambia.red.dark,
      },
      warning: {
        main: zambia.orange.main,
        light: zambia.orange.light,
        dark: zambia.orange.dark,
      },
      info: {
        main: zambia.green.main,
        light: zambia.green.light,
        dark: zambia.green.dark,
      },
      background: {
        default: zambia.black[900],
        paper: zambia.black[800],
      },
      divider: alpha('#E6F1DF', 0.16),
      action: {
        hover: alpha(zambia.green.main, 0.12),
        selected: alpha(zambia.orange.main, 0.2),
        focus: alpha(zambia.orange.main, 0.24),
      },
    },
    typography: {
      fontFamily:
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: 1.2,
      },
      h2: {
        fontWeight: 700,
        fontSize: '2rem',
        lineHeight: 1.25,
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.3,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
  };

  const lightThemeOptions: ThemeOptions = {
    palette: {
      mode: 'light',
      primary: {
        main: zambia.green.main,
        light: zambia.green.light,
        dark: zambia.green.dark,
        contrastText: zambia.green.contrastText,
      },
      secondary: {
        main: zambia.orange.main,
        light: zambia.orange.light,
        dark: zambia.orange.dark,
        contrastText: zambia.orange.contrastText,
      },
      error: {
        main: zambia.red.main,
        light: zambia.red.light,
        dark: zambia.red.dark,
      },
      warning: {
        main: zambia.orange.main,
        light: zambia.orange.light,
        dark: zambia.orange.dark,
      },
      info: {
        main: zambia.green.main,
        light: zambia.green.light,
        dark: zambia.green.dark,
      },
      background: {
        default: zambia.cream[50],
        paper: '#FFFFFF',
      },
      divider: alpha(zambia.black[700], 0.16),
      action: {
        hover: alpha(zambia.green.main, 0.08),
        selected: alpha(zambia.orange.main, 0.16),
        focus: alpha(zambia.orange.main, 0.2),
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            backgroundImage: `linear-gradient(135deg, ${zambia.green.main} 0%, ${zambia.green.light} 100%)`,
            boxShadow: `0 10px 24px ${alpha(zambia.green.main, 0.25)}`,
          },
          containedSecondary: {
            backgroundImage: `linear-gradient(135deg, ${zambia.orange.dark} 0%, ${zambia.orange.main} 100%)`,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          colorSecondary: {
            backgroundColor: zambia.orange.subtle,
            color: '#5A3100',
          },
        },
      },
    },
  };

  if (mode === 'dark') {
    return createTheme(darkThemeOptions);
  }

  return createTheme(lightThemeOptions);
}
