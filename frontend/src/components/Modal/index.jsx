import React, { useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";

const Modal = ({
  showModal,
  title,
  setShowModal,
  body,
  primary,
  primaryAction,
}) => {
  useEffect(() => {
    if (showModal) {
      document.body.style.overflowY = "hidden";
    }
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [showModal]);
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-800 text-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{title}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <MdOutlineClose />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto max-h-56 overflow-y-scroll">
                  {body}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t space-x-2 border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-600 border-red-600 border-2 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  {primary && (
                    <button
                      className="bg-purple-700 text-white active:bg-purple-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        primaryAction();
                        setShowModal(false);
                      }}
                    >
                      {primary}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
