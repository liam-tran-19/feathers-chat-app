import React from "react";
import { Route, Redirect } from "react-router-dom";
import { IAuthReduxProps, ProtectedRouteProps } from "../types/interfaces";
import { useSelector } from "react-redux";
import { RootStore } from "../redux/store";

const PrivateRoute = ({
  component: Component,
  ...routeProps
}: ProtectedRouteProps) => {
  const state = useSelector((state: RootStore) => state.auth);
  console.log(state);

  return (
    <Route
      {...routeProps}
      render={props =>
        state.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
