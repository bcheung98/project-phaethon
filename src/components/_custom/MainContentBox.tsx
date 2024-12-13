import React from "react";

// Component imports
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Card, AppBar, Box } from "@mui/material";

interface MainContentBoxProps {
    children?: React.ReactNode;
    title?: React.ReactNode;
    actions?: React.ReactNode;
    titleLineHeight?: string | number;
    contentPadding?: string | number;
    component?: React.ElementType;
}

function MainContentBox({
    children,
    title,
    actions,
    titleLineHeight = "45px",
    contentPadding = "25px",
    component = "div",
}: MainContentBoxProps) {
    const theme = useTheme();

    return (
        <Card
            sx={{
                backgroundColor: theme.background(3),
                border: theme.mainContentBox.border,
                borderRadius: theme.mainContentBox.borderRadius,
            }}
        >
            <AppBar
                position="static"
                sx={{
                    minHeight: "70px",
                    p: "10px 20px",
                }}
            >
                <FlexBox flexWrap="wrap" justifyContent="space-between">
                    <TextStyled
                        variant="h6"
                        sx={{ lineHeight: titleLineHeight }}
                    >
                        {title && title}
                    </TextStyled>
                    {actions && actions}
                </FlexBox>
            </AppBar>
            <Box sx={{ p: contentPadding }} component={component}>
                {children && children}
            </Box>
        </Card>
    );
}

export default MainContentBox;
