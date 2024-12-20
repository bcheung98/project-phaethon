// Component imports
import Image from "custom/Image"
import { TextStyled } from "styled/StyledTypography"

// MUI imports
import { ButtonBase, CardHeader } from "@mui/material"

function Logo({ onHomePage }: { onHomePage: boolean }) {

    return (
        <ButtonBase disableRipple href={onHomePage ? "https://irminsul.gg/" : "/"}>
            <CardHeader
                avatar={<Image src="https://assets.irminsul.gg/main/icons/Irminsul.png" alt="IRMINSUL.GG" style={{ width: "48px", height: "48px" }} />}
                title={<TextStyled variant="sitename">IRMINSUL.GG</TextStyled>}
                sx={{ px: 0 }}
            />
        </ButtonBase>
    )

}

export default Logo