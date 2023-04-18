import React from 'react';

import '../static/css/App.css';
import Layout from '../layouts/Layout';
import SearchBar from '../components/Searchbar';


function Home() {
  return (
    <Layout>
        <SearchBar />
        <p>Your Profile</p>
    </Layout>

  );
}

export default Home;
