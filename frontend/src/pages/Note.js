import { useEffect } from "react"
import { useNoteContext } from "../hooks/useNoteContext"
import { useUserContext } from "../hooks/useUserContext"
const Note = () => {
    const {dispatch, notes} = useNoteContext()
    const {user} = useUserContext()
    const _id = JSON.parse(localStorage.getItem("noteId"))            
    console.log(_id, "in note");
    useEffect( () => {
        const fetchSingleNotes = async () => {
            const response = await fetch(`https://note-app-backend-rouge.vercel.app/note/${_id}`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            
            if(response.ok) {
                const data = await response.json()
                dispatch({type: "FETCH_SINGLE_NOTE", payload: data})
                console.log(data);
            }

            if(!response.ok) {
                throw Error("Server side error")
            }
        }
        
        console.log(notes[0], "in note");        
        if(user) {
            fetchSingleNotes()
        }
    },[dispatch, user, _id])
  return (
    <div>
        {notes.map(note => {
                return <div key={note._id}>
                    <h1>{note.title}</h1>
                    <p>{note.content}</p>
                </div>
            })}

        <h1>Note</h1>
        {/* {notes && <h1>{notes.title}</h1>} */}
    </div>
  )
}
export default Note