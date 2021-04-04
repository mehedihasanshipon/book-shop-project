import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminSection from "./Components/AdminSection/AdminSection";
import OrderSection from "./Components/OrdersSection/OrderSection";
import CheckOut from "./Components/CheckOut/CheckOut";
import Login from "./Components/Login/Login";
import { createContext, useState } from "react";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();
export const CategoryContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [category, setCategory] = useState("");
  return (
    <UserContext.Provider
      value={[loggedInUser, setLoggedInUser]}
    >
      <CategoryContext.Provider value={[category, setCategory]}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <PrivateRoute path="/orders">
              <OrderSection />
            </PrivateRoute>
            <Route path="/admin">
              <AdminSection />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/checkout/:id">
              <CheckOut />
            </PrivateRoute>
          </Switch>
        </Router>
      </CategoryContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
