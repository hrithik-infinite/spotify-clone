"use client";

const { MyUserContextProvider } = require("@/hooks/useUser");

const UserProvider = ({ children }) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider;
