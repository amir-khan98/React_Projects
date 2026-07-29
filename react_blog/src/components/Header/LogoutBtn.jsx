import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return;
  <Button
    className="inline-block font-light mr-2 px-2 py-2 text-[19px]  duration-200 bg-blue-500 hover:bg-blue-300 text-white rounded-full"
    onClick={logoutHandler}
  >
    LogOut
  </Button>;
}

export default LogoutBtn;
