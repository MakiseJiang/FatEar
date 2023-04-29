import React from 'react';

import '../static/css/App.css';
import Layout from '../layouts/Layout';
import SearchBar from '../components/Searchbar';


function HomePage({ userToken }) {
  return (
    <Layout token={ userToken }>
        <SearchBar/>
    </Layout>

  );
}

export default HomePage;
