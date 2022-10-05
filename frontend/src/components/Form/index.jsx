import React from "react";
import Spinner from "../Spinner";

const Form = ({
  handleSubmit,
  handleChange,
  loadingText,
  submitText,
  user,
  isHandlingNotes,
  values,
}) => {
  const { title, text } = values;
  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      {isHandlingNotes ? (
        <div className="bg-slate-800 h-48 grid place-content-center rounded">
          <Spinner />
          <span className="text-white mt-4 font-mono">{loadingText}...</span>
        </div>
      ) : (
        <React.Fragment>
          <div className="flex flex-col w-full justify-center">
            <label
              htmlFor="description"
              className="text-lg text-white font-medium"
            >
              Type your Notes...
            </label>
            <input
              className="bg-slate-700 my-2 text-white outline-none p-2 focus:ring-1 focus:ring-purple-500 rounded"
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Title"
              value={title}
              required
            />
            <textarea
              name="text"
              id="text"
              rows="10"
              onChange={handleChange}
              value={text}
              placeholder="Description"
              className="bg-slate-700 my-2 text-white outline-none p-2 focus:ring-1 focus:ring-purple-500 rounded"
            ></textarea>
          </div>
          <button
            type="submit"
            className="text-white bg-purple-800 px-2 py-2 rounded w-full disabled:bg-purple-500"
            disabled={user ? false : true}
          >
            {user ? submitText : "Login Required to add/update notes"}
          </button>
        </React.Fragment>
      )}
    </form>
  );
};

export default Form;
