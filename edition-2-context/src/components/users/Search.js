import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchUsers, handleClearUsers, showClearButton, handleAlert }) => {
    const searchTextRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTextRef.current.value === '') {
            handleAlert('Please enter something', 'light');
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
                showClearButton &&
                <button className='btn btn-light btn-block' onClick={handleClearUsers}>Clear</button>
            }
        </div>
    )
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    handleClearUsers: PropTypes.func.isRequired,
    showClearButton: PropTypes.bool.isRequired,
    handleAlert: PropTypes.func.isRequired,
}

export default Search;