import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Router from './Router';

// Or Create your Own theme:
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2962ff'
    },
    secondary: {
      main: '#2962ff'
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router/>
  </MuiThemeProvider>,
  document.getElementById('root')
);

