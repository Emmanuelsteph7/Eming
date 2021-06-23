import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const myContext = createContext();

const GeneralContext = (props) => {
  const [userData, setUserData] = useState({
    userLogin: false,
    data: {},
    loading: true,
  });

  useEffect(() => {
    axios
      .get("https://eming.herokuapp.com/getUser", { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setUserData(() => ({
            userLogin: true,
            data: res.data,
            loading: false,
          }));
        } else {
          setUserData(() => ({
            userLogin: false,
            data: {},
            loading: false,
          }));
        }
      });
  }, []);

  const logout = async () => {
    const res = await axios.get("https://eming.herokuapp.com/auth/logout", {
      withCredentials: true,
    });

    if (res.data) {
      console.log("hi");
      console.log(res.data);
      setUserData(() => ({
        userLogin: false,
        data: {},
        loading: false,
      }));
      window.location.href = "/";
    }
  };

  return (
    <myContext.Provider value={{ userData, logout }}>
      {props.children}
    </myContext.Provider>
  );
};

export default GeneralContext;
