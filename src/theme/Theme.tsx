import React, { useMemo } from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  CssBaseline,
} from "@mui/material";
import { useSelector } from "react-redux";
import { darkPalette, lightPalette } from "./palette";
import { ThemeProviderProps } from "@/types/theme.types";
import { RootState } from "@/store/store";
import { typography } from "./typography";
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: themeMode === "light" ? lightPalette : darkPalette,
        typography,
      }),
    [themeMode]
  );

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
