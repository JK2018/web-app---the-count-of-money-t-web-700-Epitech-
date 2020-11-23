import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Profile = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    const { username, email, password, password2} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
    
    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
            console.log('PW DO NOT MATCH');
        } else {
            const newUser = {
                username,
                email,
                password
            }
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const body = JSON.stringify(newUser);
                const res = await axios.post('/api/users', body, config);
                console.log(res.data);
            } catch (error) {
                console.error(error.response.data);
            }
        }
    }


    return (
        


        <section className="landing">
            <br></br><br></br><br></br><br></br><br></br>
            <div className="mainCompDiv">
           

            <h1 className="large text-primary">Profile</h1>
            <p className="lead"><i className="fas fa-user"></i> Edit Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input type="text" value={username} onChange={e => onChange(e)} placeholder="Username" name="username" required />
                </div>
                <div className="form-group">
                <input type="email" value={email} onChange={e => onChange(e)} placeholder="Email Address" name="email" required/>
                {/* <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                > */}
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
                <div className="form-group">
                <input
                    type="password"
                    value={password2} onChange={e => onChange(e)}
                    placeholder="Confirm Password"
                    name="password2"
                    minLength="6"
                    required
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Update" />
            </form>
           
            </div>
        </section>
    )
}
export default Profile;
