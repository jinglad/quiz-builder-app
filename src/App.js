import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import AdminHome from "./pages/AdminHome/AdminHome";
import CreateQuiz from "./pages/CreateQuiz/CreateQuiz";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import reduxStore from "./Redux/store";

function App() {
  const {store, persistor} = reduxStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path="/">
              <AdminHome />
            </Route>
            <Route exact path="/admin">
              <AdminHome />
            </Route>
            <Route exact path="/form/:id">
              <CreateQuiz />
            </Route>
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
