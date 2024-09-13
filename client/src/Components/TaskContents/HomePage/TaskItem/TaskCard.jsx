import React from "react";
import styles from "./TaskCard.module.scss";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { useDispatch } from "react-redux";
import { taskActions } from "../../../../Store/TaskSlice";

export default function TaskCard({ task }) {
  const dispatch = useDispatch();

  const truncateText = (text, maxLength) => {
    if (!maxLength || text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const handleTaskDelete = async (taskid) => {
    try {
      const res = await axios.delete(`/tasks/${taskid}`);
      if (res.status === 200) {
        dispatch(taskActions.deleteTask(taskid))
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    
    <div className={`${styles.carddivstyle}`}>
      <div className="card m-2">
        <div className="card-body">
          <div className={`${styles.taskcardheaddiv}`}>
            <h5 className={`${styles.taskcardheading}`}>{truncateText(task.tasktitle, 12)}</h5>
            <div className={`${styles.deletebtndivstyle}`} onClick={()=>handleTaskDelete(task._id)} >
              <RiDeleteBin6Line className={`${styles.deletebtnstyle}`} />
            </div>
          </div>
          <hr />
          <p>{task.taskdesc}</p>
        </div>
      </div>
    </div>
  );
}
