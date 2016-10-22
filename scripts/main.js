import 'jquery';
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import '../styles/main.scss';
import store from "./store/store";


import App from './containers/App';

const main = document.getElementById('main')

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, main);