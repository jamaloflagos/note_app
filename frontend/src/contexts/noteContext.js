const { createContext, useReducer } = require("react");

export const noteContext = createContext()

const noteReducer = (state, action) => {
    switch(action.type) {
        case "FETCH_NOTES": 
            return {
                notes: action.payload
            }
            case "FETCH_SINGLE_NOTE":
                return {
                    notes: [action.payload]
                }
        case "CREATE_NOTE": 
            return {
                notes: [action.payload, ...state.notes]
            }
        case "DELETE_NOTE": 
            return {
                notes: state.notes.filter(note => note._id !== action.payload._id)
            }
        case "EDIT_NOTE":
            return {
                notes: [action.payload, ...state.notes]
            }
        case "SEARCH_NOTE":
            return {
                notes: action.payload
            }
        default:
            return state
    }

}

export const NoteContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(noteReducer,{
        notes: null
    })
    return (
        <noteContext.Provider value={{dispatch, ...state}}>
            {children}
        </noteContext.Provider>
    )
}