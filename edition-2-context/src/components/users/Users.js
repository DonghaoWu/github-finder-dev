import React from 'react';
import PropTypes from 'prop-types';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

const Users = props => {
    const { users, loading } = props;

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

Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
}

const userStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
}

export default Users;
