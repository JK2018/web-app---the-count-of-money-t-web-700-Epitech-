import React, {useState, useEffect} from 'react'
import { 
    Button, 
    IconButton, 
    ListItem, 
    ListItemText, 
    ListItemAvatar, 
    ListItemSecondaryAction, 
    TextField, 
    FormGroup, 
    Tooltip 
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import List from '@material-ui/core/List';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CheckIcon from '@material-ui/icons/Check';
import AddCryptoDialog from './AddCryptoDialog';
import "../assets/css/settings.css";

// API
import cryptoApi from "../api/crypto";

const Settings = () => {

    const [count, setCount] = useState(0);
    const [rssFeeds, setFeeds] = useState([]);
    const [cryptos, setCryptos] = useState([]);
    const [inputErrors, setErrors] = useState([]);
    const [openDialog, setOpen] = useState(false);

    useEffect(() => {
        loadCryptoList();

    }, [count]);

    function loadCryptoList() {
        cryptoApi.getAll().then((response) => {
            var cryptosFresh = [];
            if (response.data && response.data.length > 0) {
                response.data.forEach(crypto => {
                    cryptosFresh.push({
                        id: crypto.id,
                        symbol: crypto.cmid,
                        name: crypto.fullName,
                        logoUrl: crypto.imgUrl,
                        default: crypto.default
                    });
                });
                setCryptos(cryptosFresh.sort((a, b) => a.id - b.id));
            }
        });
    };

    function addFeed() {
        var rssInput = document.getElementById('rss-input');
        
        if (!rssInput.value || rssInput.value.length === 0 || rssInput.value.trim().length === 0) {
            var errors = [...inputErrors];
            errors["rss"] = "Invalid input";
            setErrors(errors);
            return false;
        }

        var rssFeedsRef = [...rssFeeds];
        rssFeedsRef.push({id: rssFeeds.length, value: rssInput.value, active: true});
        setFeeds(rssFeedsRef);
        
        rssInput.value = "";

        return true;
    }

    function disableFeed(feedId) {
        var freshRssFeed = rssFeeds.map(item => {
            if(item.id === feedId) {
                item.active = !item.active;
            }
            return item;
        });
        setFeeds(freshRssFeed);
    }

    function addCryptos(symbol, name, logoUrl) {
        cryptoApi.create({
            cmid: symbol,
            fullName: name,
            imgUrl: logoUrl,
            default: true
        })
        .then(response => {
            var crypto = response.data;
            setCryptos([...cryptos, {
                id: crypto.id,
                symbol: crypto.cmid,
                name: crypto.fullName,
                logoUrl: crypto.imgUrl,
                default: crypto.default
            }]);
        });
    }

    function removeCrypto(symbol) {
        var idRemove;
        var newCryptos = [];
        var cryptosRef = [...cryptos];
        cryptosRef.forEach(crypto => {
            idRemove = crypto.id;
            if (crypto.symbol !== symbol) {
                newCryptos.push(crypto);
            }
        });
        setCryptos(newCryptos);
        cryptoApi.deleteOne(idRemove);
    }

    function setVisibleCrypto(cryptoId) {
        var newVisibility = false;
        var freshCryptos = cryptos.map((crypto) => {
            if (crypto.id === cryptoId) {
                newVisibility = !crypto.default;
                crypto.default = newVisibility;
            }
            return crypto;
        })
        cryptoApi.update(cryptoId, {default: newVisibility})
            .then(() => {
                setCryptos(freshCryptos);
            });
    }

    function handleKeyPress(e, input) {
        if (e.key === "Enter") {
            if (input === "feed") {
                addFeed();
            }
        }
    }

    function handleClickDialog() {
        setOpen(!openDialog);
    };

    return (
        <div className="admin-settings">
            <h1>RSS Feeds</h1>
            <FormGroup className="inline-form">
                <TextField                    
                    className="inline-input"
                    id="rss-input"
                    label="Add RSS Feed URL"
                    error={inputErrors.rss && inputErrors.rss.length !== 0 ? true : false }
                    helperText= {inputErrors.rss}
                    onKeyPress={(e) => handleKeyPress(e, "feed")}
                />
                <IconButton 
                    className="inline-button" 
                    color="primary" 
                    aria-label="add" 
                    onClick={addFeed}
                >
                    <AddCircleIcon/>
                </IconButton>
            </FormGroup>
            <List className="list">
                {rssFeeds.map((feed) =>
                    React.cloneElement(
                        <ListItem>
                            <ListItemText primary={feed.value}/>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => disableFeed(feed.id)} className={feed.active ? "active" : ""} >
                                    <CheckIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>,
                        {key: feed.id}
                    )
                )}
            </List>
            <h1>Crypto currencies</h1>
            <Button variant="outlined" color="primary" onClick={handleClickDialog}>
                Add crypto currency
            </Button>
            <AddCryptoDialog openDialog={openDialog} handler={handleClickDialog} addCryptos={addCryptos}/>
            <List className="list">
                {cryptos.map((item) =>
                    React.cloneElement(
                        <ListItem>
                            <ListItemAvatar className="crypto-logo">
                                <img src={item.logoUrl} alt={item.symbol} />
                            </ListItemAvatar>
                            <ListItemText className="crypto-info" primary={item.name} secondary={item.symbol}/>
                            <ListItemSecondaryAction>
                                <Tooltip title={item.default ? "Hide to public" : "Show to public"}>
                                    <IconButton edge="end" aria-label="visible" className="visible-btn" onClick={() => setVisibleCrypto(item.id)}>
                                        {item.default ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton edge="end" aria-label="delete" onClick={() => removeCrypto(item.symbol)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Tooltip>
                            </ListItemSecondaryAction>
                        </ListItem>,
                        {key: item.symbol}
                    )
                )}
            </List>
        </div>
    );
}
export default Settings;