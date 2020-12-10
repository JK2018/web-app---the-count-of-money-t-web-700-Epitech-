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

const Router = () => {
    
    const cookies = new Cookies();
    const [logged, setLogin] = useState(cookies.get("accessToken") ? true : false);

    function updateLoginState () {
        if (cookies.get("accessToken")) {
            setLogin(true);
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
                <Navbar logged={logged} logout={logout}></Navbar>
                <Route 
                    exact 
                    path='/' 
                    render={(props) => (
                        <Landing {...props} logged={logged} />
                    )}/>
                <section>
                    <Switch>
                        <ProtectedRoute logged={logged} exact path='/favorites' component={FavoritesList}/>
                        <ProtectedRoute logged={logged} exact path='/profile' component={Profile}/>
                        <ProtectedRoute logged={logged} exact path='/settings' component={Settings}/> 
                        <ProtectedRoute logged={logged} exact path='/profile' component={Profile}/> 
                        <Route exact path='/articles' component={Articles}/>
                        <Route exact path='/crypto/:id' component={CryptoDetail}/>
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
        </BrowserRouter>
    );
}
export default Router;