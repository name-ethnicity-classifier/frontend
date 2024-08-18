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
    primaryBlue: "#6556F0",
    secondaryBlue: "#CDCFFA",
    surfaceBlue: "#F5F6FE",
    primaryBlueHover: "#5C4ED6",
    secondaryBlueHover: "#B7BBFB",
    surfaceBlueHover: "#EBEDFC",
    textDark: "#3C406F",
    textLight: "#737695",
    lightGray: "#E6E6E6",
    primaryRed: "#EF383B",
    primaryRedHover: "#CB3436",
    secondaryRed: "#FFB8B9",
    secondaryRedHover: "#FFA1A3",
    successGreen: "green",
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
          color: "primaryBlue",
          _hover: {
            color: "primaryBlueHover"
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
  },
  config,
});
