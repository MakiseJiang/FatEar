import { useState } from 'react';

function useToken() {

  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken && userToken
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken) {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };


  function removeToken() {
    localStorage.removeItem("token");
    if (localStorage.getItem('Visitor') != null) {
      localStorage.removeItem('Visitor');
    }
    setToken(null);
  }


  return {
    setToken: saveToken,
    token,
    removeToken,
  }

}

export default useToken;