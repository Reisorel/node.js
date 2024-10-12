import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from "./Pages/Landing"
import Index from "./Pages/Index";
import Credits from "./Pages/credits";

export default function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/index" element={<Index/>}></Route>
        <Route path="/credits" element={<Credits/>}></Route>
      </Routes>
    </Router>

  );
}
