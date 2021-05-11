import React, { Suspense, useEffect } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

import routes from "../routes";
import Dashboard from "../views/pages/dashboard/Dashboard";
import Brand from "../views/stock/brands/Brand";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

export default function TheContent() {
  let { path, url } = useRouteMatch();

  useEffect(() => {
    console.log(routes);
    console.log(path);
  }, []);
  return (
    <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                      <route.component {...props} />
                  )} />
              )
            })}
          </Switch>
          {/* <Redirect from="/"  to="/dashboard"/> */}
        </Suspense>
  );
}
