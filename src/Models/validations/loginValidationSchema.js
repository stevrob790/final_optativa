import * as yup from 'yup'

export const loginValidationSchema = yup.object().shape({
    email: yup.string().email('Email no válido').required('Nombre de usuario requerido'),
    password: yup.string().required('Contraseña requerida')
})
