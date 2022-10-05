import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { NotesContext } from "../../context/providers/notes/notesContext.provider";
import Modal from "../Modal";
import { UserContext } from "../../context/providers/user/userContext.provider";

import Form from "../Form";

const NotesItem = ({ notesItem }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [notesDetails, setNotesDetails] = useState({
    title: notesItem.title,
    text: notesItem.text,
  });

  const {
    updateNotes,
    removeNotes,
    handlingNotes: { isUpdatingNotes, notesUpdated },
    notesHandlingCleanup,
  } = useContext(NotesContext);
  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotesDetails({ ...notesDetails, [name]: value });
  };

  useEffect(() => {
    !isUpdatingNotes && notesUpdated && setEditModal(false);
    return () => notesHandlingCleanup();
  }, [isUpdatingNotes, notesUpdated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, text } = notesDetails;
    user && updateNotes({ id: notesItem.id, title, text });
  };

  return (
    <div
      key={notesItem.id}
      className="w-full px-2 py-1 border-2 border-purple-700 bg-slate-800 text-white flex flex-col items-start space-y-2 rounded"
    >
      <div>{notesItem.title}</div>
      <div className="flex w-full items-center justify-between">
        <span className="text-gray-400">{notesItem.text}</span>
        <div className="space-x-2 flex items-center">
          <AiOutlineDelete
            onClick={() => setDeleteModal(true)}
            className="cursor-pointer"
          />
          <BiEdit
            onClick={() => setEditModal(true)}
            className="cursor-pointer"
          />
        </div>
      </div>
      <Modal
        title="Delete"
        body={`Are your sure you want to delete ${notesItem.title} ?`}
        primary={"Delete"}
        showModal={deleteModal}
        setShowModal={setDeleteModal}
        primaryAction={() => removeNotes({ id: notesItem.id })}
      />
      <Modal
        title={"Edit"}
        body={
          <Form
            loadingText="Updating Notes"
            submitText="Update Notes"
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isHandlingNotes={isUpdatingNotes}
            values={notesDetails}
            user={user}
          />
        }
        showModal={editModal}
        setShowModal={setEditModal}
      />
    </div>
  );
};

export default NotesItem;
