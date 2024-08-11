import { extendTheme } from "@chakra-ui/react";
import type { ThemeConfig } from "@chakra-ui/react";
import "@fontsource-variable/noto-sans-jp";



const config: ThemeConfig = { };

export const theme = extendTheme({
  fonts: {
    heading: "Noto Sans, sans-serif",
    body: "Noto Sans, sans-serif",
  },
  fontSizes: {
    xs: "14px",
    sm: "18px",
    md: "30px",
    lg: "40px",
    xl: "60px"
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 900
  },
  colors: {
    primaryBlue: "#535EF1",
    secondaryBlue: "#C0C4FD",
    surfaceBlue: "#F5F6FE",
    textDark: "#3C406F",
    textLight: "#737695",
    lightGray: "#E6E6E6",
    errorRed: "red",
    successGreen: "green",
  },
  space: {
    px: "1px",
    "0": "0px",
    "1": "5px",
    "2": "20px",
    "3": "25px",
    "4": "50px",
    "5": "75px"
  },
  components: {
    
  },
  config,
});
