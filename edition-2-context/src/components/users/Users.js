import React, { useContext } from 'react';

import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

import GithubContext from '../../context/github/githubContext'


const Users = props => {
    const { users, loading } = useContext(GithubContext)

    return loading
        ? (
            <Spinner />
        ) :
        (
            <div style={userStyle}>
                {
                    users.map(user => {
                        return (
                            <UserItem key={user.id} user={user} />
                        )
                    })
                }
            </div>
        )
}

const userStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
}

export default Users;
