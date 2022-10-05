import React, { useState, useEffect, useContext } from "react";
import Modal from "../Modal";
import { UserContext } from "../../context/providers/user/userContext.provider";
import Spinner from "../Spinner";
const Register = () => {
  const {
    registerUser,
    handlingUserAuthentication: { isRegisteringUser, userRegistered },
    registerUserCleanup,
  } = useContext(UserContext);

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
  });

  const [passwordModal, setPasswordModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  useEffect(() => {
    return () => {
      !isRegisteringUser && userRegistered && registerUserCleanup();
    };
  }, [isRegisteringUser, userRegistered]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      username,
      email,
      password,
      confirmPassword,
      first_name,
      last_name,
    } = credentials;
    password != confirmPassword
      ? setPasswordModal(true)
      : registerUser({ username, email, password, first_name, last_name });
  };

  const { username, email, password, confirmPassword, first_name, last_name } =
    credentials;

  return (
    <div className="px-10 py-5">
      {isRegisteringUser ? (
        <div className="bg-slate-800 h-48 grid place-content-center rounded">
          <Spinner />
          <span className="text-white mt-4 font-mono">Registering User...</span>
        </div>
      ) : (
        <>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            {!isRegisteringUser && userRegistered && (
              <div className="w-full px-1 py-2 my-2 bg-green-700 text-white uppercase text-center">
                User Registered
              </div>
            )}
            <h4 className="text-center text-white font-bold text-xl">
              Register
            </h4>
            <div className="flex flex-col w-full justify-center">
              <label className="text-lg text-white font-normal">Username</label>
              <input
                name="username"
                type="username"
                onChange={handleChange}
                value={username}
                required
                className="bg-slate-700 my-2 text-white outline-none p-2 focus:ring-1 focus:ring-purple-500 rounded"
              />
              <label className="text-lg text-white font-normal">
                First Name
              </label>
              <input
                name="first_name"
                type="text"
                onChange={handleChange}
                value={first_name}
                required
                className="bg-slate-700 my-2 text-white outline-none p-2 focus:ring-1 focus:ring-purple-500 rounded"
              />
              <label className="text-lg text-white font-normal">
                Last Name
              </label>
              <input
                name="last_name"
                type="text"
                onChange={handleChange}
                value={last_name}
                required
                className="bg-slate-700 my-2 text-white outline-none p-2 focus:ring-1 focus:ring-purple-500 rounded"
              />
              <label className="text-lg text-white font-normal">Email</label>
              <input
                name="email"
                type="email"
                onChange={handleChange}
                value={email}
                required
                className="bg-slate-700 my-2 text-white outline-none p-2 focus:ring-1 focus:ring-purple-500 rounded"
              />
              <label className="text-lg text-white font-normal">Password</label>
              <input
                name="password"
                type="password"
                onChange={handleChange}
                value={password}
                required
                className="bg-slate-700 my-2 text-white outline-none p-2 focus:ring-1 focus:ring-purple-500 rounded"
              />
              <label className="text-lg text-white font-normal">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                value={confirmPassword}
                required
                className="bg-slate-700 my-2 text-white outline-none p-2 focus:ring-1 focus:ring-purple-500 rounded"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-purple-800 px-2 py-2 rounded w-full block text-center"
            >
              Register
            </button>
          </form>
          <Modal
            title="Alert"
            body="Passwords don't match"
            showModal={passwordModal}
            setShowModal={setPasswordModal}
          />
        </>
      )}
    </div>
  );
};

export default Register;
