import { useUserContext } from "../hooks/useUserContext"
import CreateNote from "./CreateNote"

import { Box, Typography } from "@mui/material"
import { Add } from '@mui/icons-material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useState } from "react";
import { useCreateNoteInputContext } from "../hooks/useCreateNoteInputContext";


const Header = () => {
    const {user} = useUserContext()
    // const [showCreateNoteInput, setShowCreateNoteInput] = useState(false)
    const {showCreateNoteInput, setShowCreateNoteInput} = useCreateNoteInputContext()
    const toggleShowCreateNoteInput = () => {
        setShowCreateNoteInput(prev => {
            return !prev
        } )
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
            <Add color="primary" size="large" onClick={toggleShowCreateNoteInput}/>
        </Box>
        {showCreateNoteInput && <CreateNote />}
    </header>
  )
}
export default Header