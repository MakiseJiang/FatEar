import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/Login';
import Layout from './layouts/Layout';
import SearchBar from './components/Searchbar';

import './static/css/App.css'
import ViewPage from './pages/View';
import FriendPage from './pages/Friend';
import NotificationPage from './pages/Notification';


function App() {
  const [token, setToken] = useState();


  

  

  // const handleLogout = (e) => {
  //   e.preventDefault();
  //   setToken(null);
  // }

  // if (!token) {
  //   return <LoginPage saveToken={ setToken } />
  // }
  

  return (
    <Layout >
      <Routes>
        <Route exact path='/' element={<SearchBar />}/>
        <Route path='/friends' element={<FriendPage />}/>
        <Route path='/notification' element={<NotificationPage />}/>
        <Route path='/song/:sid' element={<ViewPage />}/>
      </Routes>
    </Layout>
  )
}

export default App;
