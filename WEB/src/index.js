import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <BrowserRouter>
    <App isLoggedIn= {localStorage.getItem('token')} />
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
