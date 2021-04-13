import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (localStorage.getItem("user")) {
        return <Component {...props} />;
      }

      alert("Sorry you are not authenticated");
      return (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      );
    }}
  />
);

// PropTypes
PrivateRoute.propTypes = {
  location: PropTypes.object,
  Component: PropTypes.any,
  rest: PropTypes.any,
};

export default PrivateRoute;
