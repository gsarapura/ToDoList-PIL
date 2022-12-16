// React imports:
import ReactDOM from 'react-dom/client'
import React from 'react'

// Component imports:
import { Login } from './Login';
import { Note } from './Note'
import { Signup } from './Signup';

// Style imports:
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';

// React Router:
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/registro",
    element: <Signup/>,
  },
  {
    path: "/notas",
    element: <Note />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
