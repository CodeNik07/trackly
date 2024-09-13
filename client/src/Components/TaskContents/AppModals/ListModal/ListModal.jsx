import { Button, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasklistActions } from "../../../../Store/TasklistSlice";

export default function ListModal({ open, setOpen, board }) {
  const state = useSelector((store) => store.tasklists);
  const dispatch = useDispatch();

  const taskListTitle = useRef();

  const handleOk = (e) => {
    e.preventDefault();
    const tlTitle = taskListTitle.current.value;
    taskListTitle.current.value = "";
    if (tlTitle === "") {
      alert("Please enter task list title");
    } else {
      const jsonData = { tasklisttitle: tlTitle, _board: board };
      axios.post("/tasklists/add", jsonData).then((res) => {
        dispatch(tasklistActions.addTasklist(res.data));
      });
      setOpen(false);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        title="Add new List"
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
        <div className="form-floating">
          <input
            type="text"
            ref={taskListTitle}
            id="taskListTitle"
            className="form-control"
            placeholder="task list title"
          />
          <label htmlFor="taskListTitle">Task List Title</label>
        </div>
      </Modal>
    </>
  );
}
