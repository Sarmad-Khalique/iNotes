import React, { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/providers/user/userContext.provider";
import Drawer from "../Drawer";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { user, isFetchingUser, logoutUser } = useContext(UserContext);

  return (
    <>
      <div className="bg-slate-800 text-white px-10 py-5 sticky top-0 border-b-purple-700 border-b-2 z-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            iNotes
          </Link>
          <div
            className="cursor-pointer z-10 md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <AiOutlineClose /> : <BiMenu />}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to={"/"}>View Notes</Link>
            <Link to={"/add"}>Add Notes</Link>
            {!isFetchingUser && user ? (
              <React.Fragment>
                <div className="border-l-2 pl-2 border-l-purple-700">
                  Welcome{" "}
                  <span className="ml-1 text-purple-700 font-bold">
                    {user?.name}
                  </span>
                </div>
                <button
                  onClick={() => logoutUser()}
                  className="bg-purple-700 p-1 text-sm rounded"
                >
                  Logout
                </button>
              </React.Fragment>
            ) : (
              <Link to="/login" className="bg-purple-700 px-6 py-1 rounded">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
      <Drawer open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;
