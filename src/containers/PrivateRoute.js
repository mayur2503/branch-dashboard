import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
function PrivateRoute({ component: Component, ...rest }) {
    const user = useSelector( state => state.user);
    return (
        <Route {...rest} render={props => {
            if (!user.loggedIn) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
            return <Component {...props} />
            // logged in so return component
            
        }} />
    );
}

export default PrivateRoute