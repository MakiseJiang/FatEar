import React from 'react';
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './static/css/index.css';
import WelcomePage from './pages/Welcome';
import ErrorPage from './pages/404Error';
import LoginPage from './pages/Login';
import Base from './layouts/Base';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/Login",
    element: <LoginPage />
  },
  {
    path: "/Home",
    element: <Home />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Base>
      <RouterProvider router={router} />
    </Base>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
