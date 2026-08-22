import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import axios from "axios";
import AppRoutes from "./routes/AppRoutes";
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  axios.get("http://127.0.0.1:8000/api/test")
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });

  return (
    <>
    <AppRoutes />
      

    </>
  )
}

export default App;
