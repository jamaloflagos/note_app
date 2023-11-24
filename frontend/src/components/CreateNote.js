import { useState } from "react"
import { useUserContext } from "../hooks/useUserContext"
import { useNoteContext } from "../hooks/useNoteContext"
import { useCreateNoteInputContext } from "../hooks/useCreateNoteInputContext";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, TextField, Button, InputLabel, MenuItem, Select, FormControl } from "@mui/material"

const CreateNote = ({toggle}) => {
    const {user} = useUserContext()
    const {dispatch} = useNoteContext()

    const [error, setError] = useState("") 

    const {setShowCreateNoteInput} = useCreateNoteInputContext()
    const toggleShowCreateNoteInput = () => {
        setShowCreateNoteInput(prev => {
            return !prev
        } )
    }

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")

    // const [noteData, setNoteData]= useState({
    //     title: "",
    //     content: "",
    //     category: ""
    // })

    // const getNoteData = (e) => {
    //     const {name, value} = e.target

    //     setNoteData(prevNoteData  => {
    //         return {
    //             ...prevNoteData,
    //             [name]: value
    //         }
    //     })
    // }
    
    const handleNoteSubmit = async (e) => {
        e.preventDefault()
        const noteData = {
            title, content, category
        }

        if(!user) {
            return
        }

        const res = await fetch("https://note-app-backend-rouge.vercel.app/note/create", {
            method: "POST",
            body: JSON.stringify(noteData),
            headers: {
                "Authorization": `Bearer ${user.token}`,
                "Content-Type": "application/json"
            }
        })

        console.log(error)
        
        if(!res.ok) {
            const error = await res.json()
            setError(error.message)
            // throw Error("Server side error")
        }
        
        if(res.ok) {
            const data = await res.json()
            // setNoteData({
            //     name: "",
            //     phone_num: "",
            //     email: ""
            // })
            dispatch({type: "CREATE_NOTE", payload: data})
            toggleShowCreateNoteInput()

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
            {error && <span>{error}</span>}
            <Button 
                variant="contained" 
                onClick={handleNoteSubmit}
                size="medium"
                sx={{
                    display: "block",
                    margin: "20px auto",
                    width: 150
                }}
            >Add Note</Button>
        </Box>
        </Box>
    </div>
  )
}
export default CreateNote