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

  // -------------------
    // Search github users
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
      const res = await axios.get(`https://api.github.com/users/${username}/repos?per_gage=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      setRepos(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }