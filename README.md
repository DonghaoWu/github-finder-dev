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



