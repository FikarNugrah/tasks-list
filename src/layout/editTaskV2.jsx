import React, { useState } from "react";

export default function EditTask_v2({ editTaskData, onSave }) {
  const [updatedData, setUpdatedData] = useState({ ...editTaskData });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSave(updatedData);
    // window.location.reload();

    // console.log("edit", updatedData);
  };

  const handleUpdate = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <div className="input-area">
      <input
        className="input-task"
        type="text"
        name="task"
        value={updatedData.task}
        onChange={handleInputChange}
        onKeyUp={handleUpdate}
      />

      <button className="add" type="submit" onClick={handleSubmit}>
        Update
      </button>
    </div>
  );
}
