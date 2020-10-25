import React, { useRef, useContext } from 'react';

import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

const Search = () => {
    const { searchUsers, handleClearUsers, users } = useContext(GithubContext);
    const { setAlert } = useContext(AlertContext);

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