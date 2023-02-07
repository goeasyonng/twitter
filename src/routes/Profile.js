import React from "react";
import { auth } from "../fbase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <button className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
          Log Out
        </button>
      </div>
    </>
  );
};

export default Profile;
