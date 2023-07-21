import { useState } from "react"
import { useUserContext } from "../hooks/useUserContext"
import { useNoteContext } from "../hooks/useNoteContext"
import { useCreateNoteInputContext } from "../hooks/useCreateNoteInputContext";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, TextField, Button, Typography, InputLabel, MenuItem, Select, FormControl } from "@mui/material"

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

        const response = await fetch("/note/create", {
            method: "POST",
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
            setError(error)
            // throw Error("Server side error")
        }

        if(response.ok) {
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
            {/* <label htmlFor="title"></label>
            <input 
                type="text" 
                name="title" 
                id="title" 
                placeholder="title"
                value={noteData.title}
                onChange={getNoteData}
            />
            <label htmlFor="content"></label>
            <input 
                type="text" 
                name="content" 
                id="content" 
                placeholder="content"
                value={noteData.content}
                onChange={getNoteData}
            />
            <label htmlFor="category"></label>
            <select 
                name="category" 
                id="category"
                value={noteData.category}
                onChange={getNoteData}
            >
                <option value="">Category</option>
                <option value="Study">Study</option>
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
            </select> */}
            {/* <button onClick={}>Create note</button> */}