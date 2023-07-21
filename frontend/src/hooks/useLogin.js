import { useState } from "react";
import { useUserContext } from "./useUserContext";


export const useLogin =  () => {
   const [error, setError] = useState(null)
   const [isLoading, setIsLoading] = useState(null)
   const {dispatch} = useUserContext()

   const login = async (email, password) => {
    setError(null)
    setIsLoading(true)

    const response = await fetch("/user/login", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password}),
    })

    const data = await response.json()

    if(!response.ok) {
        setError(data.error)
        setIsLoading(false)
        console.log(data.error);
        
    }

    if(response.ok) {
        localStorage.setItem('user', JSON.stringify(data))
        setIsLoading(false)
        dispatch({type: "LOGIN", payload: data})
    }


   }

   return {error, isLoading, login}
 } 