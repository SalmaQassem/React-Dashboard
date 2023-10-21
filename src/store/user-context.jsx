import React, { useState } from "react";

const UserContext = React.createContext({
  id: "",
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  role: "",
  created_at: "",
  updated_at: "",
  image: "",
  setUserData: (
    id,
    first_name,
    last_name,
    phone,
    email,
    role,
    created_at,
    updated_at,
    image
  ) => {},
});

export const UserContextProvider = (props) => {
  const [data, setData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    role: "",
    created_at: "",
    updated_at: "",
    image: "",
  });
  const setDataHandler = (
    id,
    first_name,
    last_name,
    phone,
    email,
    role,
    created_at,
    updated_at,
    image
  ) => {
    setData({
      id: id,
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      email: email,
      role: role,
      created_at: created_at,
      updated_at: updated_at,
      image: image,
    });
  };
  return (
    <UserContext.Provider
      value={{
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        email: data.email,
        role: data.role,
        created_at: data.created_at,
        updated_at: data.updated_at,
        image: data.image,
        setUserData: setDataHandler,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContext;
