import { createTheme  } from '@material-ui/core/styles';

export default createTheme ({
    palette: {
      primary: { main: "#46619c" }, 
      secondary: { main: '#71429f' },
      info: { main: "#111" },
      yellow: {main: "#FFC000", dark: "#ab8100" },
      disabled: {main: "#EBEBEB", dark: "#D5D5D5"},
    },
    typography: {  
      fontSize: 16,
      fontFamily: [
        'Kanit'
      ].join(',')
    },
    customTable: {
      "& .MuiTableCell-sizeSmall": {
        padding: "6px 0px 6px 0px"
      }
    },
  });