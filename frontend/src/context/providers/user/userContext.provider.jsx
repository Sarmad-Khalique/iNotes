import axios from "axios";
import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import { NotesContext } from "../notes/notesContext.provider";

const INITIAL_STATE = {
  user: null,
  isFetchingUser: false,
};

export const UserContext = createContext(INITIAL_STATE);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [handlingUserAuthentication, setHandlingUserAuthentication] = useState({
    isFetchingUser: false,
    isRegisteringUser: false,
    userRegistered: false,
  });

  const { notesCleanup } = useContext(NotesContext);

  const loginUser = ({ username, password }) => {
    setHandlingUserAuthentication({
      ...handlingUserAuthentication,
      isFetchingUser: true,
    });
    axios
      .post("http://127.0.0.1:8000/api/customToken/", {
        username,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("tokens", JSON.stringify(response.data));
          const { name, email, is_active } = jwt_decode(response.data.access);
          setUser({
            name,
            email,
            is_active,
          });
          setHandlingUserAuthentication({
            ...handlingUserAuthentication,
            isFetchingUser: false,
          });
        }
      })
      .catch((error) => {
        setUser(null);
        setHandlingUserAuthentication({
          ...handlingUserAuthentication,
          isFetchingUser: false,
        });
        console.log(error);
      });
  };

  const registerUser = ({
    username,
    email,
    password,
    first_name,
    last_name,
  }) => {
    setHandlingUserAuthentication({
      ...handlingUserAuthentication,
      isRegisteringUser: true,
      userRegistered: false,
    });
    axios
      .post("http://127.0.0.1:8000/api/registerUser/", {
        username,
        password,
        email,
        first_name,
        last_name,
      })
      .then((response) => {
        response.status === 201 &&
          setHandlingUserAuthentication({
            ...handlingUserAuthentication,
            isRegisteringUser: false,
            userRegistered: true,
          });
      })
      .catch((error) => {
        console.log(error);
        setHandlingUserAuthentication({
          ...handlingUserAuthentication,
          isRegisteringUser: false,
          userRegistered: false,
        });
      });
  };

  const checkUserSession = () => {
    // get tokens from local storage
    const { access, refresh } =
      JSON.parse(localStorage.getItem("tokens")) || {};
    // If access token is present in local storage then verify it
    if (access) {
      setHandlingUserAuthentication({
        ...handlingUserAuthentication,
        isFetchingUser: true,
      });
      axios
        .post("http://127.0.0.1:8000/api/token/verify/", {
          token: access,
        })
        .then((response) => {
          if (response.status === 200) {
            const { name, email, is_active } = jwt_decode(access);
            setUser({
              name,
              email,
              is_active,
            });
            setHandlingUserAuthentication({
              ...handlingUserAuthentication,
              isFetchingUser: false,
            });
          }
        })
        .catch((error) => {
          // if the token has been expired or it's invalid then an error will be raised rather than response and it will be caught in this catch block
          if (error.response.status === 401) {
            const { exp } = jwt_decode(refresh);
            // Date.now() will return number of millisecods
            // If isExpred is negative it means that token is expired
            const isExpired = exp * 1000 - Date.now();
            // if refresh token is not expired then use it to get new tokens
            if (isExpired > 0) {
              setHandlingUserAuthentication({
                ...handlingUserAuthentication,
                isFetchingUser: true,
              });
              axios
                .post("http://127.0.0.1:8000/api/token/refresh/", {
                  refresh,
                })
                .then((response) => {
                  if (response.status === 200) {
                    localStorage.setItem(
                      "tokens",
                      JSON.stringify(response.data)
                    );
                    const { name, email, is_active } = jwt_decode(
                      response.data.access
                    );
                    setUser({
                      name,
                      email,
                      is_active,
                    });
                    setHandlingUserAuthentication({
                      ...handlingUserAuthentication,
                      isFetchingUser: false,
                    });
                  }
                })
                .catch((error) => {
                  setUser(null);
                  setHandlingUserAuthentication({
                    ...handlingUserAuthentication,
                    isFetchingUser: false,
                  });
                  console.log(error);
                });
            }
          }
        });
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("tokens");
    notesCleanup();
    setUser(null);
  };

  const registerUserCleanup = () => {
    setHandlingUserAuthentication({
      ...handlingUserAuthentication,
      isRegisteringUser: false,
      userRegistered: false,
    });
  };

  const value = {
    user,
    handlingUserAuthentication,
    loginUser,
    checkUserSession,
    logoutUser,
    registerUser,
    registerUserCleanup,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
