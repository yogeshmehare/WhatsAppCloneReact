import React, { createContext, useState } from 'react'

export const LoginContext = createContext();

const LoginContextProvider = (props) => {


    const userState = {
        User: {
            UserId: "",
            UserFirstName: "",
            UserLastName: "",
            UserEmail: "",
            UserLogInStatus: false
        }
    }
    const [state, setState] = useState(userState);


    const SetLogInStatus = (user) => {
        setState({ User: user })
    }

    return (
        <LoginContext.Provider value={{ state, SetLogInStatus }}>
            {props.children}
        </LoginContext.Provider>
    )

}


export default LoginContextProvider
