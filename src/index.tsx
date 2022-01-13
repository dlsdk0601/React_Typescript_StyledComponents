import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ThemeProvider} from "styled-components";
import { lightTheme, darkTheme } from './theme';


ReactDOM.render(
  <ThemeProvider theme={lightTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);


