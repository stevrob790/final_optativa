import { Backdrop, Button, CircularProgress, Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { FilterBar } from './FilterBar'
import { TableFutbolista } from './TableFutbolista'
import AddIcon from '@mui/icons-material/Add';
import { Formulario } from './Formulario';
import { SharedSnackbar } from './SharedSnackbar';
import { deleteFutbolista, getFutbolistas } from '../Controllers/futbolistaController';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Models/User';

export const Dashboard = () => {
    let navigate = useNavigate()
    const {logOut, getUserId} = useContext(UserContext)
    const [modeForm, setModeForm] = useState('crear')
    const [openForm, setOpenForm] = useState(false)
    const [showBackdrop, setShowBackdrop] = useState(false)
    const [showSnackbar, MySnackbar] = SharedSnackbar()
    const [futbolistas, setFutbolistas] = useState([])
    const [dataFilter, setDataFilter] = useState([])
    const [dataActual, setDataActual] = useState(null)

    const handleLogOut = () => {
        logOut()
        navigate('/')
    }

    const openBackdrop = () => {
        setShowBackdrop(true)
    }

    const closeBackdrop = () => {
        setShowBackdrop(false)
    }

    const loadData = async () => {
        openBackdrop()
        const userId = getUserId()
        console.log('hola', userId)
        const data = await getFutbolistas(userId)
        if(data){
            setDataFilter(data)
            setFutbolistas(data)
        }else{
            showSnackbar('error', 'Error en la conexión')
            setDataFilter([])
        }
        closeBackdrop()
    }

    useEffect(() => {
        if(!getUserId()) navigate('/')
        async function init(){
            await loadData()
        }
        init()
    }, [])

    const handleOpenForm = (mode, dataActual = null) => {
        setModeForm(mode)
        setDataActual(dataActual)
        setOpenForm(true)
    }

    const handleCloseForm = () => {    
        setOpenForm(false)
    }

    const deleteControl = async (id) => {
        openBackdrop()
        const resp = await deleteFutbolista(id)
        if(resp)
            showSnackbar('success', 'Registro eliminado')
        else
            showSnackbar('error', 'Error al eliminar registro')
        closeBackdrop()
        await loadData()
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={7} item>
                    <FilterBar 
                        futbolistas={futbolistas}
                        setDataFilter={setDataFilter}
                    />
                </Grid>    
                <Grid xs={3} item>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenForm('crear')}
                    >
                        Ingresar Jugador
                    </Button>
                </Grid>
                <Grid xs={2} item>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<ExitToAppIcon />}
                        onClick={handleLogOut}
                    >
                        Salir
                    </Button>
                </Grid>
                <Grid xs={12} item>
                    <TableFutbolista 
                        data={dataFilter}
                        handleEdit={handleOpenForm}
                        deleteControl={deleteControl}
                    />
                </Grid>
            </Grid>
            <Formulario
                data={dataActual}
                open={openForm}
                close={handleCloseForm}
                mode={modeForm}
                openBackdrop={openBackdrop}
                closeBackdrop={closeBackdrop}
                showSnackbar={showSnackbar}
                refreshTable={loadData}
            />
            
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            {MySnackbar()}
        </>
    )
}

