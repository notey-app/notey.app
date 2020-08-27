import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import { Provider } from "react-redux";
import store from "./utils/store";
import * as serviceWorker from "./utils/serviceWorker";

const SignIn = lazy(() => import("./pages/auth/SignIn"));
const SignUp = lazy(() => import("./pages/auth/Signup"));
const App = lazy(() => import("./pages/App"));
const NotFound = lazy(() => import("./components/NotFound"));
const renderLoader = () => <p></p>;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Suspense fallback={renderLoader()}>
          <Switch>
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
            <AuthRoute path="/" exact component={App} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("app-mount")
);

serviceWorker.register();
