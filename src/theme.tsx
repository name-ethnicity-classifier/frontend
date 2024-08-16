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
    xs: "15px",
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
    textDark: "#3C406F",
    textLight: "#737695",
    lightGray: "#E6E6E6",
    errorRed: "red",
    successGreen: "green",
  },
  breakpoints: {
    base: '0em', // 0px
    sm: '34em', // ~480px. em is a relative unit and is dependant on the font size.
    md: '48em', // ~768px
    lg: '62em', // ~992px
    xl: '80em', // ~1280px
    '2xl': '96em', // ~1536px
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
  components: {},
  config,
});
