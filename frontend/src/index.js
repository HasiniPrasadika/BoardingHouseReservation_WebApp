import React from 'react';
import { createRoot } from 'react-dom/client'; 
import './App.css';

import App from './App';
import { UserContextProvider } from "./UserContext";

const root = createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);



