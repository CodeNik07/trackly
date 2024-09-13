import React, { useRef } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../../../../Store/BoardSlice";
const BoardModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const boardTitle = useRef();
  const userState = useSelector((store) => store.usersAuth);

  const handleOk = (e) => {
    e.preventDefault();

    const btitle = boardTitle.current.value;

    boardTitle.current.value = "";
    if (btitle === "") {
      alert("Please Enter Board Title");
    } else {
      const jsonData = { boardTitle: btitle, _user: userState.user._id };
      axios.post("/boards/add", jsonData).then((res) => {
        dispatch(boardActions.addBoard(res.data));
      });
      setOpen(false);
    }
  };
  const handleCancel = (e) => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        title="Add new board"
        open={open}
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
            ref={boardTitle}
            id="taskBoardTitle"
            className="form-control"
            placeholder="board title"
          />
          <label htmlFor="taskBoardTitle">Board Title</label>
        </div>
      </Modal>
    </>
  );
};
export default BoardModal;
