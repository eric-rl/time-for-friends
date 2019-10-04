import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Store } from '../utilities/Store';

const PrivateRoutes = props => {

    const { component: Component, isAuthenticated, redirectPath, ...rest } = props;
    const { state, dispatch } = React.useContext(Store);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // checkLoginStatus()
      });

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
