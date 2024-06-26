import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Map from './components/Map';
// import Layers from './components/Layers';
import Layer from './components/Layer';
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

      <div className="container mt-3">
        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <Map layer={{ layer }} />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <h3>Layers</h3>
                <Layer lyrName={'tambon'} onCheckboxChange={setCheckboxStatus} />
                <Layer lyrName={'amphoe'} onCheckboxChange={setCheckboxStatus} />
                <Layer lyrName={'province'} onCheckboxChange={setCheckboxStatus} />
                <Layer lyrName={'trans'} onCheckboxChange={setCheckboxStatus} /></div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App;
