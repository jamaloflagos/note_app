import { useEffect, useParams, useState } from "react"
import { useNoteContext } from "../hooks/useNoteContext"
import { useUserContext } from "../hooks/useUserContext"
const Note = () => {
    const {dispatch, notes} = useNoteContext();
    const {user} = useUserContext();
    const { _id } = useParams();
    const [error, setError] = useState("");
    const [filteredNote, setFilteredNote] = useState(null);

    useEffect( () => {
        const fetchSingleNotes = async () => {
            const res = await fetch(`https://note-app-backend-rouge.vercel.app/note/${_id}`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            
            if(res.ok) {
                const data = await res.json();
                setFilteredNote(notes.filter(note => note._id === data._id));
                console.log(data);
            }

            if(!res.ok) {
                const error = await res.json()
                setError(error.message)
            }
        }
        
        console.log(notes[0], "in note");        
        if(user) {
            fetchSingleNotes()
        }
    },[dispatch, user, _id])

  return (
    <div>
        {filteredNote && filteredNote.map(note => {
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