import React, { useState } from "react";
import styles from "./TaskLists.module.scss";
import TaskCard from "../TaskItem/TaskCard";
import TaskModal from "../../AppModals/TaskModal/TaskModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { tasklistActions } from "../../../../Store/TasklistSlice";

export default function TaskLists({ listTitle, taskListId }) {
  const [open, setOpen] = useState(false);
  
  const state = useSelector((store)=>store.tasks);
  const dispatch = useDispatch();
  const truncateText = (text, maxLength) => {
    if (!maxLength || text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const handleTaskListDelete = async (tasklistid) => {
    try {
      const res = await axios.delete(`/tasklists/${tasklistid}`);
      if (res.status === 200) {
        dispatch(tasklistActions.deleteTasklist(tasklistid));
      }
    } catch (err) {
      console.error("Error deleting task list:", err);
    }
  };

  return (
    <div className={`shadow rounded ${styles.tasklist}`}>
      <div className={`${styles.taskslisthead}`}>
        <h4 className={`${styles.taskListHeading}`}>
          {truncateText(listTitle, 9)}
        </h4>
        <div
          className={`${styles.deletebtndivstyle}`}
          onClick={() => handleTaskListDelete(taskListId)}
        >
          <RiDeleteBin6Line className={`${styles.deletebtnstyle}`} />
        </div>
      </div>

      {state.tasks
        .filter((task) => task._tasklist === taskListId)
        .map((task) => {
          return (
            <TaskCard
              key={task._id}
              taskListId={taskListId}
              taskListTitle={listTitle}
              open={open}
              setOpen={setOpen}
              task={task}
            />
          );
        })}

      <div className={`btn ${styles.addnewbuttondiv}`}>
        <button
          className={`${styles.addnewtaskstyle}`}
          onClick={() => setOpen(true)}
        >
          Add task
        </button>
      </div>
      <TaskModal
        open={open}
        setOpen={setOpen}
        taskListId={taskListId}
        taskListTitle={listTitle}
      />
    </div>
  );
}
