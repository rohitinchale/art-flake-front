// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/LoginSignup";
import Home from "./Home";
import Shop from "./Shop";
import Artist from "./ArtistPage";
import Admin from "./AdminPage";
import Cart from "./components/Cart";
import CartSummary from "./components/CartSummary";
import Checkout from "./components/Checkout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/home" Component={Home} />
        <Route path="/shop" Component={Shop} />
        <Route path="/artist" Component={Artist} />
        <Route path="/admin" Component={Admin} />
        <Route path="/cart" Component={Cart} />
        <Route path="/cartsummary" Component={CartSummary} />
        <Route path="/checkout" Component={Checkout} />
      </Routes>
    </Router>
  );
}

export default App;
