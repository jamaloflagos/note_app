import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, TextField, Button, Typography } from "@mui/material"

const Login = () => {
    // const [userInfo, setUserInfo] = useState({
    //     email: "",
    //     password: ""
    // })
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {login} = useLogin()

    // const getUSerInfo = (e) => {
    //     const {name, value} = e.target
    //     setUserInfo(prevUserInfo => {
    //         return {
    //             ...prevUserInfo,
    //             [name]: value
    //         }
    //     })
    // }

    const loginSubmit = async (e)=>{
        e.preventDefault()
    
        await login(email, password)
        
    }
  return (
    <Box
        sx={{
            width: 300,
            margin: "auto",
            paddingTop: "50px"

        }}
    >
        <Box>
            <Typography 
                variant="h1" 
                component="h1"
                align="center"
                sx= {{
                    fontSize: "3rem",
                    paddingBottom: "20px"
                }}
            >
            Login to view your notes
            </Typography>
        </Box>
        <Box>
        <TextField 
                id="outlined-basic" 
                label="Email" 
                variant="outlined" 
                margin="normal" 
                fullWidth
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value)
                }}
            />
            <TextField 
                id="outlined-basic" 
                label="Password" 
                variant="outlined" 
                margin="normal" 
                fullWidth
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value)
                }}
            />
            <Button 
                variant="contained" 
                onClick={loginSubmit}
                size="medium"
                sx={{
                    display: "block",
                    margin: "20px auto",
                    width: 150
                }}
            >Login</Button>
            {/* <label htmlFor="email">Email:</label> <br />
            <input type="text" value={userInfo.email} onChange={getUSerInfo} name="email" id="email"/> <br />
            <label htmlFor="password">Pssword:</label> <br />
            <input type="text" value={userInfo.password} onChange={getUSerInfo} name="password" id="password"/>
            <button>Login</button> */}
        </Box>
    </Box>
  )
}
export default Login