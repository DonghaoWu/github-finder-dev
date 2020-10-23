import React from 'react'
import PropTypes from 'prop-types'

const UserItem = props => {

    const { login, avatar_url, html_url } = props.user;

    return (
        <div className='card text-center' style={userItemStyle}>
            <img
                src={avatar_url}
                className='round-img'
                alt=''
                style={{ width: '60px' }} />

            <h3>{login}</h3>

            <div>
                <a href={html_url} className='btn btn-dark btn-sm my-1'>More</a>
            </div>

        </div>
    )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
}

const userItemStyle = {
    width: '25%',
    margin: '2.5% 2.5%'
}

export default UserItem
