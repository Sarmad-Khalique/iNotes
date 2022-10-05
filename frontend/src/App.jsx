import React, { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import AddForm from "./components/AddForm";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NotesOverview from "./components/NotesOverview";
import Register from "./components/Register";
import { UserContext } from "./context/providers/user/userContext.provider";

function App() {
  const { checkUserSession } = useContext(UserContext);

  useEffect(() => {
    checkUserSession();
  }, []);

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={NotesOverview} />
        <Route path="/add" component={AddForm} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </>
  );
}

export default App;
