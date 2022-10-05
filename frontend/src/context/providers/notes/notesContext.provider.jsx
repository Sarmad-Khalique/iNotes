import axios from "axios";
import { createContext, useState } from "react";

const INITIAL_STATE = {
  notes: null,
  isFetchingNotes: false,
};

export const NotesContext = createContext(INITIAL_STATE);

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(null);
  const [isFetchingNotes, setIsFetchingNotes] = useState(false);
  const [handlingNotes, setHandlingNotes] = useState({
    isAddingNotes: false,
    isUpdatingNotes: false,
    notesAdded: false,
    notesUpdated: false,
  });

  const getNotes = () => {
    setIsFetchingNotes(true);
    const { access } = JSON.parse(localStorage.getItem("tokens")) || {};

    access &&
      axios
        .get("http://127.0.0.1:8000/api/getNotes/all/", {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setNotes(response.data);
            setIsFetchingNotes(false);
          }
        })
        .catch((error) => {
          setNotes(null);
          setIsFetchingNotes(false);
          console.log(error);
        });
  };

  const addNotes = ({ title, text }) => {
    setHandlingNotes({
      ...handlingNotes,
      isAddingNotes: true,
      notesAdded: false,
    });
    axios
      .post(
        "http://127.0.0.1:8000/api/createNotes/",
        {
          title,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("tokens")).access
            }`,
          },
        }
      )
      .then((response) => {
        response.status === 201 &&
          setHandlingNotes({
            ...handlingNotes,
            isAddingNotes: false,
            notesAdded: true,
          });
      })
      .catch((error) => {
        setHandlingNotes({
          ...handlingNotes,
          isAddingNotes: false,
          notesAdded: false,
        });
        console.log(error);
      });
  };

  const removeNotes = ({ id }) => {
    axios
      .delete(`http://127.0.0.1:8000/api/deleteNotes/${id}/`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("tokens")).access
          }`,
        },
      })
      .then((response) => {
        response.status === 204 && getNotes();
      });
  };

  const updateNotes = ({ id, title, text }) => {
    setHandlingNotes({
      ...handlingNotes,
      isUpdatingNotes: true,
      notesUpdated: false,
    });
    axios
      .put(
        `http://127.0.0.1:8000/api/updateNotes/${id}/`,
        {
          title,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("tokens")).access
            }`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setHandlingNotes({
            ...handlingNotes,
            isUpdatingNotes: false,
            notesUpdated: true,
          });
          getNotes();
        }
      });
  };

  const notesHandlingCleanup = () => {
    setHandlingNotes({
      isUpdatingNotes: false,
      notesUpdated: false,
      isUpdatingNotes: false,
      notesUpdated: false,
    });
  };

  const notesCleanup = () => {
    setNotes(null);
    setIsFetchingNotes(false);
  };
  const value = {
    notes,
    isFetchingNotes,
    getNotes,
    notesCleanup,
    handlingNotes,
    notesHandlingCleanup,
    removeNotes,
    updateNotes,
    addNotes,
  };
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};

export default NotesProvider;
