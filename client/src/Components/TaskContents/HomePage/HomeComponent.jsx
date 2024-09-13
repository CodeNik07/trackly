import React, { useEffect, useState } from "react";
import TaskLists from "./TaskList/TaskLists";
import styles from "./HomeComponent.module.scss";
import axios from "axios";
import ListModal from "../AppModals/ListModal/ListModal";
import NoDataStorySet from "../../../assets/vector_image/Images/No_data_story_set.svg";
import { useDispatch, useSelector } from "react-redux";
import { tasklistActions } from "../../../Store/TasklistSlice";
import { taskActions } from "../../../Store/TaskSlice";

export default function HomeComponent({ board}) {
  const state = useSelector((store)=>store.tasklists);
  const dispatch = useDispatch();
  const userState = useSelector((store)=>store.usersAuth);

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    try {
      axios.get(`/tasklists/${board.boardId}`).then((res) => {
        dispatch(tasklistActions.getTaskslist(res.data));
      });
    } catch (err) {
      console.log(err);
    }
  }, [board]);

  useEffect(()=>{
    try {
      
        axios.get(`/tasks/${userState.user._id}`).then((res)=>{
          dispatch(taskActions.getTasks(res.data));
        })
        
      
    } catch (err) {
      console.log(err);
    }
  }, [])

  return (
    <div className={`${styles.homeBackStyle}`}>
      <div className={`${styles.taskBoardMainHead}`}>
        <p className={`${styles.boardheadingparStyle}`}>{board.boardTitle}</p>
        <button
          className={`btn ${styles.taskboardaddlist}`}
          onClick={() => showModal()}
        >
          Add List
        </button>
        <ListModal open={open} setOpen={setOpen} board={board.boardId} />
      </div>
      <div className={`${styles.taskslistdiv}`}>
        {state.tasksList.length !== 0 ? (
          state.tasksList.map((data) => {
            return (
              <div className="m-3" key={data._id}>
                <TaskLists
                  listTitle={data.tasklisttitle}
                  taskListId={data._id}
                />
              </div>
            );
          })
        ) : (
          <>
            <div className={`${styles.nodatadivstyle}`}>
              <div className={`${styles.nodataimgdivstyles}`}>
                <img
                  src={NoDataStorySet}
                  alt=""
                  srcSet=""
                  className={"img-fluid " + styles.loginImgStyle}
                />
                <p>Create new List</p>
              </div>
              
            </div>
          </>
        )}
      </div>
    </div>
  );
}
