import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DeleteControl } from './DeleteControl';

//Estilos para las cabezas de la tabal
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
//Estilos para cada registro
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const TableFutbolista = ({data = [], handleEdit, deleteControl}) => {
    const [rows, setRows] = useState([])

    useEffect(() => {
        console.log(data)
        setRows(Array.from(data, (e, index) => {
            return {
                index: index + 1,
                nombre: e.nombre,
                apellido: e.apellido,
                goles: e.goles,
                asistencias: e.asistencias,
                dorsal: e.dorsal,
                posicion: e.posicion,
                id: e.id
            }
        }))
    }, [data])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">#</StyledTableCell>
                        <StyledTableCell align="center">Opciones</StyledTableCell>
                        <StyledTableCell align="center">Nombre</StyledTableCell>
                        <StyledTableCell align="center">Dorsal</StyledTableCell>
                        <StyledTableCell align="center">Goles</StyledTableCell>
                        <StyledTableCell align="center">Asistencia</StyledTableCell>
                        <StyledTableCell align="center">Posición</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { rows.map(row => (
                        <ListItem
                            key={row.index}
                            deleteControl={deleteControl}
                            row={row}
                            handleEdit={handleEdit}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const ListItem = ({row, handleEdit, deleteControl}) => {
    const [openDeleteControl, setOpenDeleteControl] = useState(false)
    const [playerToDelete, setPlayerToDelete] = useState(null)

    const handleOpenDeleteControl = (data) => {
        setOpenDeleteControl(true)
        setPlayerToDelete(data)
    }
    const closeDeleteControl = () => {
        setOpenDeleteControl(false)
        setPlayerToDelete(null)
    }

    const handleDelete = async () => {
        await deleteControl(playerToDelete)
        closeDeleteControl()
    }

    return (
        <>
        <StyledTableRow key={row.index}>
            <StyledTableCell component="th" scope="row" align="center">
                <Tooltip title="Editar Jugador" onClick={() => handleEdit('editar', row)}>
                    <IconButton color='secondary'>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Eliminar Jugador' onClick={() => handleOpenDeleteControl(row.id)}>
                    <IconButton color='error'>
                        <DeleteIcon />
                    </IconButton>   
                </Tooltip>
            </StyledTableCell>
            <StyledTableCell align="center">{row.index}</StyledTableCell>
            <StyledTableCell align="center" component="th" scope="row">
                {`${row.nombre} ${row.apellido}`}
            </StyledTableCell>
            <StyledTableCell align="center">{row.dorsal}</StyledTableCell>
            <StyledTableCell align="center">{row.goles}</StyledTableCell>
            <StyledTableCell align="center">{row.asistencias}</StyledTableCell>
            <StyledTableCell align="center">
                <div style={{
                    background: getColorPosition(row.posicion),
                    borderRadius: 15,
                    color: 'white'
                }}>
                    {row.posicion}
                </div>
            </StyledTableCell>
        </StyledTableRow>
        <DeleteControl
            open={openDeleteControl}
            handleClose={closeDeleteControl}
            handleDelete={handleDelete}
        />
        </>
    )
}

const getColorPosition = (pos) => {
    switch(pos){
        case 'PT': return 'orange'
        case 'DEF': return 'red'
        case 'MED': return 'green'
        case 'DEL': return 'blue'
    }
}