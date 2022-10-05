import React, { useContext, useEffect } from "react";
import { NotesContext } from "../../context/providers/notes/notesContext.provider";
import { UserContext } from "../../context/providers/user/userContext.provider";
import NotesItem from "../NotesItem";
import Spinner from "../Spinner";

const NotesOverview = () => {
  const { notes, isFetchingNotes, getNotes } = useContext(NotesContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    user && getNotes();
  }, [user]);

  return (
    <div className="flex flex-col max-w-sm mx-auto space-y-2 py-4 px-4">
      <div className="my-2 font-bold text-xl text-white">Saved Notes</div>
      {isFetchingNotes ? (
        <div className="bg-slate-800 h-48 grid place-content-center rounded">
          <Spinner />
          <span className="text-white mt-4 font-mono">Fetching Notes...</span>
        </div>
      ) : notes?.length > 0 ? (
        notes?.map((notesItem) => {
          return <NotesItem key={notesItem.id} notesItem={notesItem} />;
        })
      ) : (
        <div className="w-full text-center font-bold text-lg text-white my-2">
          No Notes Found
        </div>
      )}
    </div>
  );
};

export default NotesOverview;
