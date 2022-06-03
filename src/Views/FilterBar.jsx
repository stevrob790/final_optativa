import { InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';

export const FilterBar = ({futbolistas, setDataFilter}) => {
    const [criterio, setCriterio] = useState('') 

    useEffect(() => {
        filterMediator(criterio, setDataFilter, futbolistas)
    }, [criterio])

    return (
        <TextField
            id="input-with-icon-adornment"
            variant='outlined'
            fullWidth
            size='small'
            placeholder='Buscar...'
            onChange={(e) => setCriterio(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />   
    )
}

const filterMediator = (criterio, setDataFilter, futbolistas = []) => {
    setDataFilter(futbolistas.filter(player => {
        return (
            player.nombre.toLowerCase().indexOf(criterio) > -1 ||
            player.apellido.toLowerCase().indexOf(criterio) > -1 ||
            String(player.dorsal).toLowerCase().indexOf(criterio) > -1 ||
            String(player.goles).toLowerCase().indexOf(criterio) > -1 ||
            String(player.asistencias).toLowerCase().indexOf(criterio) > -1 || 
            player.posicion.toLowerCase().indexOf(criterio) > -1 
        )
    }))
}