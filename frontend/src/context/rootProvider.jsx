import { createContext } from "react";
import NotesProvider from "./providers/notes/notesContext.provider";
import UserProvider from "./providers/user/userContext.provider";

export const RootContext = createContext();

const RootProvider = ({ children }) => {
  return (
    <RootContext.Provider value={{}}>
      <NotesProvider>
        <UserProvider>{children}</UserProvider>
      </NotesProvider>
    </RootContext.Provider>
  );
};
export default RootProvider;
