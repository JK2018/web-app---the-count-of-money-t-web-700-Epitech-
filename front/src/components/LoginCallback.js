import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import "../assets/css/login.css";

// Img
import waiting from "../assets/img/waiting.svg"; 

// API
import userApi from "../api/user";

export const LoginCallback = (props) => {

    useEffect(() => {
   
        const code = (props.location.search.match(/code=([^&]+)/) || [])[1];
        const provider = props.match.params.provider;

        if (code && code.length > 0 && provider && provider.length > 0) {
            userApi.oAuthCallback(provider, code)
                .then((response) => {
                    props.updateLoginState();
                    props.history.push('/profile');
                })
                .catch(() => {
                    document.location.href = "/";
                });
        }
    }, []);

    return (
        <Grid container>
            <Grid item className="loading" lg={4} md={6} sm={6} xs={10}>
                <img src={waiting} />
                <span>Connection in progress ...</span>
            </Grid>
        </Grid>
    )
};

export default LoginCallback;