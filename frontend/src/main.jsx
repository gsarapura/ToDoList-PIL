// React imports:
import ReactDOM from 'react-dom/client'
import React from 'react';

// Component imports:
import { Login } from './pages/Login';
import { Note } from './pages/Notes'
import { Signup } from './pages/Signup';

// Style imports:
import './main.css';

// React Router:
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Box, ChakraProvider } from '@chakra-ui/react';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route 
              path="/"
              element={ <Login/> }
            />
            <Route 
              path="/registro"
              element={ <Signup/> }
            />
            <Route
              path="/notas"
              element={ <Note/> }
            />
          </Routes>
        </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
