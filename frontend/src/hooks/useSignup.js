import { useState } from "react";
import { useUserContext } from "./useUserContext";


export const useSignup =  () => {
   const [error, setError] = useState(null)
   const [isLoading, setIsLoading] = useState(null)
   const {dispatch} = useUserContext()

   const signup = async (email, password, name) => {
    setError(null)
    setIsLoading(true)

    const response = await fetch("/user/signup", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password, name}),
    })

    const data = await response.json()
    console.log(data);
    
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

   return {error, isLoading, signup}
 } 