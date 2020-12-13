import { Fragment, useState } from 'react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import FavoritesList from './components/FavoritesList';
import CryptoDetail from './components/CryptoDetail';
import Settings from './components/Settings';
import Profile from './components/Profile';
import Articles from './components/Articles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';
import ProtectedRoute from "./components/ProtectedRoute";
import './assets/css/main.css';

// API
import userApi from "./api/user";
import LoginCallback from './components/LoginCallback';

const Router = () => {
    
    const cookies = new Cookies();
    const [logged, setLogin] = useState(cookies.get("accessToken") ? true : false);
    const [role, setRole] = useState("");
    const [defaultCurrency, setDefaultCurrency] = useState("eur");

    function updateLoginState () {
        if (cookies.get("accessToken")) {
            setLogin(true);
            userApi.get().then((response) => {
                console.log(response);
                // Get user role
                setRole(response.role);
                // Get default currency
                setDefaultCurrency(response.currency);
            });
        } else {
            setLogin(false);
        }
    }

    function logout () {
        cookies.remove("accessToken");
        setLogin(false);
    }
    
    return (
        <BrowserRouter>
            <Fragment>
                <Navbar logged={logged} role={role} logout={logout}></Navbar>
                <Route 
                    exact 
                    path='/' 
                    render={(props) => (
                        <Landing {...props} logged={logged} defaultCurrency={defaultCurrency}/>
                    )}/>
                <section>
                    <Switch>
                        <ProtectedRoute logged={logged} defaultCurrency={defaultCurrency} exact path='/favorites' component={FavoritesList}/>
                        <ProtectedRoute logged={logged} setDefaultCurrency={setDefaultCurrency} exact path='/profile' component={Profile}/> 
                        <ProtectedRoute logged={logged} exact path='/settings' component={Settings}/> 
                        <Route 
                            exact 
                            path='/crypto/:id' 
                            render={(props) => (
                                    <CryptoDetail {...props} logged={logged} defaultCurrency={defaultCurrency}/>
                            )}
                        />
                        <Route 
                            exact 
                            path='/articles' 
                            render={(props) => (
                                    <Articles {...props} logged={logged}/>
                            )} />
                        <Route 
                            exact 
                            path='/login' 
                            render={(props) => (
                                <Login {...props} updateLoginState={updateLoginState} />
                            )}
                        />
                        <Route 
                            exact 
                            path='/register' 
                            render={(props) => (
                                <Register {...props} updateLoginState={updateLoginState} />
                            )}
                        />
                    </Switch>
                </section>
            </Fragment>
            <Route 
                exact 
                path='/oauth-callback/:provider'
                render={(props) => (
                    <LoginCallback {...props} updateLoginState={updateLoginState} />
                )}
            />
        </BrowserRouter>
    );
}
export default Router;