import React from "react";
import { Switch, Route } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Dashboard from "./Views/Dashboard/Dashboard";
import { useAuth } from "./Contexts/authContext";
import Login from "./Views/Login/Login";

const useStyles = makeStyles({
    overlay: {
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
});

export const Router = () => {
    const theme = createMuiTheme();
    const style = useStyles();
    const { user } = useAuth();

    return (
        <MuiThemeProvider theme={theme}>
            <Switch>
                {user ? (
                    <>
                        <Route exact path="/">
                            <Dashboard />
                        </Route>
                        <Route exact path="/profile">
                        </Route>
                    </>
                ) : (
                        <Route path="/">
                            <Login />
                        </Route>
                    )}
            </Switch>
        </MuiThemeProvider>
    );
};
