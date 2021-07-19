import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Auth from '../services/auth/auth'

export default ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            if (Auth.isAuthenticated()) {
                return <Component {...props} />
            } else {
                return <Redirect to={
                    {
                        pathname: '/login',
                        state: {
                            from: props.location
                        }
                    }
                }
                />
            }
        }} />
    )
}