import { useState } from "react";
import { useUserContext } from "./useUserContext";


export const useLogin =  () => {
   const [error, setError] = useState(null)
   const [isLoading, setIsLoading] = useState(null)
   const {dispatch} = useUserContext()

   const login = async (email, password) => {
    setError(null)
    setIsLoading(true)

    const res = await fetch("https://note-app-backend-rouge.vercel.app/user/login", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password}),
    })

    
    if(!res.ok) {
        const error = await res.json()
        setError(error.message)
        setIsLoading(false)
        console.log(data.error);
        
    }
    
    if(res.ok) {
        const data = await res.json()
        localStorage.setItem('user', JSON.stringify(data))
        setIsLoading(false)
        dispatch({type: "LOGIN", payload: data})
    }


   }

   return {error, isLoading, login}
 } 