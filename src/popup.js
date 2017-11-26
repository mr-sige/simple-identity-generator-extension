import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';

require('./style.css');

const content = document.getElementById('content');
ReactDOM.render(<App />, content);
