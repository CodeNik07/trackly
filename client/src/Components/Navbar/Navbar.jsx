import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import styles from "./Navbar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../Store/UserSlice";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { boardActions } from "../../Store/BoardSlice";
import { taskActions } from "../../Store/TaskSlice";
import { tasklistActions } from "../../Store/TasklistSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const userState = useSelector((store) => store.usersAuth);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleMenuClick = (e) => {
    switch (e.key) {
      case "1":
        navigate("/login");
        break;
      case "2":
        navigate("/register");
        break;
      case "3":
        handleLogOut();
        break;

      default:
        break;
    }
  };

  const handleOpenChange = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const item1 = [
    {
      label: "Logout",
      key: "3",
    },
  ];

  const item2 = [
    {
      label: "Login",
      key: "1",
    },
    {
      label: "Register",
      key: "2",
    },
  ];

  const items = userState.isAuthenticated ? item1 : item2;

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    dispatch(userActions.userLogout());
    dispatch(boardActions.resetBoard());
    dispatch(taskActions.resetTask());
    dispatch(tasklistActions.resetTasklist());
    navigate("/");
  };
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary rounded"
      aria-label="Thirteenth navbar example"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample11"
          aria-controls="navbarsExample11"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse d-lg-flex"
          id="navbarsExample11"
        >
          <Link
            className={`col-lg-3 me-0 ${styles.navbarTaskAppHeading}`}
            to={"/"}
          >
            Trackly
          </Link>
          <div className="d-lg-flex col-lg-9 justify-content-lg-end">
            <Dropdown
              menu={{
                items,
                onClick: handleMenuClick,
              }}
              onOpenChange={handleOpenChange}
              open={open}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <div className={styles.userIconsDropStyle}>
                    <FaRegCircleUser className={`${styles.userIconStyle}`} />
                    <DownOutlined />
                  </div>
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
}
