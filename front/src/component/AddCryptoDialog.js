import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AddCryptoDialog = (props) => {

    const [openDialog, setOpen] = useState(props.openDialog);

    const handleClose = () => {
        if (openDialog) {
            props.handler();
        }
        setOpen(false);
    };

    useEffect(() => {
        setOpen(props.openDialog);
    }, [props]);

    return (
        <div>
            <Dialog open={openDialog} onClose={() => handleClose()} aria-labelledby="form-dialog-title">
                <div className="add-crypto-dialog">
                    <DialogTitle>New crypto currency</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Symbol"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            label="Name"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            label="Logo image url"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose()} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => handleClose()} color="primary" variant="contained">
                            Add
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}
export default AddCryptoDialog;