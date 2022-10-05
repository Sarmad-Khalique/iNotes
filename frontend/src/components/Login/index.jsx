import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../../context/providers/user/userContext.provider";
import Spinner from "../Spinner";

const Login = () => {
  const history = useHistory();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loginUser, isFetchingUser, user } = useContext(UserContext);
  // Redirecting user if already logged in
  useEffect(() => {
    !isFetchingUser && user && history.push("/");
  }, [isFetchingUser, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = credentials;
    loginUser({ username, password });
  };

  return (
    <div className="px-10 py-5">
      {isFetchingUser ? (
        <div className="bg-slate-800 h-48 grid place-content-center rounded">
          <Spinner />
          <span className="text-white mt-4 font-mono">Siging In...</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <h4 className="text-center text-white font-bold text-xl">Login</h4>
          <div className="flex flex-col w-full justify-center">
            <label className="text-lg text-white font-normal">Email</label>
            <input
              name="username"
              type="username"
              onChange={handleChange}
              required
              className="bg-slate-700 my-2 text-white outline-none p-2 focus:ring-1 focus:ring-purple-500 rounded"
            />
            <label className="text-lg text-white font-normal">Password</label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              required
              className="bg-slate-700 my-2 text-white outline-none p-2 focus:ring-1 focus:ring-purple-500 rounded"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-purple-800 px-2 py-2 rounded w-full block text-center"
          >
            Login
          </button>
        </form>
      )}
      <div className="text-white my-2 text-center">
        Don't have an account? <br />
        <Link
          className="text-purple-700 font-bold cursor-pointer hover:underline active:underline hover:text-purple-800 active:text-purple-800"
          to={"/register"}
        >
          Register
        </Link>{" "}
        now
      </div>
    </div>
  );
};

export default Login;
