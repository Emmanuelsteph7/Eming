import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LoadingMini from "../../../../components/loadingMini/LoadingMini";
import { myContext } from "../../../../store/Context";
import DashboardCard from "../dashboardCard/DashboardCard";
import "./dashboardPage.scss";

const DashboardPage = () => {
  const store = useContext(myContext);
  const { userData } = store;
  const [stories, setStories] = useState({
    loading: true,
    data: [],
  });

  const fetchStories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getStories", {
        withCredentials: true,
      });
      setStories(() => ({
        loading: false,
        data: res.data,
      }));
    } catch (err) {
      console.log(err);
      setStories((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  let mappedStories;
  if (!stories.data.length) {
    mappedStories = <div>No story found</div>;
  } else {
    mappedStories = stories.data.map((story) => {
      return <DashboardCard key={story._id} data={story} />;
    });
  }

  return (
    <section className="dashboardPage">
      <div>
        <h1 className="dashboardPage__header">
          Hello {userData.data.firstName ? userData.data.firstName : ""}
        </h1>
        <p className="dashboardPage__paragraph">Here are your posts</p>
      </div>
      {stories.loading ? <LoadingMini /> : <div>{mappedStories}</div>}
    </section>
  );
};

export default DashboardPage;
