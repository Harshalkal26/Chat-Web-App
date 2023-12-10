import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./component/Join/Join";
import Chat from "./component/Chat/chat";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exect path="/" Component={Join} />
          <Route exect path="/chat" Component={Chat} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
