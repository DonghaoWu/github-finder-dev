1. rafcp
```jsx
import React from 'react'
import PropTypes from 'prop-types'

const Navbar = props => {
    return (
        <div>
            
        </div>
    )
}

Navbar.propTypes = {

}

export default Navbar
```

2. static defaultProps, 只适用于 calss component。

```jsx
static defaultProps ={
    title:'Github FInder',
    icon:`fab fa-github`
};
```

```jsx
Navbar.defaultProps = {
    title: 'Github Finder',
    icon: 'fab fa-github'
}
```

3. ptsr

4. just state, no constructure

5. react style variables
```jsx
const userStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
}
```

6. 未补充 UserItem flex style

7. test spinner
```js
        setTimeout(() => {
          setLoading(false);
          setUsers(res.data);
        }, 1000)
```

8. env variables (`.env.local`)

9. 使用 useRef 代替获取表格的一系列函数。

```js
import React, { useRef } from 'react'

const Search = props => {
    const searchTextRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchTextRef.current.value);
    }

    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <input type='text' name='text' placeholder='Search Users...' ref={searchTextRef} />
                <input type='submit' value='Search' className='btn btn-block btn-dark' />
            </form>
        </div>
    )
}

export default Search
```

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

10. 简约写法
```js
{
    showClearButton &&<button className='btn btn-light btn-block' onClick={handleClearUsers}>Clear</button>
}
```

11. `a tag` vs `Link` vs `history.push`

12. react-router 传输数据的的节奏：:gem::gem::gem:

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

13. 传递 `{...props}` 是为了能够传递 match 到达 User component。
