import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./App.module.scss";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import { Provider } from "react-redux";
import TracklyStore from "./Store/TracklyStore";

function App() {
  return (
    <Provider store={TracklyStore}>
      <div className={`${styles.mainAppFontStyle}`}>
        <Navbar />
        <Outlet />
      </div>
    </Provider>
  );
}

export default App;
