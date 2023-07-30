import { useEffect } from "react"
import Header from "../components/Header"
import Notes from "../components/Notes"
import { useNoteContext } from "../hooks/useNoteContext"
import { useUserContext } from "../hooks/useUserContext"

const Main = () => {

    const {dispatch, notes} = useNoteContext()
    const {user} = useUserContext()
    console.log(user);
    
    console.log(user.token, "in main");

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await fetch("/note", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })

            const data = await response.json()

            if(!response.ok) {
                throw Error("Server side error")
            }

            if(response.ok) {
                dispatch({type: "FETCH_NOTES", payload: data})
                console.log(data, "in main");
    
            }
        }

        if(user) {
            fetchNotes()
        }
    }, [dispatch, user])

    console.log(notes, "in main");
    

  return (
    <div>
        <Header />
        <div>
            {notes && <h1 style={{margin: "50px 20px 10px 20px"}}>{notes.length === 0 ? "Add note" : "My Notes"}</h1>}
        </div>       
        {notes && notes.map(note => {
            return <Notes 
                key={note._id}
                {...note}
            />
        })}
    </div>
  )
}
export default Main