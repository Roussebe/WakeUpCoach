import React, { useContext } from "react";
import {Outlet} from "react-router-dom";

import { UidContext } from "../components/AppContext";
import Log from "../components/Log";

const Admin = () => {
  const uid = useContext(UidContext);

  return (
    <div className="main-container">
      {uid ? (
        <>
        <h4>Admin Page</h4>
        <Outlet />
        </>
      ) : (
        <Log signin={true} signup={false} />
      )}
    </div>
  );
};

export default Admin;
