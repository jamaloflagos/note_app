import { useContext } from "react";
import { noteContext } from "../contexts/noteContext";

export const useNoteContext = () => {
    const context = useContext(noteContext)
    
    if(!context) {
        throw Error("Most be used within its context")
    }
    
    return context
}