import React, { useContext } from "react";
import Input from "../../../../components/input/Input";
import Button from "../../../../components/button/Button";
import { useState } from "react";
import { myContext } from "../../../../store/Context";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./addStories.scss";

const AddStories = ({ show, func }) => {
  const store = useContext(myContext);
  const { userData } = store;
  const { data } = userData;

  const [addStory, setAddStory] = useState({
    loading: false,
    data: null,
  });

  const [{ title, status, story }, setAddStoryForm] = useState({
    title: "",
    status: "public",
    story: "",
  });

  const handleFormChange = (e) => {
    setAddStoryForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddStory((prevState) => ({
      ...prevState,
      loading: true,
    }));
    try {
      let body = {
        title: title,
        status: status,
        story: story,
        user: data._id,
      };

      let config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const res = await axios.post(
        "https://eming.herokuapp.com/stories",
        body,
        config,
        { withCredentials: true }
      );

      console.log(res);
      setAddStory((prevState) => ({
        data: res.data,
        loading: false,
      }));
    } catch (error) {
      console.log(error);
      setAddStory((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

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
    <div className={`addStories ${show && "show"}`}>
      {addStory.data && <Redirect to="./" />}
      <h1 className="addStories__header">Add Post</h1>
      <form onSubmit={handleSubmit} className="addStories__form">
        <Input
          labelText="Title"
          inputValue={title}
          onChange={handleFormChange}
          inputType="text"
          inputName="title"
        />
        <Input
          inputType="dropdown"
          inputValue={status}
          inputName="status"
          onChange={handleFormChange}
          labelText="Status"
          optionsArray={formSelectOptions}
        />
        <Input
          inputType="textArea"
          inputValue={story}
          onChange={handleFormChange}
          inputName="story"
          labelText="Your Story"
        />
        <Button btnText="Add Story" btnType="submit" />
        <Button btnText="Cancel" onClick={func} />
      </form>
    </div>
  );
};

export default AddStories;
