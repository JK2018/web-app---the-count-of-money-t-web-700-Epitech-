import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
    
    const onSubmit = async e => {
        e.preventDefault();
          // ADD LOGIC HERE
    }
    


    return (
        


        <section className="landing">
            <br></br><br></br><br></br><br></br><br></br>
            <div className="mainCompDiv">
           

            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="email" value={email} onChange={e => onChange(e)} placeholder="Email Address" name="email" required/>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={password} onChange={e => onChange(e)}
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        required
                    />
                </div>
                
                <input type="submit" className="btn btn-primary" value="Log in" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
            </div>
        </section>
    )
}
export default Login;
