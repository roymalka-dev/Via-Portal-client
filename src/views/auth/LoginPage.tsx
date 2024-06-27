/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Container, Box, Paper } from "@mui/material";
import {
  setAuthorizations,
  setDetails,
  setIsAuthenticated,
  setToken,
} from "@/store/slices/auth.slice";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import appConfig from "@/configs/app.config";
//import logo from "@/assets/images/Via_logo.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useFetch from "@/hooks/useFetch";
import { Iuser } from "@/types/auth.types";

/**
 * Component for the authentication page.
 * This page allows users to log in using Google authentication.
 * Upon successful authentication, it fetches user details from the server and sets user credentials and authorization in the Redux store.
 * Redirects the user to the authenticated entry path upon successful authentication.
 */
const AuthPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();
  const { data, status, refetch } = useFetch<Iuser>(
    "user/get-user-details",
    "GET",
    {},
    [],
    true // manual
  );

  const [urlParams] = useSearchParams();
  const redirectUrl = urlParams.get("redirect") || "";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(appConfig.authenticatedEntryPath);
    }
  }, [isAuthenticated]);

  /**
   * Function to set user credentials and trigger a data refetch.
   * @param {string} credential - User credential/token received from authentication.
   */
  const setUserAuthorization = async (credential: string) => {
    dispatch(setToken(credential));
    await refetch();
  };

  /**
   * Effect hook to handle user authentication status.
   * If authentication is successful and user details are fetched, sets user authorization in the Redux store and redirects the user to the authenticated entry path.
   */
  useEffect(() => {
    if (status === "success" && data) {
      dispatch(setAuthorizations(data.authorizations || ["USER"]));
      dispatch(setDetails(data));
      dispatch(setIsAuthenticated(true));
      navigate(redirectUrl);
    }

    if (status === "error") {
      setUserAuthorization("not valid");
    }
  }, [data, dispatch, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          mt: 10,
          mb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          padding: (theme) => theme.spacing(3),
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* 
          <Box sx={{ mb: 16, width: 250, maxWidth: "100%" }}>
            <img
              src={logo}
              alt="logo"
              style={{ width: "100%", height: "auto" }}
            />
                  </Box>
                  */}

          <Box sx={{ mb: 10 }}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                setUserAuthorization(
                  credentialResponse.credential || "not-valid-token"
                );
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthPage;
