// React imports:
import React from 'react'
import ReactDOM from 'react-dom/client'

// Component imports:
import { Login } from './Login';
import { Note } from './Note'
import { Signup } from './Signup';

// Style imports:
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';

// Esto debería venir del back:
const DATA = [
  { id: "tarea-0", name: "Comer", completed: true },
  { id: "tarea-1", name: "Ir al super", completed: false },
  { id: "tarea-2", name: "Comprar gorras", completed: false }
];

// <Note tasks= { DATA }/>
//    <Login/>
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Login/>
    <Signup/>
    <Note tasks= { DATA }/>
  </React.StrictMode>
)
