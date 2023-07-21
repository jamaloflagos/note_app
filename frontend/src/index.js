import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NoteContextProvider } from './contexts/noteContext';
import { UserContextProvider } from './contexts/userContext';
import { CreateNoteInputContextProvider } from './contexts/createNoteInputContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CreateNoteInputContextProvider>
    <UserContextProvider>
      <NoteContextProvider>
        <App />
      </NoteContextProvider>
    </UserContextProvider>
</CreateNoteInputContextProvider>
);


