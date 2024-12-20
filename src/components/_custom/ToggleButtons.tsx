import React from "react";

// Component imports
import { TextStyled } from "styled/StyledTypography";
import {
    StyledToggleButton,
    StyledToggleButtonGroup,
} from "styled/StyledToggleButtons";

// MUI imports
import { ToggleButtonProps, ToggleButtonGroupProps } from "@mui/material";

export interface CustomToggleButtonProps extends ToggleButtonProps {
    icon?: React.ReactNode;
    label?: React.ReactNode;
    padding?: number;
    highlightOnHover?: boolean;
}

export function ToggleButton(props: CustomToggleButtonProps) {
    const { icon, label } = props;

    return (
        <StyledToggleButton {...props}>
            {icon}
            <TextStyled variant="body2" sx={{ textTransform: "none" }}>
                {label}
            </TextStyled>
        </StyledToggleButton>
    );
}

export interface ToggleButtonsProps extends ToggleButtonGroupProps {
    buttons: CustomToggleButtonProps[];
    spacing?: number;
    padding?: number;
    highlightOnHover?: boolean;
}

function ToggleButtons(props: ToggleButtonsProps) {
    const { buttons, highlightOnHover = true } = props;

    return (
        <StyledToggleButtonGroup {...props}>
            {buttons.map((button, index) => (
                <ToggleButton
                    key={index}
                    highlightOnHover={highlightOnHover}
                    {...button}
                />
            ))}
        </StyledToggleButtonGroup>
    );
}

export default ToggleButtons;
