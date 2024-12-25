import React from "react";
import { BrowserRouter } from "react-router";
import "App.css";

// Component imports
import RouteConfig from "components/nav/RouteConfig";

// MUI imports
import { CssBaseline, ThemeProvider } from "@mui/material";

// Helper imports
import {
    fetchCharacters,
    fetchWeapons,
    fetchBangboos,
    fetchDriveDiscs,
    fetchCharacterBanners,
    fetchWeaponBanners,
} from "rtk/fetchData";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectTheme, setTheme } from "reducers/settings";
import { getTheme } from "themes/theme";

function App() {
    const dispatch = useAppDispatch();

    const theme = useAppSelector(selectTheme).name;

    React.useEffect(() => {
        dispatch(setTheme(theme));
        dispatch(fetchCharacters());
        dispatch(fetchWeapons());
        dispatch(fetchBangboos());
        dispatch(fetchDriveDiscs());
        dispatch(fetchCharacterBanners());
        dispatch(fetchWeaponBanners());
    });

    return (
        <BrowserRouter>
            <ThemeProvider theme={getTheme(theme)}>
                <CssBaseline />
                <RouteConfig />
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
