import {
    CustomToggleButtonProps,
    ToggleButtonsProps,
} from "custom/ToggleButtons";

// MUI imports
import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";

export const StyledToggleButton = styled(
    (props: CustomToggleButtonProps) => (
        <ToggleButton disableRipple {...props} />
    ),
    { shouldForwardProp: (prop) => prop !== "highlightOnHover" }
)(({ theme, highlightOnHover }) => ({
    "&.MuiToggleButton-root": {
        opacity: 0.4,
        color: theme.text.main,
        "&:hover": {
            backgroundColor: theme.menu.hover,
            borderColor: highlightOnHover
                ? theme.border.highlight
                : theme.border.color,
            boxShadow: highlightOnHover
                ? `0 0 4px 1px ${theme.border.highlight}`
                : "none",
        },
    },
}));

export const StyledToggleButtonGroup = styled(
    (props: ToggleButtonsProps) => <ToggleButtonGroup {...props} />,
    { shouldForwardProp: (prop) => prop !== "highlightOnHover" }
)(({ theme, spacing, padding = 4 }) => ({
    flexWrap: "wrap",
    "& .MuiToggleButtonGroup-grouped": {
        padding: `${padding}px`,
        margin: spacing ? `${spacing}px !important` : "0px",
        border: spacing
            ? `1px solid ${theme.border.color} !important`
            : `1px solid ${theme.border.color}`,
        borderRadius: spacing ? "5px" : "none",
        backgroundColor: theme.menu.default,
        "&.Mui-selected": {
            backgroundColor: theme.menu.selected,
            opacity: 1,
            "&:hover": {
                backgroundColor: theme.menu.selectedHover,
            },
        },
    },
}));
