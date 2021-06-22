import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "../../pages/home/Home";
import { myContext } from "../../store/Context";
import Loading from "../loading/Loading";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const store = useContext(myContext);
  const { userData } = store;
  const { userLogin, loading } = userData;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) {
          return <Loading />;
        } else {
          if (userLogin) {
            if (rest.path === "/") {
              return (
                <Redirect
                  to={{
                    pathname: "/dashboard",
                    state: {
                      from: props.location,
                    },
                  }}
                />
              );
            } else {
              return <Component {...props} />;
            }
          } else {
            if (rest.path === "/") {
              return <Home />;
            } else {
              return (
                <Redirect
                  to={{
                    pathname: "/",
                    state: {
                      from: props.location,
                    },
                  }}
                />
              );
            }
          }
        }
      }}
    />
  );
};

export default ProtectedRoute;
