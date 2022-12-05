import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

import './styles.css'

// Esto debería venir del back:
const DATA = [
  { id: "tarea-0", name: "Comer", completed: true },
  { id: "tarea-1", name: "Ir al super", completed: false },
  { id: "tarea-2", name: "Comprar gorras", completed: false }
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App tasks= { DATA }/>
  </React.StrictMode>
)
