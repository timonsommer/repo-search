import { PropsWithChildren, createContext, useState } from "react";

type UserContextState = {
  username: string;
  setUsername: (username: string) => void;
};

export const UserContext = createContext<UserContextState>(
  {} as UserContextState,
);

export function UserContextProvider({ children }: PropsWithChildren) {
  const [username, setUsername] = useState<string>("");
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}
