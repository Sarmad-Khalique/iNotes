import React, { useState } from "react";
import Modal from "../Modal";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordModal, setPasswordModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = credentials;
    password != confirmPassword
      ? setPasswordModal(true)
      : console.log(username, password);
  };

  const { username, email, password, confirmPassword } = credentials;

  return (
    <div className="px-10 py-5">
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <h4 className="text-center text-white font-bold text-xl">Register</h4>
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
    </div>
  );
};

export default Register;
