import { useUserContext } from "../hooks/useUserContext"
import CreateNote from "./CreateNote"
import { useLogout } from "../hooks/useLogout";
import { Box, Typography, Button } from "@mui/material"
import { Add } from '@mui/icons-material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useCreateNoteInputContext } from "../hooks/useCreateNoteInputContext";


const Header = () => {
    const {logout} = useLogout()
    const {user} = useUserContext()
    const {showCreateNoteInput, setShowCreateNoteInput} = useCreateNoteInputContext()
    const toggleShowCreateNoteInput = () => {
        setShowCreateNoteInput(prev => {
            return !prev
        } )
    }

    const logoutUser = () => {
        logout()
    }
    return (
        <header>
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "20px 30px"
            }}
        >
            <Box 
                sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center"
                }}
            >
                <img 
                    src="https://t4.ftcdn.net/jpg/00/84/67/19/360_F_84671939_jxymoYZO8Oeacc3JRBDE8bSXBWj0ZfA9.jpg" 
                    alt="user" 
                    style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        border: "1px solid black"
                    }}
                    />
                <Typography 
                    variant="h1" 
                    component="span"
                    align="center"
                    sx= {{
                        fontSize: "1.5rem"
                    }}
                >
                    {user.name}
                </Typography>
            </Box>
            <Button 
                variant="contained" 
                onClick={logoutUser}
                size="small"
                color="error"
                sx={{
                    // display: "block",
                    // margin: "20px auto",
                    width: 100
                }}
            >Logout</Button>
            <Add color="primary" size="large" onClick={toggleShowCreateNoteInput}/>
        </Box>
        {showCreateNoteInput && <CreateNote />}
    </header>
  )
}
export default Header