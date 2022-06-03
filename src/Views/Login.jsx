import { Grid } from '@mui/material'
import React, { useContext } from 'react'
import { LoginForm } from './LoginForm'
import { signIn } from '../Controllers/usuariosController'
import { UserContext } from '../Models/User'
import { SharedSnackbar } from './SharedSnackbar'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    let navigate = useNavigate()
    const { setSignIn } = useContext(UserContext)
    const [showSnackbar, MySnackbar] = SharedSnackbar()

    const handleSignIn = async ({email, password}) => {
        const user = await signIn(email, password)
        if(user){
            setSignIn(user)
            navigate('/Dashboard')
        }else{
            showSnackbar('error', 'Usuario o contraseña erróneos')
        }
    }
    return (
        <div style={{    
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}>
            {MySnackbar()}
            <div style={{
                background: '#eeecec',
                padding: 20,
                borderRadius: 10
            }}>
                <h2 style={{ fontFamily: 'sans-serif'}}>Iniciar Sesión</h2>
                <LoginForm onSubmit={handleSignIn}/>
            </div>
        </div>
    )
}
