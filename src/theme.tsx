import { extendTheme } from "@chakra-ui/react";
import type { ThemeConfig } from "@chakra-ui/react";
import "@fontsource-variable/noto-sans-jp";

const config: ThemeConfig = {};

export const theme = extendTheme({
  fonts: {
    heading: "Noto Sans, sans-serif",
    body: "Noto Sans, sans-serif",
  },
  fontSizes: {
    "2xs": "12px",
    xs: "14px",
    sm: "18px",
    md: "23px",
    lg: "28px",
    xl: "33px",
    "2xl": "38px",
    "3xl": "43px",
    "4xl": "48px",
    "5xl": "53px"
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 900,
  },
  colors: {
    primaryBlue: {
      100: "#6C6AFC",
      200: "#6260F8"
    },
    secondaryBlue: {
      100: "#CDCFFA",
      200: "#B7BBFB"
    },
    surfaceBlue: {
      100: "#F1F2FD",
      200: "#EBEDFC"
    },
    primaryRed: {
      100: "#EF383B",
      200: "#CB3436"
    },
    secondaryRed: {
      100: "#FFB8B9",
      200: "#FFA1A3"
    },
    primaryOrange: {
      100: "#e39d07",
      200: "#ebac00"
    },
    secondaryOrange: {
      100: "#f5e3ae",
      200: "#f5df9f"
    },
    primaryTurquoise: {
      100: "#00bd7b",
      200: "#"
    },
    secondaryTurquoise: {
      100: "#abf5dc",
      200: "#8ff2d1"
    },
    textDark: "#3C406F",
    textLight: "#737695",
    lightGray: "#E6E6E6"
  },
  breakpoints: {
    base: '0em',
    sm: '34em',
    md: '48em',
    lg: '62em',
    xl: '80em', 
    '2xl': '96em',
  },
  components: {
    Text: {
      baseStyle: {
        fontSize: "xs",
        color: "textLight",
      },
      variants: {
        "bold": {
          fontWeight: "bold",
          color: "textDark"
        },
        "link": {
          fontWeight: "bold",
          color: "primaryBlue.100",
          _hover: {
            color: "secondaryBlue.200"
          }
        }
      }
    },
    Link: {
      baseStyle: {
        fontSize: "xs",
        color: "primaryBlue.100",
        fontWeight: "bold",
        _hover: {
          textDecoration: "none",
          color: "secondaryBlue.200"
        }
      },
    },
    Heading: {
      baseStyle: {
        fontSize: "md",
        color: "textDark",
        fontWeight: "bold"
      },
      variants: {
        "h1": {
          fontSize: "2xl"
        },
        "h2": {
          fontSize: "md"
        },
        "h3": {
          fontSize: "sm"
        }
      }
    },
    Button: {
      variants: {
        default: {
          bg: "primaryBlue.100",
          color: "white",
          fontSize: "xs",
          borderRadius: "7px",
          lineHeight: "100%",
          _hover: {
            bg: "primaryBlue.200"
          },
          ">.chakra-button__icon": {
            paddingX: "0px",
          },
          _disabled: {
            _hover: {
              bg: "primaryBlue.100 !important",
            },
          }
        },
        secondary: {
          bg: "secondaryBlue.100",
          color: "primaryBlue.100",
          lineHeight: "100%",
          fontSize: "xs",
          borderRadius: "7px",
          _hover: {
            bg: "secondaryBlue.200"
          },
          _disabled: {
            _hover: {
              bg: "secondaryBlue.100 !important",
            },
          }
        },
        cautious: {
          bg: "secondaryRed.100",
          color: "primaryRed.100",
          fontSize: "xs",
          borderRadius: "7px",
          lineHeight: "100%",
          _hover: {
            bg: "secondaryRed.200"
          },
          _disabled: {
            _hover: {
              bg: "secondaryRed.100 !important",
            },
          },
        },
        success: {
          bg: "secondaryTurquoise.100",
          color: "primaryTurquoise.100",
          fontSize: "xs",
          borderRadius: "7px",
          lineHeight: "100%",
          _hover: {
            bg: "secondaryTurquoise.200"
          },
          _disabled: {
            _hover: {
              bg: "secondaryTurquoise.100 !important",
            },
          },
        },
      },
      defaultProps: {
        variant: "default",
      },
    },
    Input: {
      variants: {
        default: {
          field: {
            borderRadius: "7px",
            boxShadow: "sm",
            bg: "white",
            borderWidth: "2px",
            borderColor: "transparent",
            fontSize: "xs",
            color: "textLight",
            _placeholder: {
              color: "gray.400",
            },
            _focus: {
              borderColor: "primaryBlue.100",
            },
          },
        },
      },
      defaultProps: {
        variant: "default",
      },
    },
    Textarea: {
      variants: {
        default: {
            borderRadius: "7px",
            boxShadow: "sm",
            bg: "white",
            borderWidth: "2px",
            borderColor: "transparent",
            fontSize: "xs",
            resize: "none",
            color: "textLight",
            _placeholder: {
              color: "gray.400",
            },
            _focus: {
              borderColor: "primaryBlue.100",
            },
        },
      },
      defaultProps: {
        variant: "default",
      },
    },
    Select: {
      variants: {
        default: {
          field: {
            borderRadius: "7px",
            boxShadow: "sm",
            bg: "white",
            borderWidth: "2px",
            borderColor: "transparent",
            fontSize: "xs",
            color: "textLight",
            _placeholder: {
              color: "textLight",
            },
            _focus: {
              borderColor: "primaryBlue.100",
            },
          },
        },
      },
      defaultProps: {
        variant: "default",
      },
    },
  },
  styles: {
    global: {
      ".no-scrollbar": {
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      },
    },
  },
  
  config,
});
