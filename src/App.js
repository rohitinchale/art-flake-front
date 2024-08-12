// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/LoginSignup";
import Home from "./Home";
import Shop from "./Shop";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/home" Component={Home} />
        <Route path="/shop" Component={Shop} />
      </Routes>
    </Router>
  );
}

export default App;
