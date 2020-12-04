import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import { useHistory } from "react-router-dom";

const Menu = () => {
    
    let history = useHistory();
    
    const profile = () => history.push("/profile");
    const cryptos = () => history.push("/cryptos");
    const articles = () => history.push("/articles");

    return (
        <div>
            <ListItem button onClick={profile}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={profile}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button onClick={articles}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Articles" />
            </ListItem>
            <ListItem button onClick={cryptos}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Cryptos" />
            </ListItem>
        </div>
    )
};

export default Menu;