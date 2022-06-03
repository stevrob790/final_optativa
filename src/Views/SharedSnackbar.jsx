import { Alert, Snackbar } from '@mui/material'
import React, { useState } from 'react'

export const SharedSnackbar = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarProps, setSnackbarProps] = useState({mensaje: '', tipo: 'success'})

    const showSnackbar = (tipo, mensaje) => {
        setSnackbarProps({mensaje, tipo})
        setOpenSnackbar(true)
    }

    const hideSnackbar = () => {
        setOpenSnackbar(false)
    }

    const MySnackbar = () => (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={hideSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
        >
            <Alert 
                onClose={hideSnackbar}
                severity={snackbarProps.tipo}
                variant="filled"          
            >
                {snackbarProps.mensaje}
            </Alert>
        </Snackbar>
    )

    return [showSnackbar, MySnackbar]
}
