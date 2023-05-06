import React from 'react';
import {  Navigate, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/Login';
import Layout from './layouts/Layout';
import SearchBar from './components/Searchbar';
import useToken from './components/useToken';

import './static/css/App.css'
import ViewPage from './pages/View';
import FriendPage from './pages/Friend';
import NotificationPage from './pages/Notification';
import NewsPage from './pages/News';
import SearchUserPage from './pages/SearchUser';


function App() {
  const { token, removeToken, setToken } = useToken();

  return (
    <div>
      {!token && token!=="" && token!== undefined?
      <LoginPage setToken={setToken}/>
      :(
        <Layout token={removeToken}>
          <Routes>
            <Route exact path='/' element={<SearchBar />}/>
            <Route path='/news' element={<NewsPage token={token}/>}/>
            <Route path='/friends' element={<FriendPage token={token}/>}/>
            <Route path='/notification' element={<NotificationPage token={token}/>}/>
            <Route path='/searchUser' element={<SearchUserPage token={token} />}/>
            <Route path='/song/:sid' element={<ViewPage token={token}/>}/>
          </Routes>
          </Layout>
      )}
    </div>
  )
}

export default App;
