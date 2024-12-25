import React from "react";

// Component imports
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

// MUI imports
import { useTheme, useMediaQuery, Theme, SxProps } from "@mui/material";

function Nav() {
    const theme = useTheme();
    const matches_up_md = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <>
            {matches_up_md ? (
                <NavDesktop navItems={navItems} linkItems={linkItems} />
            ) : (
                <NavMobile navItems={navItems} linkItems={linkItems} />
            )}
        </>
    );
}

export default Nav;

export interface NavProps {
    navItems: NavItem[];
    linkItems: NavItem[];
}

export interface NavItem {
    icon: string;
    text: string;
    link: string;
}

const navItems: NavItem[] = [
    {
        icon: "icons/Home",
        text: "Home",
        link: "/",
    },
    {
        icon: "icons/Agents",
        text: "Agents",
        link: "/agents/",
    },
    {
        icon: "icons/W-Engine",
        text: "W-Engines",
        link: "/w-engines/",
    },
    {
        icon: "icons/Drive_Disc",
        text: "Drive Discs",
        link: "/drive-discs/",
    },
    {
        icon: "icons/Bangboo",
        text: "Bangboos",
        link: "/bangboos/",
    },
    {
        icon: "icons/Check",
        text: "Ascension Planner",
        link: "/planner/",
    },
    {
        icon: "icons/Signal_Search",
        text: "Banner Archive",
        link: "/banners/",
    },
];

const linkItems: NavItem[] = [
    {
        icon: "https://assets.irminsul.gg/main/game-icons/Genshin.png",
        text: "Genshin Impact",
        link: "https://genshin.irminsul.gg/",
    },
    {
        icon: "https://assets.irminsul.gg/main/game-icons/HSR.png",
        text: "Honkai: Star Rail",
        link: "https://hsr.irminsul.gg/",
    },
    {
        icon: "https://assets.irminsul.gg/main/game-icons/WutheringWaves.png",
        text: "Wuthering Waves",
        link: "https://wuwa.irminsul.gg/",
    },
];

export const navStyles = (location: string) => ({
    navItem: (size = 32): React.CSSProperties => ({
        width: size,
        height: size,
        padding: "2px",
        color: "rgb(255, 255, 255)",
    }),
    linkItem: (size = 32): React.CSSProperties => ({
        width: size,
        height: size,
        borderRadius: "4px",
    }),
    listItem:
        (link: string, size = 32): SxProps<Theme> =>
        () => ({
            display: link !== "" ? "block" : "none",
            px: `${(size * 2) / 8}px`,
            color: "white",
        }),
    listIcon:
        (open: boolean, size = 32): SxProps<Theme> =>
        () => ({
            minWidth: size,
            width: size,
            height: size,
            p: "4px",
            transform: open ? "rotateZ(-180deg)" : "rotateZ(0deg)",
            transition: "transform 0.25s",
        }),
    listItemButton:
        (link = "", size = 32): SxProps<Theme> =>
        (theme) => ({
            borderRadius: "4px",
            justifyContent: "left",
            px: `${(size * 2) / 8}px`,
            width: "100%",
            height: `${size * 1.5}px`,
            color: theme.appbar.color,
            backgroundColor:
                link === location
                    ? theme.appbar.hover
                    : theme.appbar.backgroundColor,
            "&:hover": {
                backgroundColor:
                    link === location
                        ? theme.appbar.selectedHover
                        : theme.appbar.hover,
            },
            "&:active": {
                backgroundColor: theme.appbar.selectedHover,
            },
        }),
    listItemText:
        (open = true, link = ""): SxProps<Theme> =>
        (theme) => ({
            display: open ? "block" : "none",
            ml: "20px",
            color: link === location ? theme.text.selected : theme.appbar.color,
        }),
});
