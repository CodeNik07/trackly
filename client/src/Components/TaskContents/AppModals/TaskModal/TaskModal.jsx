import { Button, Modal } from "antd";
import React, { useRef } from "react";
import axios from "axios";
import { taskActions } from "../../../../Store/TaskSlice";
import { useDispatch, useSelector } from "react-redux";

export default function TaskModal({
  open,
  setOpen,
  taskListId,
  taskListTitle,
}) {
  const taskTitle = useRef();
  const taskDesc = useRef();
  const selectTaskList = useRef();
  const dispatch = useDispatch();
  const userState = useSelector((store) => store.usersAuth);
  const handleOk = (e) => {
    e.preventDefault();
    const tasktitle = taskTitle.current.value;
    const taskdesc = taskDesc.current.value;
    const _tasklist = selectTaskList.current.value;

    if (tasktitle === "" && taskdesc === "") {
      alert("Please enter title and description first");
    } else {
      const jsonData = {
        tasktitle,
        taskdesc,
        _tasklist,
        _user: userState.user._id,
      };
      axios.post("/tasks/add", jsonData).then((res) => {
        dispatch(taskActions.addTask(res.data));
      });
    }
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        title="Add new Task"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancle
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Save
          </Button>,
        ]}
      >
        <div className="form-floating mb-3">
          <input
            type="text"
            id="taskTitle"
            ref={taskTitle}
            className="form-control"
            placeholder="task title"
          />
          <label htmlFor="taskTitle">Task Title</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            id="taskDesc"
            ref={taskDesc}
            className="form-control"
            placeholder="task desc"
          />
          <label htmlFor="taskDesc">Task Description</label>
        </div>
        <label htmlFor="selectTaskList">Task List</label>
        <select
          className="form-select"
          id="selectTaskList"
          aria-label="Default select example"
          ref={selectTaskList}
          disabled
        >
          <option value={taskListId}>{taskListTitle}</option>
        </select>
      </Modal>
    </>
  );
}
