import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [type, setType] = useState('');
  const [repos, setRepos] = useState([]);

  const searchUsers = async (text) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

      setUsers(res.data.items);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  // Get a Github user
  const getUser = async (username) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

      setUser(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  // Get user repos
  const getUserRepos = async (username) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

      setRepos(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  // Clear users 
  const handleClearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  // handle alert
  const handleAlert = (msg, type) => {
    setMsg(msg);
    setType(type);

    setTimeout(() => {
      setMsg('');
      setType('');
    }, 2000)
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className='container'>
          <Alert msg={msg} type={type} />
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search
                  searchUsers={searchUsers}
                  handleClearUsers={handleClearUsers}
                  showClearButton={users.length ? true : false}
                  handleAlert={handleAlert}
                />
                <Users loading={loading} users={users} />
              </Fragment>
            )} />
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:username' render={props => (
              <User
                {...props}
                getUser={getUser}
                user={user}
                loading={loading}
                getUserRepos={getUserRepos}
                repos={repos}
              />
            )} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
