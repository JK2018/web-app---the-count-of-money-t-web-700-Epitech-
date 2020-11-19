import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Dashboard from "./Views/Dashboard/Dashboard";
import { useAuth } from "./Contexts/authContext";
import Login from "./Views/Login/Login";
import Profile from "./Views/Profile/Profile";
import Cryptos from "./Views/Cryptos/Cryptos";
import Articles from "./Views/Articles/Articles";


export const Router = () => {
    const theme = createMuiTheme();
    const { user } = useAuth();

    return (
        <MuiThemeProvider theme={theme}>
            <Switch>
                {user ? (
                    <Dashboard>
                        <Switch>
                            <Route exact path="/cryptos">
                                <Cryptos />
                            </Route>
                            <Route exact path="/articles">
                                <Articles />
                            </Route>
                            <Route exact path="/profile">
                                <Profile />
                            </Route>
                            <Route exact path="/">
                                <Profile />
                            </Route>
                        </Switch>
                    </Dashboard>
                ) : (
                        <Route path="/">
                            <Login />
                        </Route>
                    )}
            </Switch>
        </MuiThemeProvider>
    );
};
