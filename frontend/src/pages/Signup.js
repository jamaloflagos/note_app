import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import {Link} from "react-router-dom"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, TextField, Button, Typography } from "@mui/material"


const Signup = () => {
    // const [userInfo, setUserInfo] = useState({
    //     email: "",
    //     password: "",
    //     name: ""
    // })

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { signup } = useSignup()

    // const getUSerInfo = (e) => {
    //     const {name, value} = e.target
    //     setUserInfo(prevUserInfo => {
    //         return {
    //             ...prevUserInfo,
    //             [name]: value
    //         }
    //     })
    // }

    const signupSubmit = async (e)=>{
        e.preventDefault()
    
        await signup(email, password, name)
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
                Sign up
            </Typography>
        </Box>
        <Box>
            <TextField 
                id="outlined-basic" 
                label="Name" 
                variant="outlined" 
                margin="normal" 
                fullWidth
                value={name}
                onChange={(event) => {
                    setName(event.target.value)
                }}
            />
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
            {/* <label htmlFor="name">Name:</label> <br />
            <input type="text" value={userInfo.name} onChange={getUSerInfo} name="name" id="name"/> <br />
            <label htmlFor="email">Email:</label> <br />
            <input type="text" value={userInfo.email} onChange={getUSerInfo} name="email" id="email"/> <br />
            <label htmlFor="password">Pssword:</label> <br />
            <input type="text" value={userInfo.password} onChange={getUSerInfo} name="password" id="password"/> */}
            <Button 
                variant="contained" 
                onClick={signupSubmit}
                size="medium"
                sx={{
                    display: "block",
                    margin: "20px auto",
                    width: 150
                }}
            >Sign up</Button>
            {/* <button>SignUp</button> */}
        </Box>
        <Box>
            <Typography 
                    variant="h1" 
                    component="p"
                    align="center"
                    sx= {{
                        fontSize: "1.5rem"
                    }}
                >
                    Already have an account? <Link to="/login">Login</Link>
                </Typography>
            {/* <span>Already have an account? <Link to="/login">Login</Link></span> */}
        </Box>
    </Box>
  )
}
export default Signup