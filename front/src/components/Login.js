import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Alert from '@material-ui/lab/Alert';
import "../assets/css/login.css";

// API
import userApi from "../api/user";
import urlApi from "../api/config";

export const Login = (props) => {

    const [logMatch, setLogMatch] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const history = useHistory();
    const onSubmit =  (e) => {
        e.preventDefault();
        const credentials = JSON.stringify({email, password});
        userApi.signin(credentials)
            .then((response) => {
                props.updateLoginState();
                history.push('/profile');
            })
            .catch((response) => {
                setLogMatch(false);
            });
    }

    return (
        <Grid container>
            <Grid item className="login-form" lg={4} md={6} sm={6} xs={10}>
                <h1 className="lead">Log in into your account</h1>
                <p className="introduction">
                    With a user account, follow live your favorite crypto-currencies.<br/>
                    Not registered yet? <Link to="/register">Create an account.</Link>
                </p>
                <form onSubmit={e => onSubmit(e)}>
                    { (!logMatch) &&
                        <Alert severity="error" className="alert">The email or password you’ve entered doesn’t match any account.</Alert>
                    }
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField 
                                className="input"
                                type="email" 
                                name="email" 
                                label="Email Address" 
                                variant="outlined" 
                                value={email} 
                                onChange={e => onChange(e)} 
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="input"
                                type="password" 
                                name="password" 
                                label="Password" 
                                variant="outlined" 
                                value={password} 
                                onChange={e => onChange(e)} 
                                minLength="6" 
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button className="submit-btn" type="submit" color="primary" variant="contained" size="large" fullWidth>
                                Log in
                            </Button>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} className="oauth-button">
                                <Button color="default" variant="contained" size="large" fullWidth href={urlApi+"/api/users/auth/discord"}>
                                    Discord
                                </Button>
                            </Grid>
                            <Grid item xs={6} className="oauth-button">
                                <Button color="default" variant="contained" size="large" fullWidth href={urlApi+"/api/users/auth/facebook"}>
                                    Facebook
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    )
}
export default Login;
