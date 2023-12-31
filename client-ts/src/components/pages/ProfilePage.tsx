import { useContext } from "react";
import Popup from "../html/Popup";
import "../styles/Profile.css";
import { UserContext } from "../contexts/UserContext";
import { UpdateEmailForm } from "../forms/UpdateEmailForm";
import { UpdatePasswordForm } from "../forms/UpdatePasswordForm";

export const ProfilePage = () => {
  const { currentUser, getCurrentUser } = useContext(UserContext);

  return (
    <div className="page">
      <h2 className="pageTitle">Profile</h2>
      <div className="profileDiv">
        <div className="profileContainer">
          <img
            src={require("../icons/default.png")}
            alt="profilePicture"
            className="profilePicture"
          />
          <div className="profileDetails">
            <span className="detail">
              Name: <span>{currentUser?.name}</span>
            </span>
            <span className="detail">
              Surname: <span>{currentUser?.surname}</span>
            </span>
            <span className="detail">
              Email: <span>{currentUser?.email}</span>
            </span>
            <span className="detail">
              Role: <span>{currentUser?.role}</span>
            </span>
          </div>
          <Popup
            id="updatePassword"
            title="Update password"
            btnText="Update password"
          >
            <UpdatePasswordForm />
          </Popup>

          <Popup id="updateEmail" title="Update email" btnText="Update email" closingFunction={getCurrentUser}>
            <UpdateEmailForm />
          </Popup>
        </div>
      </div>
    </div>
  );
};
