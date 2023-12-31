import { useContext, useState } from "react";
import { LoginFormAttributes } from "../contexts/UserContextProvider";
import { UserContext } from "../contexts/UserContext";
import axiosInstance from "../configs/AxiosConfig";

export const LoginForm = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [loginFormAttributes, setLoginFormAttributes] =
    useState<LoginFormAttributes>({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  console.log();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axiosInstance
      .post(`/users/login`, loginFormAttributes)
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error: any) => {
        if (Array.isArray(error.response.data)) {
          setErrorMessage(error.response.data[0].message);
        } else {
          setErrorMessage(error.response.data.message);
        }
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormAttributes((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col border-none bg-white px-8 py-6 rounded-3xl mb-14 w-72"
        onSubmit={handleSubmit}
      >
        <label id="emailInput">
          Email
          {errorMessage && (
            <span className="errorText">{` - ${errorMessage}`}</span>
          )}
        </label>
        <input
          type="email"
          id="emailInput"
          placeholder="email"
          className="bg-neutral-200 px-2 mb-5 mt-1"
          value={loginFormAttributes.email}
          name="email"
          onChange={handleChange}
        />
        <label id="passwordInput">Password</label>
        <input
          type="password"
          id="passwordInput"
          placeholder="password"
          name="password"
          className="bg-neutral-200 px-2 mb-5 mt-1"
          value={loginFormAttributes.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="text-white bg-zinc-700 font-bold self-center px-10 py-1 text-xl rounded-3xl"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};
