import { Fragment } from 'react';
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
import './assets/css/main.css';

const Router = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Navbar></Navbar>
                <Route exact path='/' component={Landing}></Route>
                <section>
                    <Switch>
                        <Route exact path='/articles' component={Articles}></Route>
                        <Route exact path='/favorites' component={FavoritesList}></Route>
                        <Route exact path='/profile' component={Profile}></Route>
                        <Route exact path='/login' component={Login}></Route>
                        <Route exact path='/register' component={Register}></Route>
                        <Route exact path='/crypto/:id' component={CryptoDetail}></Route>
                        <Route exact path='/settings' component={Settings}></Route> 
                        <Route exact path='/profile' component={Profile}></Route> 
                    </Switch>
                </section>
            </Fragment>
        </BrowserRouter>
    );
}
export default Router;