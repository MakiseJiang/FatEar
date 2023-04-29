import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/Login';
import Layout from './layouts/Layout';
import SearchBar from './components/Searchbar';
import View from './pages/View';

import './static/css/App.css'

function App() {
  const [token, setToken] = useState();

  const handleLogout = (e) => {
    e.preventDefault();
    setToken(null);
  }

  // if (!token) {
  //   return <LoginPage saveToken={ setToken } />
  // }

  return (
    <Layout>
      <Routes>
        <Route exact path='/' element={<SearchBar />}/>
        <Route path='/song/:sid' element={<View />}/>
      </Routes>
    </Layout>
  )
}

export default App;
