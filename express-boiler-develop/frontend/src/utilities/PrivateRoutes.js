import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Store } from '../utilities/Store';
import Loading from '../containers/Loading';

const PrivateRoutes = props => {

    const { component: Component, isAuthenticated, redirectPath, ...rest } = props;
    const { state, dispatch } = React.useContext(Store);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkLoginStatus()
    });

    const checkLoginStatus = async () => {
        let data = await fetch("/api/loggedinas");
        try {
            data = await data.json();
        } catch {
        }
        if (data.loggedIn && state.isLoggedIn === false) {
            dispatch({
                type: 'SET_LOGGEDIN',
            })
            dispatch({
                type: 'FETCH_CURRENT_USER',
                payload: data
            })
            setLoading(false)
        } else if (!data.loggedIn && state.isLoggedIn === true) {
            dispatch({
                type: 'LOGOUT_USER'
            })
            setLoading(false)
        } else if(data.loggedIn && state.isLoggedIn){
            setLoading(false)
        }
        setLoading(false)
    }

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                        loading ? (
                            <Loading />
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: redirectPath

                                    }}
                                />
                            )
                    )
            }
        />
    )
}

export default PrivateRoutes;
