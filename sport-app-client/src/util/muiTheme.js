import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {theme} from "./theme";

export const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: theme.colors.primary
    },
    background: {
      paper: '#424242'
    },
    divider: 'rgba(255,255,255,0.12)'
  },
  props: {
    MuiTextField: {
      variant: "outlined"
    }
  },
  overrides: {
    MuiTextField: {
      root: {
        backgroundColor: theme.colors.darkest,
        width: '100%',
        borderRadius: '5px',
        color: 'white'
      }
    },
    MuiInputLabel: {
      root: {
        color: theme.colors.lightgray
      },
      outlined: {
        transform: "translate(15px, 17px) scale(1)"
      }
    },
    MuiFormLabel: {
      root: {
        color: '#c4c4c4',
        "&$disabled": {
          color: theme.colors.gray
        }
      }
    },
    MuiFormControlLabel: {
      root: {
        margin: 0
      }
    },
    MuiInputBase: {
      input: {
        "&::placeholder": {
          color: "white"
        },
        color: "white"
      }
    },
    MuiTableCell: {
      root: {
        color: 'rgba(255, 255, 255) !important',
        borderBottom: '1px solid rgba(0,0,0, 0.6)',
        paddingTop: '3px',
        paddingBottom: '3px'
      },
      head: {
        fontWeight: 'bold',
        backgroundColor: theme.colors.darkgray
      }
    },
    MuiPaper: {
      root: {
        color: "white"
      }
    },
    MuiButton: {
      root: {
        color: "white"
      },
      outlined: {
        color: theme.colors.primary,
        borderColor: theme.colors.primary
      }
    },
    MuiPaginationItem: {
      root: {
        color: 'white'
      }
    },
    MuiFab: {
      root: {
        position: "absolute",
        bottom: '16px',
        left: '16px'
      }
    },
    MuiOutlinedInput: {
      input: {
        padding: "0.9em 0.6em"
      }
    },
    MuiTypography: {
      root: {
        overflow: "hidden"
      },
      colorTextSecondary: {
        color: "white"
      }
    },
    MuiAlert: {
      standardInfo: {
        color: "rgb(166, 213, 250)",
        backgroundColor: "rgb(3, 14, 24)"
      },
      standardWarning: {
        color: "rgb(255, 213, 153)",
        backgroundColor: "rgb(25, 15, 0)"
      }
    },
    MuiBackdrop: {
      root: {
        zIndex:'auto'
      }
    }
  },
  typography: {
    fontFamily: "inherit"
  }
});