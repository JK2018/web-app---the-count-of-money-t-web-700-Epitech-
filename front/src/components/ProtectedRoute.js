import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({component: Component, logged: logged, ...rest}) => {
    return (
        <Route
            { ...rest}
            render={() => {
                if (logged) return <Component logged={logged}/>
                return <Redirect to="/"/>
            }}
        />
    )
}
export default ProtectedRoute;