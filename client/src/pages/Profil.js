import React, { useContext } from "react";
//import Log from "../components/Log";

import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">

      <div>
        {uid? (
          <UpdateProfil />
        ) : (
          <p>Not logged in</p>
        )}
      </div>
    </div>
  );
};


/*
{uid ? (

) : (
  <div className="log-container">
    <Log signin={false} signup={true} />
    <div className="img-container">
      <img src="./img/log.svg" alt="img-log" />
    </div>
  </div>
)}
*/
export default Profil;
