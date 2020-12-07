import React, { useState, useEffect } from 'react';
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
    const [userId, setUser] = useState([]);
    const [inputErrors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        firstName: '',
        lastName: '',
        currency: ''
    });

    const { username, email, password, password_confirmation, firstName, lastName, currency } = formData;

    useEffect(() => {
        userApi.get().then((response) => {
            setUser(response.id);
            setFormData({
                ...formData,
                username: response.username,
                email: response.email,
                firstName: response.firstName,
                lastName: response.lastName,
                currency: response.currency
            })
        });
    }, [userId]);

    const onChangeRadio = (event) => {
        setFormData({...formData, currency: event.target.value});
    };

    const onChange = (e) => {

        var currentFormData = {...formData};
        currentFormData[e.target.name] = e.target.value;
        
        // Password validator
        if ((e.target.name === "password" || e.target.name === "password_confirmation")
            && e.target.value.trim().length > 0 
            && currentFormData["password_confirmation"] !== currentFormData["password"]
        ) {
            setErrors({
                ...inputErrors,
                password_confirmation: "Password and password confirmation must match"
            });
        } else {
            var currentErrors = {...inputErrors};
            delete currentErrors.password_confirmation;
            setErrors(currentErrors);
        }

        setFormData(currentFormData);
    }
    
    const onSubmit =  (e) => {
        e.preventDefault();

        // If still errors
        if (Object.keys(inputErrors).length > 0) return false;
        
        const user = {
            firstName,
            lastName,
            username,
            email,
            currency
        }
        if (password.length > 0 && password === password_confirmation) user["password"] = password;
        const request = JSON.stringify(user);

        userApi.update(userId, request);
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
                                name="firstName"
                                label="First name"
                                variant="outlined" 
                                value ={firstName} 
                                onChange={e => onChange(e)} 
                                required
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
                                required
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
                                required={formData["password_confirmation"].length > 0}
                                error={inputErrors.password && inputErrors.password.length !== 0 ? true : false }
                                helperText= {inputErrors.password}
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
                                required={formData["password"].length > 0}
                                error={inputErrors.password_confirmation && inputErrors.password_confirmation.length !== 0 ? true : false }
                                helperText= {inputErrors.password_confirmation}
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
