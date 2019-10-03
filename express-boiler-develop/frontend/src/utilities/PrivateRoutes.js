import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoutes = props => {
    const { component: Component, isAuthenticated, redirectPath, ...rest } = props;

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: redirectPath

                            }}
                        />
                    )
            }
        />
    )
}

export default PrivateRoutes;
