import React from "react";
import FirstDisplay from "./components/firstDisplay/FirstDisplay";
import MainDisplay from "./components/mainDisplay/MainDisplay";

import "./home.scss";

const Home = () => {
  return (
    <main className="home">
      <FirstDisplay />
      <MainDisplay />
    </main>
  );
};

export default Home;
