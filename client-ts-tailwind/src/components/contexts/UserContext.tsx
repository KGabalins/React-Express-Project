import { useContext, useEffect, useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import axiosInstance from "../configs/AxiosConfig";

export type UserType = {
  email: string;
  name: string;
  surname?: string;
  role: string;
};

export type ErrorData = {
  type: string;
  message: string;
};

type UserContextType = {
  currentUser: UserType | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  logoutUser: () => void;
  getCurrentUser: () => void;
  checkUserStatus: () => void;
};

export type LoginFormAttributes = {
  email: string;
  password: string;
};

export type RegisterFormAttributes = {
  name: string;
  surname?: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};

const UserContext = createContext({} as UserContextType);

const UserContextProvider = () => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(
    {} as UserType
  );

  useEffect(() => {
    getCurrentUser();
  }, []);

  const logoutUser = () => {
    axiosInstance
      .delete(`/users/logout`)
      .then(() => {
        setCurrentUser(null);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  };

  const getCurrentUser = () => {
    axiosInstance
      .get(`/users`)
      .then((response) => {
        const userData: UserType = response.data;

        setCurrentUser(userData);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  };

  const checkUserStatus = () => {
    axiosInstance.get(`users/isLoggedIn`).then((response) => {
      if (!response.data.isLoggedIn && currentUser) {
        setCurrentUser(null);
      }
    });
  };

  return (
    <>
      <UserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          logoutUser,
          getCurrentUser,
          checkUserStatus,
        }}
      >
        <Outlet />
      </UserContext.Provider>
    </>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserContextProvider, useUserContext };
