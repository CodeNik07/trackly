import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import BoardModal from "../AppModals/BoardModal/BoardModal";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../../../Store/BoardSlice";

export default function Sidebar({ setBoard }) {
  const [open, setOpen] = useState(false);
  const userState = useSelector((store) => store.usersAuth);
  const state = useSelector((store) => store.boards);
  const dispatch = useDispatch();
  const showModal = () => {
    setOpen(true);
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      const response = await axios.delete(`/boards/${boardId}`);
      if (response.status === 200) {
        // dispatch({ type: "DELETE_BOARD", payload: boardId });
        dispatch(boardActions.deleteBoard(boardId));
        setBoard({
          boardId: "",
          boardTitle: "",
        });
      }
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  useEffect(() => {
    try {
      axios
        .get(`/boards/${userState.user._id}`)
        .then((res) => {
          dispatch(boardActions.getBoards(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {}
  }, []);
  return (
    <>
      <div
        className={`d-flex flex-column flex-shrink-0 ${styles.taskHomeSidebar}`}
      >
        <span className="fs-4">Boards</span>

        <hr />

        <div className={`${styles.sidebarboardlist}`}>
          {state.boardList.map((board) => {
            return (
              <div className={`${styles.boardListSidebar}`} key={board._id}>
                <Link
                  className={`${styles.boardListSidebarLink}`}
                  aria-current="page"
                  onClick={() =>
                    setBoard({
                      boardId: board._id,
                      boardTitle: board.boardTitle,
                    })
                  }
                >
                  {board.boardTitle}
                </Link>
                <div
                  className={`${styles.deletebntdivstyle}`}
                  onClick={() => handleDeleteBoard(board._id)}
                >
                  <RiDeleteBin6Line className={`${styles.deleteiconstyle}`} />
                </div>
              </div>
            );
          })}
        </div>
        <hr />

        <button
          className={`btn ${styles.sidebarBoardButton}`}
          onClick={() => showModal()}
        >
          Add Board
        </button>
        <BoardModal open={open} setOpen={setOpen} showModal={showModal} />
      </div>
    </>
  );
}
