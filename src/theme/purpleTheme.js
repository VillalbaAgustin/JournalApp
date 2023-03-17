import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
  palette: {
    primary:{
      main: '#5ABCB9'
    },
    secondary:{
      main:'#333333'
    },
    third:{
      main: '#EBEBEB'
    },
    error:{
      main: red.A400
    }
  }
})