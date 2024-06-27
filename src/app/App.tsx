import appConfig from "@/configs/app.config";
import { router } from "@/routes/Router";
import store from "@/store/store";
import ThemeProvider from "@/theme/Theme";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

const clientId = appConfig.googleClientId;

function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          <GoogleOAuthProvider clientId={clientId}>
            <RouterProvider router={router} />
          </GoogleOAuthProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
