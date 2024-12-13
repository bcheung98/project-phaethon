import VersionHighlights from "./VersionHighlights";
import { TextStyled } from "styled/StyledTypography";
import { Card } from "@mui/material";

function Home() {
    document.title = `Zenless Zone Zero ${import.meta.env.VITE_DOCUMENT_TITLE}`;

    return (
        <>
            <Card
                sx={(theme) => ({
                    backgroundColor: theme.background(3),
                    mb: "20px",
                    p: "25px",
                })}
            >
                <TextStyled>
                    Hello! This site is currently WIP. Features may be missing
                    or broken.
                </TextStyled>
            </Card>
            <VersionHighlights />
        </>
    );
}

export default Home;
