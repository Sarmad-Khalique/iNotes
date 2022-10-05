import React, { useState, useContext, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { NotesContext } from "../../context/providers/notes/notesContext.provider";
import { UserContext } from "../../context/providers/user/userContext.provider";
import Form from "../Form";

const AddForm = () => {
  const history = useHistory();

  const [notesDetails, setNotesDetails] = useState({
    title: "",
    text: "",
  });

  const {
    addNotes,
    handlingNotes: { isAddingNotes, notesAdded },
    notesHandlingCleanup,
  } = useContext(NotesContext);

  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotesDetails({ ...notesDetails, [name]: value });
  };

  useEffect(() => {
    return () => {
      !isAddingNotes && notesAdded && notesHandlingCleanup();
    };
  }, [isAddingNotes, notesAdded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, text } = notesDetails;
    user && addNotes({ title, text });
    setNotesDetails({
      title: "",
      text: "",
    });
  };
  return (
    <div className="px-10 py-5">
      {!isAddingNotes && notesAdded && (
        <div className="w-full px-1 py-2 my-2 bg-green-700 text-white uppercase text-center">
          Notes Added
        </div>
      )}
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loadingText="Adding Notes"
        submitText="Add Notes"
        user={user}
        isHandlingNotes={isAddingNotes}
        values={notesDetails}
      />
    </div>
  );
};

export default AddForm;
