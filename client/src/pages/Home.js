import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Log from "../components/Log";
import Dashboard from "../components/Dashboard";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="main-container">
      {uid ? (
        <Dashboard />
      ) : (
        <Log signin={true} signup={false} />
      )}
    </div>
  );
};

export default Home;
