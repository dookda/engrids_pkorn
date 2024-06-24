import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Map from './components/Map';
// import Layers from './components/Layers';
import CbLayer from './components/CbLayer';
import './App.css';


function App() {
  const [layer, setLayer] = useState({})

  const setCheckboxStatus = async (status: boolean, lyrName: string) => {
    try {
      setLayer({ ...layer, [lyrName]: status });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar></Navbar>

      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <Map layer={{ layer }} />
          </div>
          <div className="col-sm-4">
            <h3>Layers</h3>
            <CbLayer lyrName={'tambon'} onCheckboxChange={setCheckboxStatus} />
            <CbLayer lyrName={'amphoe'} onCheckboxChange={setCheckboxStatus} />
            <CbLayer lyrName={'Province'} onCheckboxChange={setCheckboxStatus} />
            <CbLayer lyrName={'trans'} onCheckboxChange={setCheckboxStatus} />
          </div>
        </div>
      </div>

    </>
  )
}

export default App;
