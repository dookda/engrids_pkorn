import { useState } from 'react';
import Navbar from './components/Navbar';
import Map from './components/Map';
import './App.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>

      <div className="container">
        <Map></Map>
      </div>

    </>
  )
}

export default App;
