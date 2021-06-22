import React from "react";
import "./deleteModal.scss";
import Button from "../../../../components/button/Button";
// import { Redirect } from "react-router-dom";

const DeleteModal = ({ modalFunc, deleteFunc }) => {
  //   const deleteStory = async () => {
  //     try {
  //       const deletedStory = await axios.delete(
  //         `http://localhost:5000/stories/delete/${id}`
  //       );

  //       if (deletedStory) {
  //         modalFunc();
  //         window.location.reload();
  //       }
  //       //   <Redirect to="/dashboard" />;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  return (
    <div className="deleteModal">
      <h1 className="deleteModal__header">Confirm delete?</h1>
      <div className="deleteModal__btns">
        <Button btnText="Yes" onClick={deleteFunc} />
        <Button btnText="No" onClick={modalFunc} />
      </div>
    </div>
  );
};

export default DeleteModal;
