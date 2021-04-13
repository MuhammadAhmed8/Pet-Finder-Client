import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (
        (localStorage.getItem("user") && rest.path === "/signup") ||
        (localStorage.getItem("user") && rest.path === "/login")
      )
        return (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );

      return <Component {...props} />;
    }}
  />
);

// PropTypes
PublicRoute.propTypes = {
  location: PropTypes.object,
  Component: PropTypes.any,
  rest: PropTypes.any,
};

export default PublicRoute;
