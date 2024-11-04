import { Route, Routes } from "react-router-dom";
import Info from "./components/Info";
import Front from "./components/Front";
import { Context } from "./utils/context";
import { useState } from "react";
import Back from "./components/Back";
import Cyber from "./components/Cyber";
import Reg from "./components/Reg";
import Grafic from "./components/Grafic";
import Succes from "./components/Succes";


function App() {
  const [page, setPage] = useState()
  const [reg, setReg] = useState()
  return (
    <div className="App">
      <Context.Provider value={{ setPage, page, reg, setReg }}>
        <Routes>
          <Route path="/" element={<Info />} />
          <Route path="/front" element={<Front />} />
          <Route path="/back" element={<Back />} />
          <Route path="/cyber" element={<Cyber />} />
          <Route path="/graphic" element={<Grafic />} />
          <Route path="/success" element={<Succes />} />
          <Route path="/:kurs/regis" element={<Reg />} />
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
