import React, { useEffect, useState } from 'react';

import '../static/css/App.css';
import Sidebar from '../components/Sidebar';

function WelcomePage() {
  const [currTime, setCurrTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrTime(data.time);
    })
  }, []);

  return (
    <div className='WelcomePage'>
      <p>Hello, world!</p>
      <p>The current time is {currTime}. </p>
      <Sidebar/>
    </div>
  );
}

export default WelcomePage;
