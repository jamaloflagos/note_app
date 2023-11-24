import { useEffect, useState } from "react"
import Header from "../components/Header"
import Notes from "../components/Notes"
import { useNoteContext } from "../hooks/useNoteContext"
import { useUserContext } from "../hooks/useUserContext"
import { Pagination } from "@mui/material"

const Main = () => {

    const {dispatch, notes} = useNoteContext();
    const {user} = useUserContext();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [notesPerPage] = useState(10);
    const lastIndex = currentPage * notesPerPage;
    const firstIndex = lastIndex - notesPerPage;
    const currentNotes = notes.slice(firstIndex, lastIndex);

    const paginate = (number) => {
        setCurrentPage(number);
    }


    console.log(user);
    
    console.log(user.token, "in main");

    useEffect(() => {
        const fetchNotes = async () => {
            const res = await fetch("https://note-app-backend-rouge.vercel.app/note", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })

            
            if(!res.ok) {
                const error = await res.json()
                setError(error.message)
            }
            
            if(res.ok) {
                const data = await res.json()
                dispatch({type: "FETCH_NOTES", payload: data})
                setIsLoading(false)
                console.log(data, "in main");
    
            }
        }

        if(user) {
            fetchNotes()
        }
    }, [dispatch, user])

    console.log(notes, "in main");
    
    if(isLoading){
        return <h1>Loading...</h1>
    }

  return (
    <div>
        <Header />
        <div>
            {notes && <h1 style={{margin: "50px 20px 10px 20px"}}>{notes.length === 0 ? "Add note" : "My Notes"}</h1>}
        </div>       
        {notes && currentNotes.map(note => {
            return <Notes 
                key={note._id}
                {...note}
            />
        })}
        {/* <Notes notes={currentNotes} /> */}
        <Pagination totalNotes={notes.length} notesPerPage={notesPerPage} paginate={paginate} />
    </div>
  )
}
export default Main