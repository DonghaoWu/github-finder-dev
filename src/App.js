import React, { useEffect, useState } from 'react';
import './App.css';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';

import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIEND_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIEND_SECRET}`);
        setLoading(false);
        setUsers(res.data);

      } catch (err) {
        setLoading(false);
      }
    }
    fetchData();
  }, [])

  return (
    <div className="App">
      <Navbar />
      <div className='container'>
        <Users loading={loading} users={users} />
      </div>
    </div>
  );
}

export default App;
