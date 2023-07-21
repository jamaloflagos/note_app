
// import io from "socket.io-client"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useUserContext } from "./hooks/useUserContext";
import { useNoteContext } from "./hooks/useNoteContext";
import Note from "./pages/Note";
// console.log(io);

// const socket = io("http://localhost:4000/", {transports: ['websocket'], upgrade: false})

// // Emit an event to send data to the server
// socket.emit("editNote", {
//   noteId,
//   userId,
//   note
// })

// socket.emit("deleteNote", {
//   noteId,
//   userId
// })

// // Listen for an event to recieve data from the server
// socket.on("noteEdited", (data) => {
//   `${data} recieved from backend`
// })

// socket.on("noteDeleted", (data) => {
//   `${data} recieved from backend`
// })

function App() {

  const {user} = useUserContext()
  const {notes} = useNoteContext()
  // const {_id} = notes
  console.log(notes);
  
  return ( 
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={user ? <Main /> : <Navigate to='signup' />} />
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/'/>} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/'/>} />
          <Route path="/note/:id" element={<Note />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
