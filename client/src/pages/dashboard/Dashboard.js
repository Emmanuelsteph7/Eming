import React, { useState } from "react";

import ProtectedRoute from "../../components/protectedRoute/ProtectedRoute";
import Header from "../../layouts/header/Header";
import { useRouteMatch, Switch } from "react-router-dom";
import "./dashboard.scss";
import SideNav from "../../layouts/sideNav/SideNav";
import AddStories from "./components/addStories/AddStories";
import DashboardPage from "./components/dashboardPage/DashboardPage";
import PublicStories from "./components/publicStories/PublicStories";
import EditPage from "./components/editPage/EditPage";

const Dashboard = () => {
  const { path } = useRouteMatch();
  const [navBar, setNavBar] = useState(false);

  const handleMenuToggle = () => {
    setNavBar(!navBar);
  };

  const url = window.location.href;
  const urlId = url.slice(url.lastIndexOf("/") + 1, url.length);

  return (
    <>
      <div className="dashboard">
        <Header navBarFunc={handleMenuToggle} />
        <SideNav navBarFunc={handleMenuToggle} navBar={navBar} />
        <main className="dashboard__body">
          <div className="dashboard__bodyContainer">
            <Switch>
              <ProtectedRoute
                exact
                path={`${path}`}
                component={PublicStories}
              />
              <ProtectedRoute
                path={`${path}/add-stories`}
                component={AddStories}
              />
              <ProtectedRoute
                path={`${path}/my-posts`}
                component={DashboardPage}
              />
              <ProtectedRoute path={`${path}/edit/:id`}>
                <EditPage id={urlId} />
              </ProtectedRoute>
            </Switch>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
