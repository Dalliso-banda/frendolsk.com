import { createTheme, ThemeOptions, alpha, Theme } from '@mui/material/styles';

// =============================================================================
// Color Palette: Arcane - Inspired by League of Legends
// =============================================================================
// Inspired by the Arcane series - the contrast between Piltover's pristine
// technology and Zaun's gritty undercity, with magical hextech energy
// Deep blues, glowing cyans, and vibrant magentas

const palette = {
  // Primary: Hextech Cyan - the glow of arcane magic and hextech
  arcane: {
    main: '#7DD4EA', // Bright hextech cyan
    light: '#A8E4F4',
    dark: '#4ABCD8',
    glow: '#B8F0FF',
    contrastText: '#0A1628',
  },
  // Secondary: Shimmer Pink - Jinx's chaotic energy, hextech instability
  shimmer: {
    main: '#D466A8', // Vibrant magenta-pink
    light: '#E88BC4',
    dark: '#B04088',
    glow: '#F4A0D4',
    contrastText: '#FFFFFF',
  },
  // Accent: Piltover Steel - clean technology and progress
  undercity: {
    main: '#6B8094', // Steel blue-gray
    light: '#8AA0B4',
    dark: '#4A6074',
    glow: '#A0C0D4',
    contrastText: '#FFFFFF',
  },
  // Danger: Zaun Chemtech - toxic warnings and danger
  ember: {
    main: '#E05070', // Chemtech red-pink
    light: '#F07090',
    dark: '#C03050',
    glow: '#FF90A8',
    contrastText: '#FFFFFF',
  },
  // Success: Verdant growth - nature persisting in the undercity
  verdant: {
    main: '#4A9A7A', // Teal-green
    light: '#6ABAA0',
    dark: '#2A7A5A',
    glow: '#8ADAC0',
    contrastText: '#FFFFFF',
  },
  // Neutrals: Undercity depths - deep blues and shadows
  void: {
    deepest: '#060D18', // Deepest undercity
    deep: '#0A1628', // Deep shadow blue
    mid: '#122438', // Standard dark background
    elevated: '#1A3048', // Cards/panels
    muted: '#243A54', // Muted surfaces
    light: '#2E4A68', // Lighter surface
  },
  ink: {
    primary: '#E8F0F8', // Cool white with blue tint
    secondary: '#A0B8C8', // Muted blue-gray
    muted: '#708898', // Faded blue text
    disabled: '#485868', // Very faded
  },
};

// =============================================================================
// Dark Theme - Primary Theme (Neo-Noir Undercity)
// =============================================================================

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: palette.arcane.main,
      light: palette.arcane.light,
      dark: palette.arcane.dark,
      contrastText: palette.arcane.contrastText,
    },
    secondary: {
      main: palette.shimmer.main,
      light: palette.shimmer.light,
      dark: palette.shimmer.dark,
      contrastText: palette.shimmer.contrastText,
    },
    error: {
      main: palette.ember.main,
      light: palette.ember.light,
      dark: palette.ember.dark,
    },
    success: {
      main: palette.verdant.main,
      light: palette.verdant.light,
      dark: palette.verdant.dark,
    },
    info: {
      main: palette.undercity.main,
      light: palette.undercity.light,
      dark: palette.undercity.dark,
    },
    warning: {
      main: '#D9943C',
      light: '#E9A44C',
      dark: '#B9741C',
    },
    background: {
      default: palette.void.mid,
      paper: palette.void.elevated,
    },
    text: {
      primary: palette.ink.primary,
      secondary: palette.ink.secondary,
      disabled: palette.ink.disabled,
    },
    divider: alpha(palette.arcane.main, 0.15),
    action: {
      hover: alpha(palette.arcane.main, 0.08),
      selected: alpha(palette.arcane.main, 0.16),
      focus: alpha(palette.arcane.main, 0.12),
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    // Display font for headings - elegant, slightly editorial
    h1: {
      fontFamily: '"Crimson Pro", Georgia, serif',
      fontWeight: 600,
      fontSize: '3rem',
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Crimson Pro", Georgia, serif',
      fontWeight: 600,
      fontSize: '2.25rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Crimson Pro", Georgia, serif',
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.375rem',
      lineHeight: 1.35,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.75,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.7,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      letterSpacing: '0.03em',
    },
    overline: {
      fontSize: '0.7rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  shape: {
    borderRadius: 6,
  },
  shadows: [
    'none',
    `0 1px 2px ${alpha('#000', 0.3)}`,
    `0 2px 4px ${alpha('#000', 0.3)}`,
    `0 4px 8px ${alpha('#000', 0.3)}`,
    `0 6px 12px ${alpha('#000', 0.35)}`,
    `0 8px 16px ${alpha('#000', 0.35)}`,
    `0 10px 20px ${alpha('#000', 0.35)}`,
    `0 12px 24px ${alpha('#000', 0.4)}`,
    `0 14px 28px ${alpha('#000', 0.4)}`,
    `0 16px 32px ${alpha('#000', 0.4)}`,
    `0 18px 36px ${alpha('#000', 0.45)}`,
    `0 20px 40px ${alpha('#000', 0.45)}`,
    `0 22px 44px ${alpha('#000', 0.45)}`,
    `0 24px 48px ${alpha('#000', 0.5)}`,
    `0 26px 52px ${alpha('#000', 0.5)}`,
    `0 28px 56px ${alpha('#000', 0.5)}`,
    `0 30px 60px ${alpha('#000', 0.55)}`,
    `0 32px 64px ${alpha('#000', 0.55)}`,
    `0 34px 68px ${alpha('#000', 0.55)}`,
    `0 36px 72px ${alpha('#000', 0.6)}`,
    `0 38px 76px ${alpha('#000', 0.6)}`,
    `0 40px 80px ${alpha('#000', 0.6)}`,
    `0 42px 84px ${alpha('#000', 0.65)}`,
    `0 44px 88px ${alpha('#000', 0.65)}`,
    `0 46px 92px ${alpha('#000', 0.65)}`,
  ] as Theme['shadows'],
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        :root {
          --glow-arcane: ${palette.arcane.glow};
          --glow-shimmer: ${palette.shimmer.glow};
          --glow-undercity: ${palette.undercity.glow};
        }
        
        ::selection {
          background: ${alpha(palette.arcane.main, 0.4)};
          color: ${palette.ink.primary};
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          scrollbar-width: thin;
          scrollbar-color: ${palette.void.light} ${palette.void.deep};
        }
        
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${palette.void.deep};
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${palette.void.light};
          border-radius: 5px;
          border: 2px solid ${palette.void.deep};
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${palette.void.muted};
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '10px 20px',
          fontWeight: 600,
          transition: 'all 0.2s ease-out',
          '&:focus-visible': {
            outline: `2px solid ${palette.arcane.main}`,
            outlineOffset: 2,
          },
        },
        contained: {
          boxShadow: `0 2px 8px ${alpha(palette.arcane.main, 0.3)}`,
          '&:hover': {
            boxShadow: `0 4px 16px ${alpha(palette.arcane.glow, 0.4)}, 0 0 0 1px ${alpha(palette.arcane.main, 0.2)} inset`,
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${palette.arcane.main} 0%, ${palette.arcane.dark} 100%)`,
          color: '#0A1628 !important',
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            color: '#0A1628',
          },
          '&:hover': {
            background: `linear-gradient(135deg, ${palette.arcane.light} 0%, ${palette.arcane.main} 100%)`,
          },
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${palette.shimmer.main} 0%, ${palette.shimmer.dark} 100%)`,
          color: '#FFFFFF !important',
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            color: '#FFFFFF',
          },
          '&:hover': {
            background: `linear-gradient(135deg, ${palette.shimmer.light} 0%, ${palette.shimmer.main} 100%)`,
          },
        },
        containedError: {
          background: `linear-gradient(135deg, ${palette.ember.main} 0%, ${palette.ember.dark} 100%)`,
          color: '#FFFFFF !important',
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            color: '#FFFFFF',
          },
          '&:hover': {
            background: `linear-gradient(135deg, ${palette.ember.light} 0%, ${palette.ember.main} 100%)`,
          },
        },
        containedSuccess: {
          background: `linear-gradient(135deg, ${palette.verdant.main} 0%, ${palette.verdant.dark} 100%)`,
          color: '#FFFFFF !important',
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            color: '#FFFFFF',
          },
          '&:hover': {
            background: `linear-gradient(135deg, ${palette.verdant.light} 0%, ${palette.verdant.main} 100%)`,
          },
        },
        containedInfo: {
          background: `linear-gradient(135deg, ${palette.undercity.main} 0%, ${palette.undercity.dark} 100%)`,
          color: '#FFFFFF !important',
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            color: '#FFFFFF',
          },
          '&:hover': {
            background: `linear-gradient(135deg, ${palette.undercity.light} 0%, ${palette.undercity.main} 100%)`,
          },
        },
        containedWarning: {
          background: 'linear-gradient(135deg, #D9943C 0%, #B9741C 100%)',
          color: '#0A1628 !important',
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            color: '#0A1628',
          },
          '&:hover': {
            background: 'linear-gradient(135deg, #E9A44C 0%, #D9943C 100%)',
          },
        },
        outlined: {
          borderWidth: 1.5,
          borderColor: alpha(palette.arcane.main, 0.5),
          '&:hover': {
            borderWidth: 1.5,
            borderColor: palette.arcane.main,
            backgroundColor: alpha(palette.arcane.main, 0.08),
            boxShadow: `0 0 12px ${alpha(palette.arcane.glow, 0.2)}`,
          },
        },
        outlinedPrimary: {
          borderColor: alpha(palette.arcane.main, 0.5),
          '&:hover': {
            borderColor: palette.arcane.main,
          },
        },
        text: {
          '&:hover': {
            backgroundColor: alpha(palette.arcane.main, 0.08),
          },
        },
        sizeSmall: {
          padding: '6px 14px',
          fontSize: '0.8125rem',
        },
        sizeLarge: {
          padding: '14px 28px',
          fontSize: '1rem',
        },
        startIcon: {
          marginRight: 10,
          '& > *:first-of-type': {
            fontSize: '1.125em',
          },
        },
        endIcon: {
          marginLeft: 10,
          '& > *:first-of-type': {
            fontSize: '1.125em',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-out',
          '&:hover': {
            backgroundColor: alpha(palette.arcane.main, 0.12),
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: palette.void.elevated,
          borderRadius: 8,
          border: `1px solid ${alpha(palette.arcane.main, 0.08)}`,
          transition: 'all 0.3s ease-out',
          overflow: 'hidden',
          '&:hover': {
            borderColor: alpha(palette.arcane.main, 0.2),
            boxShadow: `0 8px 32px ${alpha('#000', 0.4)}, 0 0 0 1px ${alpha(palette.arcane.main, 0.1)} inset`,
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 20,
          '&:last-child': {
            paddingBottom: 20,
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 1,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: palette.void.elevated,
          borderRadius: 12,
          border: `1px solid ${alpha(palette.arcane.main, 0.08)}`,
        },
        elevation0: {
          boxShadow: 'none',
          border: `1px solid ${alpha(palette.arcane.main, 0.1)}`,
        },
        elevation1: {
          boxShadow: `0 2px 8px ${alpha('#000', 0.15)}, 0 1px 3px ${alpha('#000', 0.1)}`,
        },
        elevation2: {
          boxShadow: `0 4px 16px ${alpha('#000', 0.2)}, 0 2px 6px ${alpha('#000', 0.12)}`,
        },
        outlined: {
          borderColor: alpha(palette.arcane.main, 0.15),
          borderWidth: 1,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: alpha(palette.void.deep, 0.85),
          backdropFilter: 'blur(12px) saturate(180%)',
          borderBottom: `1px solid ${alpha(palette.arcane.main, 0.1)}`,
          boxShadow: `0 4px 30px ${alpha('#000', 0.3)}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: palette.void.elevated,
          borderRight: `1px solid ${alpha(palette.arcane.main, 0.1)}`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: alpha(palette.arcane.main, 0.1),
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 500,
          fontSize: '0.75rem',
          height: 26,
          transition: 'all 0.2s ease-out',
        },
        filled: {
          backgroundColor: alpha(palette.arcane.main, 0.15),
          color: palette.arcane.light,
          '&:hover': {
            backgroundColor: alpha(palette.arcane.main, 0.25),
          },
        },
        outlined: {
          borderColor: alpha(palette.arcane.main, 0.3),
          '&:hover': {
            borderColor: palette.arcane.main,
            backgroundColor: alpha(palette.arcane.main, 0.08),
          },
        },
        clickable: {
          '&:hover': {
            boxShadow: `0 0 8px ${alpha(palette.arcane.glow, 0.3)}`,
          },
        },
        sizeSmall: {
          height: 22,
          fontSize: '0.7rem',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: palette.arcane.main,
          textDecoration: 'none',
          position: 'relative',
          transition: 'color 0.2s ease-out',
          '&:hover': {
            color: palette.arcane.light,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -1,
            left: 0,
            width: '100%',
            height: 1,
            backgroundColor: 'currentColor',
            transform: 'scaleX(0)',
            transformOrigin: 'right',
            transition: 'transform 0.3s ease-out',
          },
          '&:hover::after': {
            transform: 'scaleX(1)',
            transformOrigin: 'left',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: alpha(palette.void.deep, 0.5),
            transition: 'all 0.2s ease-out',
            '& fieldset': {
              borderColor: alpha(palette.arcane.main, 0.2),
              transition: 'all 0.2s ease-out',
            },
            '&:hover fieldset': {
              borderColor: alpha(palette.arcane.main, 0.4),
            },
            '&.Mui-focused fieldset': {
              borderColor: palette.arcane.main,
              borderWidth: 1.5,
              boxShadow: `0 0 0 3px ${alpha(palette.arcane.main, 0.1)}`,
            },
          },
          '& .MuiInputLabel-root': {
            color: palette.ink.secondary,
            '&.Mui-focused': {
              color: palette.arcane.main,
            },
            '&.MuiInputLabel-shrink': {
              backgroundColor: palette.void.mid,
              padding: '0 6px',
              marginLeft: '-4px',
            },
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          '& .MuiSvgIcon-root': {
            color: palette.ink.muted,
            fontSize: '1.25rem',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
        standardError: {
          backgroundColor: alpha(palette.ember.main, 0.15),
          color: palette.ember.light,
          '& .MuiAlert-icon': {
            color: palette.ember.main,
          },
        },
        standardSuccess: {
          backgroundColor: alpha(palette.verdant.main, 0.15),
          color: palette.verdant.light,
          '& .MuiAlert-icon': {
            color: palette.verdant.main,
          },
        },
        standardInfo: {
          backgroundColor: alpha(palette.undercity.main, 0.15),
          color: palette.undercity.light,
          '& .MuiAlert-icon': {
            color: palette.undercity.main,
          },
        },
        standardWarning: {
          backgroundColor: alpha(palette.arcane.dark, 0.15),
          color: palette.arcane.light,
          '& .MuiAlert-icon': {
            color: palette.arcane.main,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: palette.void.muted,
          color: palette.ink.primary,
          fontSize: '0.75rem',
          padding: '8px 12px',
          borderRadius: 4,
          boxShadow: `0 4px 16px ${alpha('#000', 0.4)}`,
        },
        arrow: {
          color: palette.void.muted,
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(palette.void.light, 0.5),
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: `2px solid ${alpha(palette.arcane.main, 0.3)}`,
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            borderRadius: 4,
            '&.Mui-selected': {
              backgroundColor: alpha(palette.arcane.main, 0.2),
              color: palette.arcane.light,
              '&:hover': {
                backgroundColor: alpha(palette.arcane.main, 0.3),
              },
            },
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
          backgroundColor: palette.arcane.main,
          boxShadow: `0 0 8px ${alpha(palette.arcane.glow, 0.5)}`,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          minHeight: 48,
          '&.Mui-selected': {
            color: palette.arcane.main,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          margin: '2px 8px',
          '&.Mui-selected': {
            backgroundColor: alpha(palette.arcane.main, 0.12),
            '&:hover': {
              backgroundColor: alpha(palette.arcane.main, 0.18),
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 3,
              height: '60%',
              backgroundColor: palette.arcane.main,
              borderRadius: '0 2px 2px 0',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: palette.void.elevated,
          border: `1px solid ${alpha(palette.arcane.main, 0.15)}`,
          boxShadow: `0 24px 80px ${alpha('#000', 0.6)}`,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: '"Crimson Pro", Georgia, serif',
          fontWeight: 600,
          fontSize: '1.5rem',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: palette.void.elevated,
          border: `1px solid ${alpha(palette.arcane.main, 0.1)}`,
          boxShadow: `0 8px 32px ${alpha('#000', 0.5)}`,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          margin: '2px 6px',
          '&:hover': {
            backgroundColor: alpha(palette.arcane.main, 0.1),
          },
          '&.Mui-selected': {
            backgroundColor: alpha(palette.arcane.main, 0.15),
          },
        },
      },
    },
  },
};

// =============================================================================
// Light Theme - Secondary Theme (Piltover - City of Progress)
// =============================================================================

const lightPalette = {
  background: {
    default: '#F0F4F8', // Cool light gray with blue tint
    paper: '#FFFFFF',
    elevated: '#F8FAFC',
  },
  text: {
    primary: '#0A1628',
    secondary: '#3A4A5A',
    muted: '#6A7A8A',
    disabled: '#9AAABA',
  },
  // Adjusted colors for light mode contrast
  arcane: {
    main: '#1A7090', // Darker teal-cyan for better white text contrast
    light: '#2A8AAA',
    dark: '#0A5070',
    glow: '#4AAACA',
  },
  shimmer: {
    main: '#8A3070', // Darker magenta for better contrast
    light: '#A04080',
    dark: '#6A2050',
  },
};

const lightThemeOptions: ThemeOptions = {
  ...darkThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: lightPalette.arcane.main,
      light: lightPalette.arcane.light,
      dark: lightPalette.arcane.dark,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: lightPalette.shimmer.main,
      light: lightPalette.shimmer.light,
      dark: lightPalette.shimmer.dark,
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#C93545',
      light: '#E95565',
      dark: '#A91525',
    },
    success: {
      main: '#2A7A44',
      light: '#4A9A64',
      dark: '#1A5A24',
    },
    info: {
      main: '#1A6A7A',
      light: '#3A8A9A',
      dark: '#0A4A5A',
    },
    warning: {
      main: '#B97420',
      light: '#D99440',
      dark: '#995400',
    },
    background: {
      default: lightPalette.background.default,
      paper: lightPalette.background.paper,
    },
    text: {
      primary: lightPalette.text.primary,
      secondary: lightPalette.text.secondary,
      disabled: lightPalette.text.disabled,
    },
    divider: alpha(lightPalette.arcane.main, 0.12),
    action: {
      hover: alpha(lightPalette.arcane.main, 0.06),
      selected: alpha(lightPalette.arcane.main, 0.12),
      focus: alpha(lightPalette.arcane.main, 0.08),
    },
  },
  components: {
    ...darkThemeOptions.components,
    MuiCssBaseline: {
      styleOverrides: `
        ::selection {
          background: ${alpha(lightPalette.arcane.main, 0.3)};
          color: ${lightPalette.text.primary};
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          scrollbar-width: thin;
          scrollbar-color: #D0D0D8 #F0F0F5;
        }
        
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #F0F0F5;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #D0D0D8;
          border-radius: 5px;
          border: 2px solid #F0F0F5;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #B0B0B8;
        }
      `,
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: alpha('#FFFFFF', 0.85),
          backdropFilter: 'blur(12px) saturate(180%)',
          borderBottom: `1px solid ${alpha(lightPalette.arcane.main, 0.1)}`,
          boxShadow: `0 1px 3px ${alpha('#000', 0.05)}`,
          color: lightPalette.text.primary,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: lightPalette.background.paper,
          borderRadius: 8,
          border: `1px solid ${alpha(lightPalette.arcane.main, 0.08)}`,
          boxShadow: `0 1px 3px ${alpha('#000', 0.05)}, 0 1px 2px ${alpha('#000', 0.03)}`,
          transition: 'all 0.3s ease-out',
          '&:hover': {
            borderColor: alpha(lightPalette.arcane.main, 0.15),
            boxShadow: `0 8px 24px ${alpha('#000', 0.08)}, 0 0 0 1px ${alpha(lightPalette.arcane.main, 0.05)} inset`,
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 1,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: lightPalette.background.paper,
          borderRadius: 12,
          border: `1px solid ${alpha(lightPalette.arcane.main, 0.08)}`,
        },
        elevation0: {
          boxShadow: 'none',
          border: `1px solid ${alpha(lightPalette.arcane.main, 0.1)}`,
        },
        elevation1: {
          boxShadow: `0 2px 8px ${alpha('#000', 0.06)}, 0 1px 3px ${alpha('#000', 0.04)}`,
        },
        elevation2: {
          boxShadow: `0 4px 16px ${alpha('#000', 0.08)}, 0 2px 6px ${alpha('#000', 0.05)}`,
        },
        outlined: {
          borderColor: alpha(lightPalette.arcane.main, 0.15),
          borderWidth: 1,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '10px 20px',
          fontWeight: 600,
          transition: 'all 0.2s ease-out',
        },
        contained: {
          boxShadow: `0 2px 4px ${alpha(lightPalette.arcane.main, 0.2)}`,
          '&:hover': {
            boxShadow: `0 4px 12px ${alpha(lightPalette.arcane.main, 0.25)}`,
            transform: 'translateY(-1px)',
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${lightPalette.arcane.main} 0%, ${lightPalette.arcane.dark} 100%)`,
          color: '#E8F4F8 !important',
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            color: '#E8F4F8',
          },
          '&:hover': {
            background: `linear-gradient(135deg, ${lightPalette.arcane.light} 0%, ${lightPalette.arcane.main} 100%)`,
          },
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${lightPalette.shimmer.main} 0%, ${lightPalette.shimmer.dark} 100%)`,
          color: '#F8E8F4 !important',
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            color: '#F8E8F4',
          },
          '&:hover': {
            background: `linear-gradient(135deg, ${lightPalette.shimmer.light} 0%, ${lightPalette.shimmer.main} 100%)`,
          },
        },
        containedError: {
          background: 'linear-gradient(135deg, #C93545 0%, #A91525 100%)',
          color: '#FFF0F2 !important',
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            color: '#FFF0F2',
          },
          '&:hover': {
            background: 'linear-gradient(135deg, #E95565 0%, #C93545 100%)',
          },
        },
        containedSuccess: {
          background: 'linear-gradient(135deg, #2A7A44 0%, #1A5A24 100%)',
          color: '#E8F8EE !important',
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            color: '#E8F8EE',
          },
          '&:hover': {
            background: 'linear-gradient(135deg, #4A9A64 0%, #2A7A44 100%)',
          },
        },
        containedInfo: {
          background: 'linear-gradient(135deg, #1A6A7A 0%, #0A4A5A 100%)',
          color: '#E8F4F8 !important',
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            color: '#E8F4F8',
          },
          '&:hover': {
            background: 'linear-gradient(135deg, #3A8A9A 0%, #1A6A7A 100%)',
          },
        },
        containedWarning: {
          background: 'linear-gradient(135deg, #B97420 0%, #995400 100%)',
          color: '#FFF8E8 !important',
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            color: '#FFF8E8',
          },
          '&:hover': {
            background: 'linear-gradient(135deg, #D99440 0%, #B97420 100%)',
          },
        },
        outlined: {
          borderWidth: 1.5,
          borderColor: alpha(lightPalette.arcane.main, 0.4),
          '&:hover': {
            borderWidth: 1.5,
            borderColor: lightPalette.arcane.main,
            backgroundColor: alpha(lightPalette.arcane.main, 0.05),
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 500,
          fontSize: '0.75rem',
          height: 26,
        },
        filled: {
          backgroundColor: alpha(lightPalette.arcane.main, 0.1),
          color: lightPalette.arcane.dark,
          '&:hover': {
            backgroundColor: alpha(lightPalette.arcane.main, 0.18),
          },
        },
        outlined: {
          borderColor: alpha(lightPalette.arcane.main, 0.3),
          '&:hover': {
            borderColor: lightPalette.arcane.main,
            backgroundColor: alpha(lightPalette.arcane.main, 0.05),
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: lightPalette.background.paper,
            '& fieldset': {
              borderColor: alpha(lightPalette.arcane.main, 0.2),
            },
            '&:hover fieldset': {
              borderColor: alpha(lightPalette.arcane.main, 0.4),
            },
            '&.Mui-focused fieldset': {
              borderColor: lightPalette.arcane.main,
              borderWidth: 1.5,
              boxShadow: `0 0 0 3px ${alpha(lightPalette.arcane.main, 0.08)}`,
            },
          },
          '& .MuiInputLabel-root': {
            color: lightPalette.text.secondary,
            '&.Mui-focused': {
              color: lightPalette.arcane.main,
            },
            '&.MuiInputLabel-shrink': {
              backgroundColor: lightPalette.background.paper,
              padding: '0 6px',
              marginLeft: '-4px',
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: lightPalette.background.paper,
          borderRight: `1px solid ${alpha(lightPalette.arcane.main, 0.1)}`,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: lightPalette.arcane.dark,
          '&:hover': {
            color: lightPalette.arcane.main,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: lightPalette.background.paper,
          border: `1px solid ${alpha(lightPalette.arcane.main, 0.1)}`,
          boxShadow: `0 24px 80px ${alpha('#000', 0.15)}`,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: lightPalette.background.paper,
          border: `1px solid ${alpha(lightPalette.arcane.main, 0.08)}`,
          boxShadow: `0 8px 32px ${alpha('#000', 0.1)}`,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: lightPalette.text.primary,
          color: lightPalette.background.paper,
        },
        arrow: {
          color: lightPalette.text.primary,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        standardError: {
          backgroundColor: alpha('#C93545', 0.1),
          color: '#A91525',
        },
        standardSuccess: {
          backgroundColor: alpha('#2A7A44', 0.1),
          color: '#1A5A24',
        },
        standardInfo: {
          backgroundColor: alpha('#1A6A7A', 0.1),
          color: '#0A4A5A',
        },
        standardWarning: {
          backgroundColor: alpha('#B97420', 0.1),
          color: '#995400',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          margin: '2px 8px',
          '&.Mui-selected': {
            backgroundColor: alpha(lightPalette.arcane.main, 0.08),
            '&:hover': {
              backgroundColor: alpha(lightPalette.arcane.main, 0.12),
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 3,
              height: '60%',
              backgroundColor: lightPalette.arcane.main,
              borderRadius: '0 2px 2px 0',
            },
          },
        },
      },
    },
  },
};

// =============================================================================
// Theme Exports
// =============================================================================

export const darkTheme = createTheme(darkThemeOptions);
export const lightTheme = createTheme(lightThemeOptions);

export function getTheme(mode: 'light' | 'dark') {
  return mode === 'dark' ? darkTheme : lightTheme;
}

// Export palette for use in components
export { palette };
