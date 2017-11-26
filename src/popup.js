import ReactDOM from 'react-dom';
import React from 'react';
import Content from './Content';

require('./style.css');

const content = document.getElementById('content');
ReactDOM.render(<Content />, content);
