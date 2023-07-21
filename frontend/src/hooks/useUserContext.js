import { useContext } from "react";
import { userContext } from "../contexts/userContext";
export const useUserContext = () => {
    const context = useContext(userContext)

    if(!context) {
        throw Error("Must be used within context")
    } 

    return context
}