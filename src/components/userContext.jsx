import React, { createContext, useEffect, useState } from "react";
import { LoginBox } from "./small_components/loginBox";
import { loadData, saveData } from "../utils/saveLoadData";
import Cookies from "js-cookie";

export const UserContext = createContext(null);

function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [isAuth, setIsAuth] = useState(null);
  const [userData, setUserData] = useState(null);
  const singleBoardData = null;

  // ================================================
  // Check if cookies from previous login are set
  // ================================================
  const [loginToken, setLoginToken] = useState({
    username: Cookies.get("username"),
    token: Cookies.get("token"),
  });
  let prev_data;
  // ================================================
  // ================================================

  useEffect(() => {
    // Check if cookies are set and proceede with login or userData
    loginToken.username != undefined ? setIsAuth(true) : setIsAuth(false);
    loginToken.username != undefined && handleUserData(loginToken);
  }, []);

  useEffect(() => {
    if (userData && prev_data != userData) {
      prev_data = { ...userData };
      saveData(prev_data);
    }
  }, [userData]);

  const handleUserData = (loginData) => {
    loadData().then((loaded_data) => {
      // ===============================================
      // divide user profile data from actiual boards data
      // ================================================
      let loadedUserData = { ...loaded_data[0] };
      delete loadedUserData["data"];
      setUserInfo(loadedUserData);
      // ================================================
      // ================================================

      // ================================================
      // boards data separated from user data
      // ================================================
      let newData = { ...loaded_data[0].data };
      setUserData(Object.values(newData));
      // ================================================
      // ================================================

      // ================================================
      // I went with cookies instead of session or token
      // beause it is much easier and has no barring on
      // functionality of the rest of the app
      // ================================================
      Cookies.set("username", loginData.username);
      Cookies.set("token", loginData.password);
      // ================================================
      // ================================================

      // ================================================
      // Set states and proceede
      // ================================================
      setIsAuth(true);
      setLoginToken(loginData);
      prev_data = newData;
      // ================================================
      // ================================================
    });
  };
  const login = (loginData) => {
    // Here would go login logic and checks
    handleUserData(loginData);
  };

  const loadAndParseUserData = () => {};

  const logout = () => {
    setIsAuth(false);
    Cookies.remove("username");
    Cookies.remove("token");
    location.reload();
  };

  const value = {
    userInfo,
    setUserInfo,
    isAuth,
    setIsAuth,
    userData,
    setUserData,
    singleBoardData,
    login,
    logout,
  };
  return (
    <>
      {isAuth === false && <LoginBox callback={login} />}
      {isAuth === true && (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
      )}
    </>
  );
}

export default UserContextProvider;
