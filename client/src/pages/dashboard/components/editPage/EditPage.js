import React, { useEffect } from "react";
import Input from "../../../../components/input/Input";
import Button from "../../../../components/button/Button";
import "./editPage.scss";
import LoadingMini from "../../../../components/loadingMini/LoadingMini";
import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";

const EditPage = ({ id }) => {
  const [story, setStory] = useState({
    loading: true,
    data: {},
  });

  const [editState, setEditState] = useState({
    loading: false,
    data: null,
  });

  const [editForm, setEditForm] = useState({
    title: "",
    status: "",
    story: "",
    user: "",
  });

  // const fetchSpecificStory = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:5000/stories/edit/${id}`);

  //     setStory((prevState) => ({
  //       ...prevState,
  //       loading: false,
  //     }));

  //     setEditForm(() => ({
  //       title: res.data.title,
  //       status: res.data.status,
  //       story: res.data.story,
  //       user: res.data.user,
  //     }));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleFormChange = (e) => {
    setEditForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, status, story, user } = editForm;

      let updatedBody = {
        title: title,
        status: status,
        story: story,
        user: user,
      };

      let config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const res = await axios.put(
        `https://eming.herokuapp.com/stories/edit/${id}`,
        updatedBody,
        config,
        { withCredentials: true }
      );

      console.log(res);

      setEditState((prevState) => ({
        data: res.data,
        loading: false,
      }));
    } catch (error) {
      setEditState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    const fetchSpecificStory = async () => {
      try {
        const res = await axios.get(
          `https://eming.herokuapp.com/stories/edit/${id}`
        );

        setStory((prevState) => ({
          ...prevState,
          loading: false,
        }));

        setEditForm(() => ({
          title: res.data.title,
          status: res.data.status,
          story: res.data.story,
          user: res.data.user,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchSpecificStory();
  }, [id]);

  const formSelectOptions = [
    {
      id: 1,
      value: "public",
    },
    {
      id: 2,
      value: "private",
    },
  ];

  return (
    <div className="editPage">
      {editState.data && <Redirect to="/dashboard" />}
      {story.loading ? (
        <LoadingMini />
      ) : (
        <>
          <h1 className="editPage__header">Edit Story</h1>
          <form className="editPage__form" onSubmit={handleSubmit}>
            <Input
              labelText="Title"
              inputValue={editForm.title}
              onChange={handleFormChange}
              inputType="text"
              inputName="title"
            />
            <Input
              inputType="dropdown"
              inputValue={editForm.status}
              inputName="status"
              onChange={handleFormChange}
              labelText="Status"
              optionsArray={formSelectOptions}
            />
            <Input
              inputType="textArea"
              inputValue={editForm.story}
              onChange={handleFormChange}
              inputName="story"
              labelText="Your Story"
            />
            <Button btnText="Save" btnType="submit" />
            <Button btnText="Cancel" btnLink="/dashboard" />
          </form>
        </>
      )}
    </div>
  );
};

export default EditPage;
