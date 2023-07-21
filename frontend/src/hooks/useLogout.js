import { useUserContext } from "./useUserContext";
import { useNoteContext } from "./useNoteContext";

export const useLogout = () => {
    const {dispatch} = useUserContext()
    const {dispatch: noteDispatch} = useNoteContext()

    const logout = () => {
        dispatch({type: "LOGOUT"})

        localStorage.removeItem("user")

        noteDispatch({type: "SET_NOTES", payload: null})
    }

    return {logout}
}