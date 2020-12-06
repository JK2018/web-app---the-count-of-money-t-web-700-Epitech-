import React, { useState } from 'react';
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

export const Profile = () => {

    // DESC :  selectable currencies
    const [formData, setFormData] = useState({
        username: 'John',
        email: 'john.doe@gmail.com',
        password: '',
        password_confirmation: ''
    });

    const { username, email, password, password_confirmation } = formData;

    const [defaultCurrency, setCurrency] = useState("usd");

    const onChangeRadio = (event) => {
        setCurrency(event.target.value);
    };

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password === password_confirmation) {
            const newUser = {
                username,
                email,
                password
            }
            try {
                const body = JSON.stringify(newUser);
                userApi.create(body).then((response) => {
                    console.log(response.data);
                    console.log(response.data.length);
                    console.log(response.status);
                    if (response.data.length > 0 && response.status === 201) {
                        var credentials = {'email': email, 'password': password};
                        userApi.signin(credentials).then((response2) => {
                            console.log(response2);
                        })
                    }
                })
            } catch (error) {
                console.error(error.response.data);
            }
        }
    }

    return (
        <Grid container>
            <Grid item className="login-form" lg={4} md={6} sm={6} xs={10}>
                <h1 className="lead">Edit your profile</h1>
                <form onSubmit={e => onSubmit(e)}>
                    <Grid container>
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
                            <RadioGroup aria-label="default currency" name="currency" className="currency-radio" value={defaultCurrency} onChange={onChangeRadio}>
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
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    )
}
export default Profile;
