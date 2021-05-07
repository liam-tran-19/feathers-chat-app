import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppNav from "./components/AppNav";
import store from "./redux/store";
import { loadUser } from "./redux/actions/authActions";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./components/chat/Chat";
import Conversation from "./components/chat/conversation/Conversation";
import Status from "./components/status/Status";

function App() {
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route path="/login" exact component={Login}></Route>
          <Route path="/signup" component={Register}></Route>
          <PrivateRoute exact path="/social-media" component={Status} />
          <PrivateRoute exact path="/" component={Chat} />
          <PrivateRoute exact path="/conversation" component={Conversation} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
