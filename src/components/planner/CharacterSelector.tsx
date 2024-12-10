import React from "react";

// Component imports
import Image from "custom/Image";
import SearchBar from "custom/SearchBar";
import { FlexBox } from "styled/StyledBox";
import { StyledMenuItem } from "styled/StyledMenu";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Autocomplete, Box, Card } from "@mui/material";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";
import { getSelectedCharacters, setPlannerCharacters } from "reducers/planner";
import { getRarityColor } from "helpers/rarityColors";

// Type imports
import { Character } from "types/character";
import { CharacterCostObject } from "types/costs";

function CharacterSelector() {
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const characters = [...useAppSelector(selectCharacters)].sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
    );
    const options = React.useMemo(
        () => createOptions(characters),
        [JSON.stringify(characters)]
    );

    const smallIconStyle = { width: "20px", height: "20px" };

    return (
        <Autocomplete
            multiple
            autoComplete
            disableCloseOnSelect
            filterSelectedOptions
            options={options}
            getOptionLabel={(option) => option.fullName}
            filterOptions={(options, { inputValue }) =>
                options.filter(
                    (option) =>
                        option.name
                            .toLocaleLowerCase()
                            .includes(inputValue.toLocaleLowerCase()) ||
                        option.fullName
                            .toLocaleLowerCase()
                            .includes(inputValue.toLocaleLowerCase())
                )
            }
            noOptionsText="No Agents"
            value={useAppSelector(getSelectedCharacters)}
            onChange={(_: any, newValue: CharacterCostObject[] | null) =>
                dispatch(
                    setPlannerCharacters(newValue as CharacterCostObject[])
                )
            }
            renderInput={(params) => (
                <SearchBar
                    params={params}
                    placeholder="Agents"
                    inputIcon={
                        <Image
                            src="icons/Characters"
                            alt="Agents"
                            style={{ width: "32px", marginLeft: "5px" }}
                        />
                    }
                />
            )}
            renderOption={(props, option) => (
                <StyledMenuItem
                    {...props}
                    key={option.fullName}
                    sx={{
                        "&:hover": {
                            backgroundColor: theme.menu.selectedHover,
                        },
                        "&:not(:last-child)": {
                            borderBottom: `1px solid ${theme.border.color}`,
                        },
                    }}
                >
                    <FlexBox>
                        <Box sx={{ mr: "5px", mt: "6px" }}>
                            <Box>
                                <Image
                                    src={`elements/${option.element}`}
                                    alt={option.element}
                                    style={smallIconStyle}
                                    tooltip={option.element}
                                />
                            </Box>
                            <Box>
                                <Image
                                    src={`specialties/${option.specialty}`}
                                    alt={option.specialty}
                                    style={smallIconStyle}
                                    tooltip={option.specialty}
                                />
                            </Box>
                        </Box>
                        <Card
                            sx={{
                                width: "38px",
                                height: "48px",
                                border: `2px solid ${getRarityColor(
                                    option.rarity
                                )}`,
                                borderRadius: "5px",
                                backgroundColor: theme.background(8),
                                mr: "20px",
                                transform: "skewX(15deg) translate(7px)",
                            }}
                        >
                            <Image
                                src={`characters/avatars/${option.name}`}
                                alt={option.name}
                                style={{
                                    width: "48px",
                                    transform: "skewX(-15deg) translate(-7px)",
                                }}
                            />
                        </Card>
                        <TextStyled noWrap>{option.fullName}</TextStyled>
                    </FlexBox>
                </StyledMenuItem>
            )}
            slotProps={{
                chip: {
                    sx: {
                        backgroundColor: theme.background(8),
                        color: theme.text.main,
                        fontFamily: theme.font.styled.family,
                        "& .MuiChip-deleteIcon": {
                            color: theme.text.main,
                            ":hover": {
                                color: theme.text.description,
                            },
                        },
                    },
                },
                listbox: {
                    sx: { p: 0 },
                },
                paper: {
                    sx: {
                        backgroundColor: theme.menu.default,
                        borderRadius: "5px",
                    },
                },
                popper: {
                    sx: { zIndex: theme.zIndex.appBar - 1 },
                },
            }}
        />
    );
}

export default CharacterSelector;

function createOptions(characters: Character[]) {
    return characters.map(
        (char) =>
            ({
                name: char.name,
                fullName: char.fullName,
                rarity: char.rarity,
                element: char.element,
                specialty: char.specialty,
                colors: char.colors,
                costs: {
                    // Source of each material is mapped to a specific index in the array:
                    // [Level, Basic, Dodge, Assist, Special, Chain, Core]
                    credits: [0, 0, 0, 0, 0, 0, 0],
                    characterXP: {
                        characterXP1: [0, 0, 0, 0, 0, 0, 0],
                        characterXP2: [0, 0, 0, 0, 0, 0, 0],
                        characterXP3: [0, 0, 0, 0, 0, 0, 0],
                    },
                    bossMat: {
                        [`${char.materials.bossMat}`]: [0, 0, 0, 0, 0, 0, 0],
                    },
                    weeklyBossMat: {
                        [`${char.materials.weeklyBossMat}`]: [
                            0, 0, 0, 0, 0, 0, 0,
                        ],
                    },
                    hamsterCagePass: [0, 0, 0, 0, 0, 0, 0],
                    characterAscension: {
                        [`${char.specialty}1`]: [0, 0, 0, 0, 0, 0, 0],
                        [`${char.specialty}2`]: [0, 0, 0, 0, 0, 0, 0],
                        [`${char.specialty}3`]: [0, 0, 0, 0, 0, 0, 0],
                    },
                    characterSkill: {
                        [`${char.element}1`]: [0, 0, 0, 0, 0, 0, 0],
                        [`${char.element}2`]: [0, 0, 0, 0, 0, 0, 0],
                        [`${char.element}3`]: [0, 0, 0, 0, 0, 0, 0],
                    },
                },
            } as CharacterCostObject)
    );
}