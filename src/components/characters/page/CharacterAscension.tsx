import React from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import MaterialImage from "custom/MaterialImage";
import { StyledSlider } from "styled/StyledSlider";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { characterColors } from "helpers/characterColors";
import { getCharacterLevelCost } from "helpers/getLevelUpCosts";
import { createMaterialCostData } from "helpers/createMaterialCostData";

// Type imports
import { CharacterColors, CharacterProps } from "types/character";
import { CharacterAscensionMaterial } from "types/materials";
import { TotalCostObject } from "types/costs";

const threshold = "@250";

function CharacterAscension({ character }: CharacterProps) {
    const theme = useTheme();
    const matches_sm_dn = useMediaQuery(theme.breakpoints.down("sm"));

    const { colors, element, specialty } = character;

    const getCharacterColor = (option: keyof CharacterColors) =>
        characterColors(colors, option, element);

    const levels = ["10", "20", "30", "40", "50", "60"];

    const minDistance = 1;
    const maxValue = levels.length;
    const [sliderValue, setSliderValue] = React.useState([1, maxValue]);
    const handleSliderChange = (
        _: Event,
        newValue: number | number[],
        activeThumb: number
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], maxValue - minDistance);
                setSliderValue([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance + 1);
                setSliderValue([clamped - minDistance, clamped]);
            }
        } else {
            setSliderValue(newValue);
        }
    };

    const marks = levels.map((level, index) => ({
        value: index + 1,
        label: (
            <TextStyled
                variant={sliderValue.includes(index + 1) ? "body1" : "body2"}
                sx={{
                    userSelect: "none",
                    opacity: sliderValue.includes(index + 1)
                        ? { "@": 0, [threshold]: 1 }
                        : { "@": 0, [threshold]: 0.25 },
                }}
            >
                {level}
            </TextStyled>
        ),
    }));

    const levelUpCost = getCharacterLevelCost(sliderValue, true, false);
    const costs = {
        credits: {
            Credit: levelUpCost.credits.Credit,
        },
        characterAscension: {
            [`${specialty}1` as CharacterAscensionMaterial]:
                levelUpCost.characterAscension.characterAscension1,
            [`${specialty}2` as CharacterAscensionMaterial]:
                levelUpCost.characterAscension.characterAscension2,
            [`${specialty}3` as CharacterAscensionMaterial]:
                levelUpCost.characterAscension.characterAscension3,
        },
    } as TotalCostObject;

    return (
        <MainContentBox title="Ascension">
            <Box
                sx={{
                    containerName: "level-slider",
                    containerType: "inline-size",
                }}
            >
                <Grid container spacing={2} sx={{ mb: "15px" }}>
                    {createMaterialCostData(costs).map((material, index) => (
                        <MaterialImage
                            key={index}
                            name={material.name}
                            rarity={material.rarity}
                            cost={material.cost}
                            imgSrc={material.img}
                            size="64px"
                        />
                    ))}
                </Grid>
                <Grid
                    container
                    spacing={3.5}
                    sx={{
                        px: {
                            "@": matches_sm_dn ? "15px" : "0px",
                            [threshold]: "15px",
                        },
                        alignItems: "center",
                        width: { sm: "100%", md: "40%" },
                    }}
                >
                    <Grid
                        size={1}
                        sx={{
                            display: { "@": "flex", [threshold]: "none" },
                            mb: "25px",
                        }}
                    >
                        <TextStyled>{levels[sliderValue[0] - 1]}</TextStyled>
                    </Grid>
                    <Grid size="grow">
                        <StyledSlider
                            value={sliderValue}
                            marks={marks}
                            min={1}
                            max={maxValue}
                            onChange={handleSliderChange}
                            disableSwap
                            size={matches_sm_dn ? "small" : "medium"}
                            sx={{ color: getCharacterColor("accent") }}
                        />
                    </Grid>
                    <Grid
                        size={1}
                        sx={{
                            display: { "@": "flex", [threshold]: "none" },
                            mb: "25px",
                        }}
                    >
                        <TextStyled>{levels[sliderValue[1] - 1]}</TextStyled>
                    </Grid>
                </Grid>
            </Box>
        </MainContentBox>
    );
}

export default CharacterAscension;