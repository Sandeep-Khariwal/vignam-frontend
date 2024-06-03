import React from "react";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.tsx";
import Teach from "./components/Teach.tsx";
import TakeClass from "./components/TakeClass.tsx";
import ClassLibrary from "./components/ClassLibrary.tsx"
import Doubt from "./components/Doubt.tsx"
import Home from "./components/Home.tsx";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={ <Home/> }>
      <Route path="/dashboard" element={ <Dashboard/> }/>
        <Route path="/teach" element={ <Teach/> }/>
        <Route path="/take-class" element={ <TakeClass/> }/>
        <Route path="/class-library" element={ <ClassLibrary/> }/>
        <Route path="/doubt" element={<Doubt/> }/>
      </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
