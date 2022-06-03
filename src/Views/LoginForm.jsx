import { Button, Grid, TextField } from '@mui/material'
import { Form, Formik, useField } from 'formik'
import React from 'react'
import { loginValidationSchema } from '../Models/validations/loginValidationSchema'

const initialValues = {
    email: '',
    password: ''
}

const StyledInput = ({...props}) => {
    const [field, meta] = useField(props)
    
    const showError = !!meta.error && meta.touched
    return (
        <TextField     
            error={showError}  
            helperText={showError && meta.error}
            {...field}
            {...props}
        />
    )
}

export const LoginForm = ({onSubmit}) => {
    return (
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={loginValidationSchema}
        >
            { ({errors}) => {
                return (
                    <Form>
                        {console.log(errors)}
                        <Grid container spacing={2} mb={1}>
                            <Grid item xs={12}>
                                <StyledInput
                                    name='email'
                                    label='Email'
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} mb={1}>
                            <Grid item>
                                <StyledInput
                                    name='password'
                                    label='Contraseña'
                                    variant="outlined"
                                    type='password'
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} justifyContent='center'>
                            <Grid item>
                                <Button type='submit' variant='contained'>
                                    Ingresar
                                </Button>
                            </Grid>
                        </Grid>
                        
                    </Form>
                )
            }}
        </Formik>
    )
}
