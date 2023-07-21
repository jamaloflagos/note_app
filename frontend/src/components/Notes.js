import { useState } from "react"
import { Link } from "react-router-dom"
import { Box, Checkbox } from "@mui/material"
import { Delete, Edit, Share } from "@mui/icons-material"
import { format,parseISO } from "date-fns"
import { useNoteContext } from "../hooks/useNoteContext"
import { useUserContext } from "../hooks/useUserContext"
import EditNote from "./EditNote"

const Notes = ({title, content, createdAt, _id, updatedAt, category}) => {
    const {dispatch} = useNoteContext()
    const {user} = useUserContext()
    const [showShareBtn, setShowShareBtn] = useState(false) 
    const [ShowEditInput, setShowEditInput] = useState(false)

    const toggleShowShareBtn = () => {
        setShowShareBtn(prev => {
            return !prev
        })

    }
    const toggleShowEditInput = () => {
        setShowEditInput(prev => {
            return !prev
        })

    }
    console.log(createdAt, "createdAt");
    console.log(updatedAt, "updatedAt");
    const date = ShowEditInput ? updatedAt : createdAt
    const parsedDate = parseISO(date);
    // console.log(parsedDate);
    
    const formattedDate = format(parsedDate, "MMMM d, yyyy");

    const storeSingleNoteId = () => {
  localStorage.setItem('noteId', JSON.stringify(_id))

    }
  const deleteNote = async () => {
    if(!user) {
      return
    }
    const response = await fetch(`/note/${_id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    })

    if(!response.ok) {
        throw Error("Server side error")
    }

    if(response.ok) {
        const data = await response.json()
        dispatch({type: "DELETE_NOTE", payload: data})

    }

    // try {
    //     const data = await response.json()
    //     dispatch({type: "DELETE_NOTE", payload: data})
    // } catch (error) {
    //     console.log(error)
    // }

  }



  return (
    <div>
    <section>
        <Box sx={{
                    borderBottom: "1px solid grey",
        
        }}
            // onClick={toggleShowEditInput}
        >
            <Box 
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "5px 20px",
                }}
            >
                <Box>
                    <Link 
                        to={`/note/${_id}`}
                        onClick={storeSingleNoteId}
                        style={{
                            textDecoration: "none",
                            color: "inherit"
                        }}
                    >
                        <h3 style={{
                            marginBottom: "5px"
                        }}>{title}</h3>
                        <span>{content}</span>
                    </Link>
                </Box>
                <Box 
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                    }}
                >
                    <Checkbox 
                        sx={{
                            alignSelf: "flex-end"
                        }}
                        onClick={toggleShowShareBtn}
                    />
                    <span style={{color: "grey"}}>{formattedDate}</span>
                </Box>
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px 20px 5px 20px",
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "30px"
                }}>
                    <Delete color="error" onClick={deleteNote}/>
                    <Edit color="primary" onClick={toggleShowEditInput}/>
                </Box>
                {showShareBtn && <Share color="primary"/>}
            </Box>
        </Box>
    </section>
    {ShowEditInput && <EditNote ShowEditInput={toggleShowEditInput} id={_id} editTitle={title} editCategory={category} editContent={content}/>}
    </div>
  )
}
export default Notes