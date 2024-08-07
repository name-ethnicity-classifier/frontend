import { extendTheme } from "@chakra-ui/react";
import type { ThemeConfig } from "@chakra-ui/react";


const config: ThemeConfig = { };

export const theme = extendTheme({
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  fontSizes: {
    xs: "15px",
    sm: "20px",
    md: "30px",
    lg: "40px",
    xl: "60px"
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700
  },
  colors: {
    primaryBlue: "#535EF1",
    secondaryBlue: "#C0C4FD",
    surfaceBlue: "#F5F6FE",
    textDark: "#3C406F",
    textLight: "#737695",
    lightGray: "#D6D6D6",
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
    Button: {
      baseStyle: {
        fontWeight: "medium",
        fontSize: "md",
        width: "75px",
        height: "30px",
				backgroundColor: "primaryBlue"
      }
    }
  },
  config,
});
