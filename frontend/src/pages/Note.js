import { useEffect } from "react"
import { useNoteContext } from "../hooks/useNoteContext"
import { useUserContext } from "../hooks/useUserContext"
const Note = ({id}) => {
    const {dispatch, notes} = useNoteContext()
    const {user} = useUserContext()
    useEffect( () => {
        const fetchSingleNotes = async () => {
            const _id = JSON.parse(localStorage.getItem("noteId"))            
            const response = await fetch(`/note/${_id}`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            console.log(response);
            
            if(response.ok) {
                const data = await response.json()
                dispatch({type: "FETCH_SINGLE_NOTE", payload: data})
                console.log(data);
                
            }

            if(!response.ok) {
                throw Error("Server side error")
            }
            
        }
        
        console.log(notes);
        
        if(user) {
            fetchSingleNotes()
        }
    },[dispatch, user, notes])
  return (
    <div>
        {notes && notes.map(note => {
            return <div>
                <h1>{note.title}</h1>
                {console.log(note)}
            </div>
        })}

        <h1>Note</h1>
        {/* {notes && <h1>{notes.title}</h1>} */}
    </div>
  )
}
export default Note