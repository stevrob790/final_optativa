const { createContext, useState } = require("react");

export const UserContext = createContext()

const initialValue = {
    email: '',
    password: '',
    id: ''
}

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(initialValue)

    const setSignIn = (values) => { setUser(values) }
    const getUserId = () => { return user.id }
    const logOut = () => { setUser(initialValue) }

    const data = {setSignIn, getUserId, logOut}

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}

