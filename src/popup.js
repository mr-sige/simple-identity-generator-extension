import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

require('./style.css');

const Main = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

const content = document.getElementById('content');
ReactDOM.render(<Main />, content);
