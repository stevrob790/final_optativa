import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

export const DeleteControl = ({open, handleClose, handleDelete}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Elimiar registro
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                ¿Deseas eliminar este registro?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleDelete} autoFocus>
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
