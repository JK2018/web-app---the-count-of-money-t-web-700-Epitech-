import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// API
import cryptoApi from "../api/crypto";

const AddCryptoDialog = (props) => {

    const [openDialog, setOpen] = useState(props.openDialog);
    const [inputErrors, setErrors] = useState({});
    const [inputs, setInputs] = useState({
        symbol: "",
        name: "",
        url: ""
    })

    function handleClose() {
        if (openDialog) {
            props.handler();
        }
        setOpen(false);
        setErrors({});
        setInputs({
            symbol: "",
            name: "",
            url: ""
        });
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
            props.setCryptos([...props.cryptos, {
                id: crypto.id,
                symbol: crypto.cmid,
                name: crypto.fullName,
                logoUrl: crypto.imgUrl,
                default: crypto.default
            }]);
            handleClose();
        })
        .catch(error => {
            setErrors({
                ...inputErrors,
                symbol: error.response.data.message
            });
        });
    }

    function submitForm(event) {
        event.preventDefault();

        // Validaiton for input values from form
        var errors = {...inputErrors};
        Object.keys(inputs).map((key) => {
            errors[key] = "";
            if (!inputs[key] || inputs[key].length === 0 || inputs[key].trim().length === 0) {
                errors[key] = "Invalid input";
                return false;
            }
            return true;
        })
        setErrors(errors);

        if (!Object.keys(errors).find(key => errors[key] !== "")) {
            addCryptos(inputs.symbol, inputs.name, inputs.url);
        }
    }

    function handleChange(event) {
        var name = event.target.name;
        var inputsRef = {...inputs};
        inputsRef[name] = event.target.value;
        setInputs(inputsRef);
    }

    useEffect(() => {
        setOpen(props.openDialog);
    }, [props]);

    return (
        <div>
            <Dialog open={openDialog} onClose={() => handleClose()} aria-labelledby="form-dialog-title">
                <form className="add-crypto-dialog" onSubmit={submitForm}>
                    <DialogTitle>New crypto currency</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            name="name"
                            margin="dense"
                            label="Name"
                            type="text"
                            fullWidth
                            value={inputs.name.value} 
                            onChange={handleChange}
                            error={inputErrors.name && inputErrors.name.length !== 0 ? true : false }
                            helperText= {inputErrors.name}
                        />
                        <TextField
                            name="symbol"
                            margin="dense"
                            label="Symbol"
                            type="text"
                            fullWidth
                            value={inputs.symbol.value} 
                            onChange={handleChange}
                            error={inputErrors.symbol && inputErrors.symbol.length !== 0 ? true : false }
                            helperText= {inputErrors.symbol}
                        />
                        <TextField
                            name="url"
                            margin="dense"
                            label="Logo image url"
                            type="text"
                            fullWidth
                            value={inputs.url.value} 
                            onChange={handleChange}
                            error={inputErrors.url && inputErrors.url.length !== 0 ? true : false }
                            helperText= {inputErrors.url}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose()} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" variant="contained">
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
export default AddCryptoDialog;