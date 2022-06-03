import React, { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogContent, Grid, Slide, TextField, DialogTitle, MenuItem } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from "yup";
import { useFormik } from "formik";
import { createFutbolista, updateFutbolista } from '../Controllers/futbolistaController.js';
import {useContext} from 'react'
import { UserContext } from '../Models/User'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Formulario = ({open, close, mode, openBackdrop, closeBackdrop, showSnackbar, refreshTable, data}) => {
  const { getUserId } = useContext(UserContext)
  const [title, setTitle] = useState('')

  const closeForm = () => {
    formik.handleReset();
    close()
  }

  useEffect(() => {
    function init(){
      formik.handleReset();
      if (mode === "crear"){
          formik.handleReset();
          setTitle(`Registrar nuevo futbolista`);
      }else if (mode === "editar"){
          setTitle(`Actualizar futbolista`);
          formik.setFieldValue("nombre", data.nombre);
          formik.setFieldValue("apellido", data.apellido);
          formik.setFieldValue("dorsal", data.dorsal); 
          formik.setFieldValue("goles", data.goles); 
          formik.setFieldValue("asistencias", data.asistencias); 
          formik.setFieldValue("posicion", data.posicion);          
      }
  }
  init();
  }, [open])

  const onSubmit = async (values) => {
    openBackdrop()
    let response = false
    if(mode == 'crear'){
      values.userId = getUserId()
      response = await createFutbolista(values)
    }else{
      values.id = data.id
      values.userId = getUserId()
      response = await updateFutbolista(values)
    }
    console.log(3)
    if(response){
      showSnackbar('success', `Jugador ${mode == 'crear' ? 'creado' : 'editado'} con éxito`)
      closeForm()
      refreshTable()
    }
    else showSnackbar('error', 'Error, recuerde que no pueden existir dos jugadores con el mismo dorsal')
    closeBackdrop()    
  }

  const formik = useFormik({
    initialValues:{
      nombre: '', 
      apellido: '', 
      dorsal: 0, 
      goles: 0, 
      asistencias: 0, 
      posicion: ''
    },
    validationSchema: yup.object().shape({
        nombre: yup.string().required("Debes llenar este campo"),
        apellido: yup.string().required("Debes llenar este campo"),
        dorsal: yup.string().required("Debes llenar este campo"),
        goles: yup.string().required("Debes llenar este campo"),
        asistencias: yup.string().required("Debes llenar este campo"),
        posicion: yup.string().required("Debes llenar este campo"),
    }),
    onSubmit
  });

  const { handleSubmit, isSubmitting, touched, errors, getFieldProps } = formik;
  const nombreProps = getFieldProps("nombre");
  const apellidoProps = getFieldProps("apellido");
  const dorsalProps = getFieldProps("dorsal");
  const golesProps = getFieldProps("goles");
  const asistenciasProps = getFieldProps("asistencias");
  const posicionProps = getFieldProps("posicion");
    
  const formFields = () => (
    <Box p={1}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined" 
                    name="nombre" 
                    label="Nombre"
                    fullWidth
                    required
                    helperText={touched.nombre ? errors.nombre : ""}
                    error={touched.nombre && Boolean(errors.nombre)}
                    {...nombreProps}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined" 
                    name="apellido" 
                    label="Apellido"
                    fullWidth
                    required
                    helperText={touched.apellido ? errors.apellido : ""}
                    error={touched.apellido && Boolean(errors.apellido)}
                    {...apellidoProps}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    variant="outlined" 
                    name="dorsal" 
                    type='number'
                    label="Número del dorsal"
                    fullWidth
                    disabled={mode == 'editar'}
                    required
                    helperText={touched.dorsal ? errors.dorsal : ""}
                    error={touched.dorsal && Boolean(errors.dorsal)}
                    {...dorsalProps}
                />
            </Grid>   
            <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined" 
                    name="goles" 
                    type='number'
                    label="Goles"
                    fullWidth
                    required
                    helperText={touched.goles ? errors.goles : ""}
                    error={touched.goles && Boolean(errors.goles)}
                    {...golesProps}
                />
            </Grid>  
            <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined" 
                    name="asistencias" 
                    type='number'
                    label="Asistencias"
                    fullWidth
                    required
                    helperText={touched.asistencias ? errors.asistencias : ""}
                    error={touched.asistencias && Boolean(errors.asistencias)}
                    {...asistenciasProps}
                />
            </Grid>    
            <Grid item xs={12} sm={12}>
                <TextField
                    select
                    variant="outlined" 
                    name="posicion" 
                    label="Posición"
                    fullWidth
                    required
                    helperText={touched.posicion ? errors.posicion : ""}
                    error={touched.posicion && Boolean(errors.posicion)}
                    {...posicionProps}
                >   
                  <MenuItem key='PT' value='PT'>
                      Portero
                  </MenuItem>
                  <MenuItem key='DEF' value='DEF'>
                      Defensa
                  </MenuItem>
                  <MenuItem key='MED' value='MED'>
                      Mediocampista
                  </MenuItem>
                  <MenuItem key='DEL' value='DEL'>
                      Delantero
                  </MenuItem>
                </TextField>
            </Grid>  
        </Grid>    
    </Box>  
  )

  return (
    <Dialog
      open={open} 
      aria-labelledby="form-dialog-title"
      TransitionComponent={Transition}
    >
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit} autoComplete="off">
        {formFields()}
        <DialogContent>
            <Box p={1}>
              <Grid container spacing={2}>
                <Grid item xs={6}> 
                  <Button 
                    fullWidth
                    onClick={closeForm}
                    color="error" 
                    variant='contained'
                    disabled={isSubmitting}
                    startIcon={<CloseIcon />}
                  >
                    Cancelar
                  </Button> 
                </Grid>
                <Grid item xs={6}> 
                  <Button 
                    fullWidth
                    type="submit" 
                    color="primary" 
                    variant='contained'
                    disabled={isSubmitting}
                    startIcon={<SaveIcon />}
                  >
                    Guardar
                  </Button>  
                </Grid>
              </Grid>
              
            </Box>
        </DialogContent>       
      </form>
    </Dialog> 
)
}
