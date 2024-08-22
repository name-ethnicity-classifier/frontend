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
      100: "#F5F6FE",
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
  /* space: {
    px: "1px",
    "0": "0px",
    "5": "5px",
    "2": "10px",
    "3": "15px",
    "3": "20px",
    "4": "25px",
    "8": "50px",
    "9": "75px",
    "10": "100px"
  }, */
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
          _hover: {
            bg: "primaryBlue.200"
          },
          ">.chakra-button__icon": {
            paddingX: "0px",
          },
        },
        secondary: {
          bg: "secondaryBlue.100",
          color: "primaryBlue.100",
          fontSize: "xs",
          borderRadius: "7px",
          _hover: {
            bg: "secondaryBlue.200"
          }
        },
        cautious: {
          bg: "secondaryRed.100",
          color: "primaryRed.100",
          fontSize: "xs",
          borderRadius: "7px",
          _hover: {
            bg: "secondaryRed.200"
          }
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
  
  config,
});
