const { createContext, useState } = require("react");

export const createNoteInputContext = createContext()

export const CreateNoteInputContextProvider = ({children}) => {
    const [showCreateNoteInput, setShowCreateNoteInput] = useState(false)
    const contextValue = {
        showCreateNoteInput,
        setShowCreateNoteInput
    }
    return (
        <createNoteInputContext.Provider value={contextValue}>
            {children}
        </createNoteInputContext.Provider>
    )
}