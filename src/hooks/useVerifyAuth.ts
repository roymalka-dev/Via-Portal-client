/* eslint-disable react-hooks/exhaustive-deps */
import ApiService from "@/services/ApiService";
import { logout } from "@/store/slices/auth.slice";
import { RootState } from "@/store/store";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useVerifyAuth = () => {
  const TIME_TO_VERIFY_AUTH_IN_MIN = 30;
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (isAuthenticated) {
          await ApiService.get(`/user/verify`);
        }
      } catch (err) {
        console.error("Error verifying user: ", err);
        dispatch(logout());
        navigate("/auth/login");
      }
    };

    // Call verifyUser immediately and then every 5 minutes
    verifyUser();
    const intervalId = setInterval(
      verifyUser,
      TIME_TO_VERIFY_AUTH_IN_MIN * 60 * 1000
    );

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [TIME_TO_VERIFY_AUTH_IN_MIN, navigate, isAuthenticated]);

  return {};
};

export default useVerifyAuth;
