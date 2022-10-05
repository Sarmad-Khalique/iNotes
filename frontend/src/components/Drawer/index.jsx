import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/providers/user/userContext.provider";

const Drawer = ({ open, setOpen }) => {
  const {
    user,
    handlingUserAuthentication: { isFetchingUser },
    logoutUser,
  } = useContext(UserContext);

  // Disabling the scroll behaviour whenthe drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    }
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [open]);

  return (
    <div
      className={`bg-slate-800 fixed h-screen w-full border-b-2 border-b-purple-700 transition-all duration-300 ${
        open ? "translate-y-100vh" : "-translate-y-[100vh]"
      }`}
    >
      <div className="flex flex-col px-10 py-8 text-white text-sm space-y-4 ">
        <Link onClick={() => setOpen(false)} to={"/add"}>
          Add Notes
        </Link>
        <Link onClick={() => setOpen(false)} to={"/"}>
          View Notes
        </Link>
        {!isFetchingUser && user ? (
          <React.Fragment>
            <div>
              Welcome{" "}
              <span className="ml-1 text-purple-700 font-bold">
                {user?.name}
              </span>
            </div>
            <button
              onClick={() => {
                logoutUser();
                setOpen(false);
              }}
              className="bg-purple-700 p-1 text-sm rounded"
            >
              Logout
            </button>
          </React.Fragment>
        ) : (
          <Link
            onClick={() => setOpen(false)}
            to="/login"
            className="bg-purple-700 px-6 py-1 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Drawer;
