import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Log from "../components/Log";
import Dashboard from "../components/Dashboard";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home">
      {uid ? (
        <Dashboard />
      ) : (
        <Log signin={true} signup={false} />
      )}
    </div>
  );
};

export default Home;
