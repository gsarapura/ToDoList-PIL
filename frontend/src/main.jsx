// React imports:
import ReactDOM from 'react-dom/client'
import React from 'react';

// Component imports:
import { Login } from './Login';
import { Note } from './Note'
import { Signup } from './Signup';

// Style imports:
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';

// React Router:
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
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
  </React.StrictMode>
)
