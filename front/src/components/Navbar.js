import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

// Img
import logo from "../assets/img/coins.svg"; 

const Navbar = (props) => {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="logo"/>
                <h1>
                    <Link to="/">Count Of Money</Link>
                </h1>
            </div>
            <ul>
                { props.logged === false ? //for testing only
                    <Fragment>
                        <li><Link to="/articles">Articles</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </Fragment>
                :
                    <Fragment>
                        <li><Link to="/articles">Articles</Link></li>
                        <li className="step2"><Link to="/favorites">Favorites</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        {props.role === "admin" ? <li><Link to="/settings">Settings</Link></li> : ""}
                        <li className="step3"><a className="logout" onClick={props.logout}>Logout</a></li>
                    </Fragment>
                }
            </ul>
    </nav>
    )
}
export default Navbar;
