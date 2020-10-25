# Front end development tools (Part 16)

### `Key Words: React hooks, Github APi, Context patterns, react syntax(语法), netlify.`

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/Frontend-tools-demo/blob/master/README.md)

## `Section: Github API & Context API.` (Basic)

### `Summary`: In this documentation, we learn to use react context api.

### `Check Dependencies & Tools:`

- npx create-react-app
- react-router-dom
- axios
- netlify-cli
------------------------------------------------------------

#### `本章背景：`
1. 本章使用了 Github API，同时介绍了另外一种 context api 的组织方式。

------------------------------------------------------------

#### `Context API:`
- [Github API.](https://developer.github.com/v3/)
- [React Context documentation.](https://reactjs.org/docs/context.html)


#### `Github API:`

- `Search a user`
- https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`

- `Get a user`
- https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}

- `Get repos`
- https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}

### <span id="16.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/Frontend-tools-demo/blob/master/README.md)

- [16.1 Preparation.](#16.1)
- [16.2 Some react knowledge.](#16.2)
- [16.3 Set up context API.](#16.3)
- [16.4 Deploy on netlify.](#16.4)

------------------------------------------------------------

### <span id="16.1">`Step1: Preparation.`</span>

- #### Click here: [BACK TO CONTENT](#16.0)

1. Install dependencies.

    ```bash
    $ npm i react-router-dom
    $ npm i axios
    ```

2. Set up local frontend environment variables.

    - create-react-app 自带本地 environment 设置，不需要安装 dotenv，只需要：
        1. Add a new file: .env.local
        2. 每个变量前面都要添加 `REACT_APP_`,比如

        ```js
        REACT_APP_GITHUB_CLIENT_ID=1111123
        REACT_APP_GITHUB_CLIENT_SECRET=123123
        ```

### <span id="16.2">`Step2: Some react knowledge.`</span>

- #### Click here: [BACK TO CONTENT](#16.0)

1. `rafcp 指令：快速生成一个 functional component 的模版。`

2. class component 本地 props 设置：

    ```jsx
    // 设置

    static defaultProps ={
        title:'Github FInder',
        icon:`fab fa-github`
    };

    // 使用：

    this.props.title
    this.props.icon
    ```

3. Set up certain columns in a row (flex)

    ```css
    .item-container {
        width: 100%;
        
        text-align: center;
            display: flex;
            align-content: flex-start;
            flex-flow: row wrap;
        }

        .item {
            flex: 0 0 25%;
            margin-bottom: 20px;
        }
    }
    ```

4. useRef 的使用，可以简化获取表格的函数设置：

    ```diff
    +   import React, { useRef } from 'react'

        const Search = props => {
    +       const searchTextRef = useRef();

            const handleSubmit = (e) => {
                e.preventDefault();
    +           console.log(searchTextRef.current.value);
            }

            return (
                <div>
                    <form className='form' onSubmit={handleSubmit}>
    +                   <input type='text' name='text' placeholder='Search Users...' ref={searchTextRef} />
                        <input type='submit' value='Search' className='btn btn-block btn-dark' />
                    </form>
                </div>
            )
        }

        export default Search
    ```

    - 对比原版：

    ```js
    import React, { useState } from 'react'

    const Search = props => {
        const [text, setText] = useState('');

        const handleChange = (e)=>{
            setText(e.target.value)
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(text);
        }

        return (
            <div>
                <form className='form' onSubmit={handleSubmit}>
                    <input type='text' name='text' placeholder='Search Users...' value={text} onChange={handleChange} />
                    <input type='submit' value='Search' className='btn btn-block btn-dark' />
                </form>
            </div>
        )
    }

    export default Search
    ```

5. :gem::gem::gem: `a tag`  & `<Link>` & `history.push`

    a: a会导致页面全部刷新，重新请求页面资源（或者重新从缓存中取出页面资源），视觉上会出现一个闪现的效果。简而言之：页面上所有的组件都会重新的挂载。

    history.push: 原理和linkto完全一致，都是用diff算法做跳转。

6. :gem::gem::gem: react router Route 的两种写法：

```jsx
// 方法一：
<Route exact path='/user/:username' 
    render={props => (
        <User {...props} />
    )} 
/>

// 方法二：
<Route exact path='/user/:username' component={User}/>
```

7. :gem::gem::gem: react-router 实现的参数传递：

```js
// App.js
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

// UserItem.js
<Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>More</Link>


// User.js
const User = ({ getUser, user, loading, match, getUserRepos, repos }) => {
    useEffect(() => {
        getUser(match.params.username);
        getUserRepos(match.params.username);
    }, [])
    //...
}
```

#### `Comment:`
1. 

### <span id="16.3">`Step3: Set up context API.`</span>

- #### Click here: [BACK TO CONTENT](#16.0)

1. Add github context.

    1. Add githubContext.

        __`Location:.edition-2-context/src/context/github/githubContext.js`__

        ```js
        import { createContext } from 'react';

        const GithubContext = createContext();

        export default GithubContext;
        ```

    2. Add githubState.

        __`Location:.edition-2-context/src/context/github/githubState.js`__

        ```js
        import React, { useReducer } from 'react';
        import axios from 'axios';
        import GithubContext from './githubContext';
        import GithubReducer from './githubReducer';

        import {
            SEARCH_USERS,
            SET_LOADING,
            CLEAR_USERS,
            GET_USER,
            GET_REPOS
        } from '../types';

        const GithubState = props => {
            const initialState = {
                users: [],
                user: {},
                repos: [],
                loading: false
            }

            const [state, dispatch] = useReducer(GithubReducer, initialState);

            let githubClientId;
            let githubClientSecret;

            if (process.env.NODE_ENV !== 'production') {
                githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
                githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
            } else {
                githubClientId = process.env.GITHUB_CLIENT_ID;
                githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
            }

            // Search user

            const searchUsers = async (text) => {
                setLoading();
                try {
                    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);

                    dispatch({
                        type: SEARCH_USERS,
                        payload: res.data.items
                    })
                } catch (err) {
                    console.log(err)
                }
            }

            // Get user

            const getUser = async (username) => {
                setLoading();
                try {
                    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);

                    dispatch({
                        type: GET_USER,
                        payload: res.data
                    })
                } catch (err) {
                    console.log(err)
                }
            }

            // Get user repos

            const getUserRepos = async (username) => {
                setLoading(true);
                try {
                    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`);

                    dispatch({
                        type: GET_REPOS,
                        payload: res.data
                    })

                } catch (err) {
                    console.log(err)
                }
            }

            // Clear search result

            const handleClearUsers = () => {
                dispatch({ type: CLEAR_USERS })
            }

            // Set loading

            const setLoading = () => {
                dispatch({ type: SET_LOADING })
            }

            return (
                <GithubContext.Provider
                    value={{
                        users: state.users,
                        user: state.user,
                        repos: state.repos,
                        loading: state.loading,
                        searchUsers: searchUsers,
                        handleClearUsers: handleClearUsers,
                        getUser: getUser,
                        getUserRepos: getUserRepos,
                    }}
                >
                    {props.children}
                </GithubContext.Provider>
            )
        }

        export default GithubState;
        ```

    3. Add githubReducer.

        __`Location:.edition-2-context/src/context/github/githubReducer.js`__

        ```js
        import {
            SEARCH_USERS,
            SET_LOADING,
            CLEAR_USERS,
            GET_USER,
            GET_REPOS
        } from '../types';

        const githubReducer = (state, action) => {
            switch (action.type) {
                case SET_LOADING:
                    return {
                        ...state,
                        loading: true
                    }
                case SEARCH_USERS:
                    return {
                        ...state,
                        users: action.payload,
                        loading: false
                    }
                case CLEAR_USERS:
                    return {
                        ...state,
                        users: [],
                        user: {},
                        repos: [],
                        loading: false
                    }
                case GET_USER:
                    return {
                        ...state,
                        user: action.payload,
                        loading: false
                    }
                case GET_REPOS:
                    return {
                        ...state,
                        repos: action.payload,
                        loading: false
                    }
                default:
                    return state
            }
        }

        export default githubReducer;    
        ```

2. Apply the githubState.

    __`Location:.edition-2-context/src/App.js`__

    ```diff
        import React from 'react';
        import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

        import Navbar from './components/layout/Navbar';
        import User from './components/users/User';
        import Alert from './components/layout/Alert';
        import About from './components/pages/About';
        import Home from './components/pages/Home';
        import NotFound from './components/pages/NotFound';

    +   import GithubState from './context/github/githubState';
    +   import AlertState from './context/alert/alertState';

        import './App.css';

        function App() {
            return (
    +           <GithubState>
    +               <AlertState>
                        <Router>
                        <div className="App">
                            <Navbar />
                            <div className='container'>
                            <Alert />
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route exact path='/about' component={About} />
                                <Route exact path='/user/:username' component={User} />
                                <Route component={NotFound} />
                            </Switch>
                            </div>
                        </div>
                        </Router>
    +               </AlertState>
    +           </GithubState>
            );
        }

        export default App;
    ```

3. Use the context content.

    __`Location:.edition-2-context/src/components/users/Search.js`__

    ```diff
        import React, { useRef, useContext } from 'react';

    +   import GithubContext from '../../context/github/githubContext'
    +   import AlertContext from '../../context/alert/alertContext'

        const Search = () => {
    +       const { searchUsers, handleClearUsers, users } = useContext(GithubContext);
    +       const { setAlert } = useContext(AlertContext);

            const searchTextRef = useRef();

            const handleSubmit = (e) => {
                e.preventDefault();
                if (searchTextRef.current.value === '') {
                    setAlert('Please enter something', 'light');
                } else {
                    searchUsers(searchTextRef.current.value);
                    searchTextRef.current.value = '';
                }
            }

            return (
                <div>
                    <form className='form' onSubmit={handleSubmit}>
                        <input type='text' name='text' placeholder='Search Users...' ref={searchTextRef} />
                        <input type='submit' value='Search' className='btn btn-block btn-dark' />
                    </form>
                    {
                        users.length > 0
                            ?
                            <button className='btn btn-light btn-block' onClick={handleClearUsers}>Clear</button>
                            :
                            null
                    }
                </div>
            )
        }

        export default Search;
    ```

#### `Comment:`
1. :gem::gem::gem: userReducer 使用的场合：
    ```js
    const [state, dispatch] = useReducer(GithubReducer, initialState);
    ```

2. :gem::gem::gem: githubState 在一些用法也称作 githubProvider。

-----------------------------------------------------------------

### <span id="16.4">`Step4: Deploy on netlify.`</span>

- #### Click here: [BACK TO CONTENT](#16.0)

-----------------------------------------------------------------

__`本章用到的全部资料：`__

- [React Context documentation.](https://reactjs.org/docs/context.html)

- #### Click here: [BACK TO CONTENT](#16.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/Frontend-tools-demo/blob/master/README.md)