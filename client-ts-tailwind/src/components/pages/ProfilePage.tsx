import { useContext } from "react";
import Popup from "../html/Popup";
import { UserContext } from "../contexts/UserContext";
import { UpdateEmailForm } from "../forms/UpdateEmailForm";
import { UpdatePasswordForm } from "../forms/UpdatePasswordForm";

export const ProfilePage = () => {
  const { currentUser, getCurrentUser } = useContext(UserContext);

  return (
    <div className="page">
      <h2 className="text-2xl text-center font-bold mb-5">Profile</h2>
      <div className=" my-10 mx-16">
        <div className="grid grid-cols-[190px_1fr] gap-5">
          <img
            src={require("../icons/default.png")}
            alt="profilePicture"
            className="profilePicture"
          />
          <div className="flex flex-col justify-center">
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
