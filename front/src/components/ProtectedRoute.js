import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
    component: Component, 
    logged: logged, 
    defaultCurrency: defaultCurrency, 
    setDefaultCurrency: setDefaultCurrency, 
    ...rest}
) => {
    return (
        <Route
            { ...rest}
            render={() => {
                if (logged && defaultCurrency) return <Component logged={logged} defaultCurrency={defaultCurrency}/>
                if (logged && setDefaultCurrency) return <Component logged={logged} setDefaultCurrency={setDefaultCurrency}/>
                if (logged) return <Component logged={logged}/>
                return <Redirect to="/"/>
            }}
        />
    )
}
export default ProtectedRoute;