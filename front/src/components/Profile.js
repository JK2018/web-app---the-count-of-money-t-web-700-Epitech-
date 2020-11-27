import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import "../assets/css/profile.css";
import Cookies from 'universal-cookie';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles';

// API
import userApi from "../api/user";

export const Profile = () => {

    // DESC :  selectable currencies
    const [currencies] = useState([
        { label: "EUR", value: "eur" },
        { label: "USD", value: "usd" },
        { label: "GBP", value: "gbp" },
        { label: "CAD", value: "cad" },
        { label: "CHF", value: "chf" },
        { label: "JPY", value: "jpy" }
    ]);

    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
      }));

    const classes = useStyles();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const cookies = new Cookies();
    const [c, setC] = useState(cookies.get('currency') ? cookies.get('currency') : "usd");
    const [currencyValue, setCurrencyValue] = useState(c);

    const { username, email, password, password_confirmation } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password_confirmation) {
            console.log('PW DO NOT MATCH');
        } else {
            const newUser = {
                username,
                email,
                password
            }
            try {
                const body = JSON.stringify(newUser);
                userApi.create(body).then((response) => {
                    console.log(response.data);
                })
            } catch (error) {
                console.error(error.response.data);
            }
        }
    }

     // ACTION : when user selects currency via select menu
    // DESC : action when user selects another currency
    const onSelectChange = (e) => {
        setCurrencyValue(e.currentTarget.value);
        console.log("dd : "+ e.currentTarget.value);
        cookies.set('currency', e.currentTarget.value, { path: '/' });
    }

    return (
        <Grid container>
            <Grid item className="login-form" lg={4} md={6} sm={6} xs={10}>
                <h1 className="lead">Profile</h1>
                <p className="introduction">
                    Feel free to change your personnal info here. <br/>
                    Changes will be made uppon form validation.
                </p>
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
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Currency</InputLabel>
                                <Select
                                value={currencyValue}
                                onChange={e => onSelectChange(e)}
                                >
                                {currencies.map(({ label, value }) => (
                                    <MenuItem key={value} value={value}>{label}</MenuItem>   
                                ))}
                                </Select>
                            </FormControl>
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
export default Profile;
