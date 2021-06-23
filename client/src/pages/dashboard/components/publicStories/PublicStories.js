import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import LoadingMini from "../../../../components/loadingMini/LoadingMini";
import { myContext } from "../../../../store/Context";
import AddStories from "../addStories/AddStories";
import DashboardCard from "../dashboardCard/DashboardCard";
import "./publicStories.scss";

const PublicStories = () => {
  const store = useContext(myContext);
  const { userData } = store;
  const { data } = userData;

  const [publicStories, setPublicStories] = useState({
    loading: true,
    data: [],
  });

  const [addStories, setAddStories] = useState(false);

  const handleAddStories = () => {
    setAddStories(!addStories);
  };

  const fetchPublicStories = async () => {
    try {
      const res = await axios.get(
        "https://eming.herokuapp.com//stories/public",
        {
          withCredentials: true,
        }
      );

      setPublicStories(() => ({
        loading: false,
        data: res.data,
      }));
    } catch (err) {
      console.log(err);
      setPublicStories((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    fetchPublicStories();
  }, []);

  let mappedStories;
  if (!publicStories.data.length) {
    mappedStories = <div>No story found</div>;
  } else {
    mappedStories = publicStories.data.map((story) => {
      return <DashboardCard key={story._id} data={story} />;
    });
  }
  return (
    <div className="publicStories">
      <div className=".publicStories__postStory">
        <div
          className="publicStories__postStoryContainer"
          onClick={handleAddStories}
        >
          <div className="publicStories__img">
            <img src={data.image ? data.image : ""} alt="" />
          </div>
          <div className="publiStories__postStoryDetail">Make a Post</div>
        </div>
        <AddStories func={handleAddStories} show={addStories} />
      </div>
      {publicStories.loading ? <LoadingMini /> : <div>{mappedStories}</div>}
    </div>
  );
};

export default PublicStories;
