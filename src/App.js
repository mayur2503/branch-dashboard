import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { TheLayout } from "./containers";
import { history } from "./helper/history";
import Login from "./views/pages/login";
import "react-responsive-modal/styles.css";
import PrivateRoute from "./containers/PrivateRoute";
import ReduxToastr from "react-redux-toastr";
import { useDispatch, useSelector } from "react-redux";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const loading = (
  <Dimmer active inverted>
    <Loader />
  </Dimmer>
);
function App() {
  const loader = useSelector((state) => state.loader);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  useEffect(() => {
    if (loggedIn) {
      //history.replace('/dashboard')
    }
  }, []);
  return (
    <>
      {loader.isLoading ? loading : null}
      <Router history={history}>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <PrivateRoute
              path="/"
              name="Home"
              component={(props) => <TheLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </Router>
      <ReduxToastr
        timeOut={5000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        getState={(state) => state.toastr} // This is the default
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        closeOnToastrClick
      />
    </>
  );
}

export default App;
