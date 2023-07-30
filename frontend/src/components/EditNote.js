import { useState, useEffect } from "react";
import { Box, TextField, Button, InputLabel, MenuItem, Select, FormControl } from "@mui/material"
import { useUserContext } from "../hooks/useUserContext"
import { useNoteContext } from "../hooks/useNoteContext"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
const EditNote = ({ShowEditInput, id, editTitle, editContent, editCategory}) => {
    console.log(editTitle);
    console.log(editContent);
    
    
    const {user} = useUserContext()
    const {dispatch} = useNoteContext()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")

    useEffect(() => {
        setTitle(editTitle);
        setContent(editContent);
        setCategory(editCategory);
    }, [editTitle, editContent, editCategory]);

    const handleNoteEdit = async (e) => {
        e.preventDefault()
        const noteData = {
            title, content, category
        }

        if(!user) {
            return
        }

        const response = await fetch(`https://note-app-backend-rouge.vercel.app/note/${id}`, {
            method: "PATCH",
            body: JSON.stringify(noteData),
            headers: {
                "Authorization": `Bearer ${user.token}`,
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()
        const error = data.error 
        console.log(error)

        if(!response.ok) {
            // setError(error)
        }

        if(response.ok) {
           
            dispatch({type: "EDIT_NOTE", payload: data})
            ShowEditInput()
            
        }

    }
  return (
    <div>
        <Box sx={{
            margin: "20px",
            border: "1px solid grey",
        }}>
        <Box>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: 10
            }}>
                <TextField 
                    id="outlined-basic" 
                    label="Title" 
                    variant="standard" 
                    margin="normal" 
                    required
                    sx={{
                        width: "180px"
                    }}
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value)
                    }}
                />
                
                <FormControl sx={{
                    width: "100px",
                    marginBottom: 0,
                    alignSelf: "center"
                }}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        value={category}
                        label="Category"
                        required
                        onChange={(event) => {
                            setCategory(event.target.value)
                        }} 
                        variant="standard"
                    >
                                <MenuItem value="Home">Home</MenuItem>
                                <MenuItem value="Study">Study</MenuItem>
                                <MenuItem value="Work">Work</MenuItem>
                                <MenuItem value="Personal">Personal</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <TextField 
                id="outlined-basic" 
                label="Content" 
                variant="standard" 
                margin="normal" 
                required
                fullWidth
                value={content}
                onChange={(event) => {
                    setContent(event.target.value)
                }}
            />
            {/* {error && <span>{error}</span>} */}
            <Button 
                variant="contained" 
                onClick={handleNoteEdit}
                size="medium"
                sx={{
                    display: "block",
                    margin: "20px auto",
                    width: 150
                }}
            >Save</Button>
        </Box>
        </Box>
    </div>
  )
}
export default EditNote