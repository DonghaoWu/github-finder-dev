import React from 'react'
import PropTypes from 'prop-types'

const Alert = ({ msg, type }) => {
    return (
        msg && (
            <div className={`alert alert-${type}`}>
                <i className='fas fa-info-circle' />{msg}

            </div>
        )
    )
}

Alert.propTypes = {
    msg: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}

export default Alert
