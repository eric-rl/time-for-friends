import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Store } from '../utilities/Store'


const PrivateRoutes = props => {
    const { state } = React.useContext(Store);
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
