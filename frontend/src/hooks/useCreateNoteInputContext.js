import { useContext } from "react"
import { createNoteInputContext } from "../contexts/createNoteInputContext"
export const useCreateNoteInputContext = () => {
    const context = useContext(createNoteInputContext)
    if(!context) {
        throw Error("Must be used within its context")
    }

    return context
}