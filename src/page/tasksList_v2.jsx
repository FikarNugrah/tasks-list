import React, { useEffect, useState } from "react";
import {
  getTask,
  addTask,
  updateTaskCompletion,
  delateTask,
  updateTask,
} from "../slice/tasksSlicev2";
import { useDispatch, useSelector } from "react-redux";
import EditTask from "../layout/editTaskV2";

export default function TasksList_v2() {
  const [detailTask, setDetailTask] = useState(null);
  const [editingTask, setEditingTask] = useState([]);
  const [layoutInput, setLayoutInput] = useState(false);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTask());
  }, []);

  const currentDateTime = new Date();
  let formattedDateTimeAdd = `${currentDateTime.toISOString().split("T")[0]} ${
    currentDateTime.toTimeString().split(" ")[0]
  }`;

  const [newTask, setNewTask] = useState({
    task: "",
    isComplated: false,
    added_on: formattedDateTimeAdd,
    complated_on: null,
  });

  const handleEdit = (id) => {
    setLayoutInput((prev) => !prev);
    const editTask = tasks.find((task) => task.id === id);
    if (editTask) {
      setEditingTask(editTask);
    }
  };

  // ...
  const handleSave = (updatedData) => {
    // console.log("cek,", updatedData);
    if (editingTask) {
      dispatch(updateTask(updatedData));
      setLayoutInput(false);
    }
  };

  function handleDetail(task) {
    // console.log(task);
    setDetailTask(task);
    if (detailTask !== null) {
      setDetailTask(null);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(addTask(newTask));
    setNewTask({
      ...newTask,
      task: "",
    });
  };

  const handleAdd = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  function handleCheck(taskId, isChecked) {
    // console.log(taskId);
    // console.log(isChecked);
    const currentDateTime = new Date();
    const formattedDateTime = `${currentDateTime.toISOString().split("T")[0]} ${
      currentDateTime.toTimeString().split(" ")[0]
    }`;

    const taskToUpdate = tasks.find((task) => task.id === taskId);
    const { added_on } = taskToUpdate;

    dispatch(
      updateTaskCompletion({
        id: taskId,
        isComplated: isChecked,
        added_on,
        complated_on: isChecked ? formattedDateTime : null,
      })
    );

    // window.location.reload();
  }
  // console.log(tasks);

  function handleDelete(taskId) {
    dispatch(delateTask({ id: taskId }));
  }
  return (
    <div>
      <h2 className="title">TASK LIST</h2>

      <div className="task-list">
        <table>
          <thead className="thead">
            <tr>
              <th style={{ paddingLeft: "25px" }}>isComplated</th>
              <th></th>
              <th>
                {layoutInput ? (
                  <EditTask editTaskData={editingTask} onSave={handleSave} />
                ) : (
                  <div className="input-area">
                    <input
                      className="input-task"
                      type="text"
                      name="task"
                      value={newTask.task}
                      onChange={handleInputChange}
                      onKeyUp={handleAdd}
                    />
                    <button
                      className="add"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      add
                    </button>
                  </div>
                )}
              </th>
              <th className="center">Added On</th>
              <th className="center">Complated On</th>
              <th className="center">Delete</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {tasks.map((task) => (
              <tr key={task.id}>
                <th className="box" style={{ paddingLeft: "25px" }}>
                  <label
                    className={task.isComplated ? "hoverCheck" : "container"}
                  >
                    <input
                      className="cbx2"
                      id={`cbx_${task.id}`}
                      style={{ display: "none" }}
                      type="checkbox"
                      checked={task.isComplated}
                      onChange={() => handleCheck(task.id, !task.isComplated)}
                    />
                    <label htmlFor={`cbx_${task.id}`} className="check">
                      <svg width="18px" height="18px" viewBox="0 0 18 18">
                        <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                        <polyline points="1 9 7 14 15 4"></polyline>
                      </svg>
                    </label>
                  </label>
                </th>
                <th className="th-edit">
                  {!task.isComplated && (
                    <i
                      onClick={() => handleEdit(task.id)}
                      className="fa-regular fa-pen-to-square edit"
                    ></i>
                  )}
                </th>
                <th className="task">
                  <p>
                    <span
                      className={
                        task.isComplated ? "completed" : "not-completed"
                      }
                    >
                      {task.task.length > 40 ? (
                        <span style={{ position: "relative" }}>
                          {task.task}
                          {/* {task.task.slice(0, 40)} */}
                          <span
                            className="see-all"
                            onClick={() => handleDetail(task.task)}
                          ></span>
                        </span>
                      ) : (
                        task.task
                      )}
                    </span>
                  </p>
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "13px",
                    color: "gray",
                  }}
                >
                  {task.added_on}
                </th>
                <th
                  style={{
                    textAlign: "center",
                    fontSize: "13px",
                    color: "gray",
                  }}
                >
                  {task.complated_on}
                </th>

                <th className="del">
                  <i
                    onClick={() => handleDelete(task.id)}
                    className="fa-solid fa-trash"
                  ></i>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
