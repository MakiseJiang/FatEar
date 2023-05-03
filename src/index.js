import React from 'react';
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import './static/css/index.css';
import App from './App';
import ErrorPage from './pages/404Error';
import Base from './layouts/Base';
import ViewPage from './pages/View';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>

      <BrowserRouter>
        <App />
      </BrowserRouter>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
