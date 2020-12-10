import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import "../assets/css/login.css";

// API
import userApi from "../api/user";

export const Register = (props) => {
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        firstName: '',
        lastName: '',
        currency: ''
    });

    const { username, email, password, password_confirmation, firstName, lastName } = formData;

    const [currency, setCurrency] = useState("usd");

    const onChangeRadio = (event) => {
        setCurrency(event.target.value);
    };

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const history = useHistory();
    const onSubmit =  (e) => {
        e.preventDefault();
        if (password === password_confirmation) {
            const newUser = {
                username,
                email,
                password,
                firstName,
                lastName,
                currency
            }
            const body = JSON.stringify(newUser);
            userApi.create(body)
                .then((response) => {
                    props.updateLoginState();
                    history.push('/profile');
                });
        }
    }

    return (
        <Grid container>
            <Grid item className="login-form" lg={4} md={6} sm={6} xs={10}>
                <h1 className="lead">Create new account</h1>
                <p className="introduction">
                    With a user account, save and follow live your favorite crypto-currencies.
                    Already have an account? <Link to="/login">Sign in.</Link>
                </p>
                <form onSubmit={e => onSubmit(e)}>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField 
                                className="input"
                                type="text" 
                                name="firstName"
                                label="First name"
                                variant="outlined" 
                                value ={firstName} 
                                onChange={e => onChange(e)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                className="input"
                                type="text" 
                                name="lastName"
                                label="Last name"
                                variant="outlined" 
                                value ={lastName} 
                                onChange={e => onChange(e)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                className="input"
                                type="text" 
                                name="username"
                                label="Username"
                                variant="outlined" 
                                value ={username} 
                                onChange={e => onChange(e)} 
                                required
                                fullWidth
                            />
                        </Grid>
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
                                minLength="6"
                                onChange={e => onChange(e)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="input"
                                type="password"
                                name="password_confirmation"
                                label="Confirm Password"
                                variant="outlined" 
                                value={password_confirmation}
                                minLength="6"
                                onChange={e => onChange(e)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} className="currency">
                            <FormLabel component="legend">Default currency</FormLabel>
                            <RadioGroup aria-label="default currency" name="currency" className="currency-radio" value={currency} onChange={onChangeRadio}>
                                <FormControlLabel value="usd" control={<Radio/>} label="USD"/>
                                <FormControlLabel value="eur" control={<Radio/>} label="EUR"/>
                                <FormControlLabel value="gbp" control={<Radio/>} label="GPB"/>
                                <FormControlLabel value="cad" control={<Radio/>} label="CAD"/>
                                <FormControlLabel value="chf" control={<Radio/>} label="CHF"/>
                                <FormControlLabel value="jpy" control={<Radio/>} label="JPY"/>
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <Button className="submit-btn" type="submit" color="primary" variant="contained" size="large" fullWidth>
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    )
}
export default Register;
