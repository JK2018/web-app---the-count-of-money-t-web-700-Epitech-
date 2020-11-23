
import { Fragment } from 'react';
import Navbar from './component/Navbar';
import Landing from './component/Landing';
import Login from './component/Login';
import Register from './component/Register';
import Profile from './component/Profile';
import FavoritesList from './component/FavoritesList';
import CryptoDetail from './component/CryptoDetail';
import Settings from './component/Settings';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';


const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar></Navbar>
        <Route exact path='/' component={Landing}></Route>
        <section>
          <Switch>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='/favorites' component={FavoritesList}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/crypto/:id' component={CryptoDetail}></Route>
            <Route exact path='/settings' component={Settings}></Route>
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
