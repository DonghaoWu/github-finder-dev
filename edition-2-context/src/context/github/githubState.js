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
            const res = await axios.get('https://api.github.com/search/users',
                {
                    params: {
                        q: text,
                        client_id: githubClientId,
                        client_secret: githubClientSecret
                    }
                }
            )
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
            const res = await axios.get(`https://api.github.com/users/${username}`,
                {
                    params: {
                        client_id: githubClientId,
                        client_secret: githubClientSecret
                    }
                });

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
            const res = await axios.get(`https://api.github.com/users/${username}/repos`, {
                params: {
                    per_page: '5',
                    sort: 'created:asc',
                    client_id: githubClientId,
                    client_secret: githubClientSecret
                }
            });

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