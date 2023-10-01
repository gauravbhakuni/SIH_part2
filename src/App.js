import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Components/Home";
import Validation from "./Components/Validation";
import Generation from "./Components/Generation";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Validation" element={<Validation />} />
          <Route path="/Generation" element={<Generation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
