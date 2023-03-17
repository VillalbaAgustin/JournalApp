import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
  palette: {
    primary:{
      main:'#393E46'
    },
    secondary:{
      main: '#EBEBEB'
      
    },

    error:{
      main: red.A400
    }
  }
})