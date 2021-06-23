import React, { useState, useContext } from "react";
import "./dashboardCard.scss";
import { IoPerson } from "react-icons/io5";
import axios from "axios";
import { MdModeEdit, MdDelete } from "react-icons/md";
// import { AiOutlineRead } from "react-icons/ai";
// import { useRef } from "react";
import { Link } from "react-router-dom";
import Modal from "../../../../components/modal/Modal";
import DeleteModal from "../deleteModal/DeleteModal";
import { myContext } from "../../../../store/Context";
import LoadingMini from "../../../../components/loadingMini/LoadingMini";

const DashboardCard = ({ data }) => {
  const store = useContext(myContext);
  const { userData } = store;

  // const paragraph = useRef();
  // const [storyData, setStoryData] = useState({
  //   above50: false,
  //   displayedData: "",
  // });

  const [deleteModal, setDeleteModal] = useState({
    loading: false,
    status: false,
  });

  const [readMore, setReadMore] = useState(false);

  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  const handleDeleteModal = () => {
    setDeleteModal((prevState) => ({
      ...prevState,
      status: !prevState.status,
    }));
  };

  console.log(data);
  console.log(userData);

  // const mappedStory = () => {
  //   let story = data.story;
  //   if (story.length > 50) {
  //     let trimmedStory = story.slice(0, 50);

  //     setStoryData(() => ({
  //       above50: true,
  //       displayedData: `${trimmedStory}...`,
  //     }));
  //   }
  // };

  const date = new Date(data.createdAt);
  let month;
  let monthNumber = date.getMonth();
  let day = date.getDate();
  let hour = date.getHours();
  let mins = date.getMinutes();
  let suffix = "AM";

  if (hour > 12) {
    hour = hour - 12;
    suffix = "PM";
  }

  if (monthNumber === 0) {
    month = "January";
  } else if (monthNumber === 1) {
    month = "February";
  } else if (monthNumber === 2) {
    month = "March";
  } else if (monthNumber === 3) {
    month = "April";
  } else if (monthNumber === 4) {
    month = "May";
  } else if (monthNumber === 5) {
    month = "June";
  } else if (monthNumber === 6) {
    month = "July";
  } else if (monthNumber === 7) {
    month = "Septemer";
  } else if (monthNumber === 8) {
    month = "August";
  } else if (monthNumber === 9) {
    month = "October";
  } else if (monthNumber === 10) {
    month = "November";
  } else if (monthNumber === 11) {
    month = "December";
  }

  let displayedDate = `${month} ${day}, ${hour}:${mins} ${suffix}`;

  let theStory = data.story;

  const displayedStory = () => {
    if (theStory.length > 100) {
      if (readMore) {
        return (
          <>
            <span>{theStory}</span>
            <span
              className="dashboardCard__paragraphSpan"
              onClick={handleReadMore}
            >
              Read less
            </span>
          </>
        );
      } else {
        return (
          <>
            <span>{theStory.slice(0, 100)}...</span>
            <span
              className="dashboardCard__paragraphSpan"
              onClick={handleReadMore}
            >
              Read more
            </span>
          </>
        );
      }
    } else {
      return (
        <>
          <span>{theStory}</span>
        </>
      );
    }
  };

  const deleteStory = async () => {
    setDeleteModal((prevState) => ({
      loading: true,
      status: !prevState.status,
    }));
    try {
      const deletedStory = await axios.delete(
        `https://eming.herokuapp.com/stories/delete/${data._id}`
      );

      if (deletedStory) {
        handleDeleteModal();
        setDeleteModal((prevState) => ({
          loading: false,
          status: !prevState.status,
        }));
        window.location.reload();
      }
      //   <Redirect to="/dashboard" />;
    } catch (error) {
      console.log(error);
      setDeleteModal((prevState) => ({
        loading: false,
        status: !prevState.status,
      }));
    }
  };

  // useEffect(() => {
  //   mappedStory();
  // }, []);
  return (
    <div className="dashboardCard">
      {deleteModal.loading ? (
        <LoadingMini />
      ) : (
        <>
          <div className="dashboardCard__bg1"></div>
          <div className="dashboardCard__bg2"></div>
          <div className="dashboardCard__body">
            <div className="dashboardCard__head">
              <div className="dashboardCard__headImg">
                {data.user.image ? (
                  <img src={data.user.image} alt="" />
                ) : (
                  <IoPerson />
                )}
              </div>
              <div className="dashboardCard__headInfo">
                <h2 className="dashboardCard__header">
                  {data.user.displayName}
                </h2>
                <span className="dashboardCard__time">{displayedDate}</span>
              </div>
            </div>
            <h1 className="dashboardCard__title">{data.title}</h1>
            <div className="dashboardCard__paragraph">{displayedStory()}</div>
            <div className="dashboardCard__btns">
              {data.user._id === userData.data._id && (
                <>
                  <div
                    className="dashboardCard__btnsdetail"
                    onClick={handleEdit}
                  >
                    <Link to={`/dashboard/edit/${data._id}`}>
                      <span className="dashboardCard__btnIcon">
                        <MdModeEdit />
                      </span>
                      <span className="dashboardCard__btnText">Edit</span>
                    </Link>
                  </div>
                  <div
                    className="dashboardCard__btnsdetail"
                    onClick={handleDeleteModal}
                  >
                    {/* <Link to={`/dashboard/edit/${data._id}`}> */}
                    <span className="dashboardCard__btnIcon">
                      <MdDelete />
                    </span>
                    <span className="dashboardCard__btnText">Delete</span>
                    {/* </Link> */}
                  </div>
                </>
              )}
            </div>
          </div>
          <Modal
            modalState={deleteModal.status}
            modalBody={
              <DeleteModal
                deleteFunc={deleteStory}
                id={data._id}
                modalFunc={handleDeleteModal}
              />
            }
          />
        </>
      )}
    </div>
  );
};

export default DashboardCard;
