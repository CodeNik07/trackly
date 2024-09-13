import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import HomeComponent from "../HomePage/HomeComponent";
import { useNavigate } from "react-router-dom";
import SelectBoardStorySet from "../../../assets/vector_image/Images/Select_board.svg";
import styles from "./HomeLayout.module.scss";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../Store/UserSlice";

export default function HomeLayout() {
  const [selectedTab, setSelectedTab] = useState(false);
  const [board, setBoard] = useState({ boardId: "", boardTitle: "" });
  const [cookie] = useCookies(["token"]);
  const userState = useSelector((store) => store.usersAuth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (token) {
      setFetching(true);
      axios
        .get(`/users/profile/${token}`)
        .then((res) => {
          if (res.data) {
            dispatch(userActions.userProfile(res.data));
          }
          setFetching(false);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className={`${styles.mainHomeContainer}`}>
      {fetching ? (
        <>
          <div className={`${styles.contentLoadingMain}`}>
            <Flex align="center" gap="middle">
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 90,
                    }}
                    spin
                  />
                }
              />
            </Flex>
          </div>
        </>
      ) : (
        <>
          {userState.isAuthenticated ? (
            <>
              <Sidebar
                setBoard={setBoard}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
              {/* <Outlet selectedTab={selectedTab} board={board} /> */}
              {board.boardId !== "" ? (
                <HomeComponent
                  board={board}
                  selectedTab={selectedTab}
                  setBoard={setBoard}
                />
              ) : (
                <>
                  <div className={`${styles.nodatadivstyle}`}>
                    <div className={`${styles.nodataimgdivstyles}`}>
                      <img
                        src={SelectBoardStorySet}
                        alt=""
                        srcSet=""
                        className={"img-fluid"}
                      />
                      <p>Select a Board</p>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}
