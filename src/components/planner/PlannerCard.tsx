// Component imports
import CharacterSliders from "./CharacterSliders";
import WeaponSliders from "./WeaponSliders";
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import MaterialImage from "custom/MaterialImage";
import Dropdown from "custom/Dropdown";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";
import { StyledTooltip } from "styled/StyledTooltip";

// MUI imports
import {
    useTheme,
    Divider,
    IconButton,
    Stack,
    ButtonBase,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import {
    getSelectedCharacters,
    getSelectedWeapons,
    setPlannerCharacters,
    setPlannerWeapons,
} from "reducers/planner";
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";
import {
    createMaterialCostData,
    reduceMaterialCosts,
} from "helpers/createMaterialCostData";

// Type imports
import {
    CharacterCostObject,
    TotalCostObject,
    WeaponCost,
    WeaponCostObject,
} from "types/costs";
import { Element } from "types/_common";

interface PlannerCardProps {
    data: CharacterCostObject | WeaponCostObject;
}

function PlannerCard({ data }: PlannerCardProps) {
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const characters = useAppSelector(getSelectedCharacters);
    const weapons = useAppSelector(getSelectedWeapons);

    const { name, rarity, specialty } = data;

    let variant: "character" | "weapon";
    let title: string,
        element: Element | undefined,
        imgSrc: string,
        route: "agents" | "w-engines",
        costs: TotalCostObject | WeaponCost;

    if ("element" in data) {
        variant = "character";
        title = data.fullName;
        element = data.element;
        imgSrc = `characters/icons/${name}`;
        route = "agents";
        costs = reduceMaterialCosts(data.costs);
    } else {
        variant = "weapon";
        title = data.displayName;
        imgSrc = `w-engines/${name}`;
        route = "w-engines";
        costs = data.costs;
    }

    const handleDelete = () => {
        if (variant === "character") {
            const newValues = characters.filter((char) => char.name !== name);
            dispatch(setPlannerCharacters(newValues));
        } else {
            const newValues = weapons.filter((wep) => wep.name !== name);
            dispatch(setPlannerWeapons(newValues));
        }
    };

    return (
        <MainContentBox
            title={
                <FlexBox>
                    <ButtonBase
                        disableRipple
                        href={`/${route}/${name
                            .split(" ")
                            .join("_")
                            .toLowerCase()}`}
                        target="_blank"
                    >
                        <Image
                            src={imgSrc}
                            alt={name}
                            style={{
                                width: "56px",
                                border: `2px solid ${getRarityColor(rarity)}`,
                                borderRadius: "10px",
                                marginRight: "15px",
                                padding:
                                    variant === "character" ? "0px" : "4px",
                                backgroundColor:
                                    variant === "character"
                                        ? theme.background(3)
                                        : theme.background(8),
                                boxShadow:
                                    variant === "character"
                                        ? "none"
                                        : `inset 0 0 28px 4px ${getBackgroundColor(
                                              rarity
                                          )}`,
                            }}
                        />
                    </ButtonBase>
                    <Stack spacing={1}>
                        <ButtonBase
                            disableRipple
                            href={`/${route}/${name
                                .split(" ")
                                .join("_")
                                .toLowerCase()}`}
                            target="_blank"
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    color: `rgb(30, 175, 255)`,
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            {title}
                        </ButtonBase>
                        <Stack direction="row" spacing={0.5}>
                            {element && (
                                <Image
                                    src={`elements/${element}`}
                                    alt={element}
                                    style={{ width: "20px" }}
                                    tooltip={element}
                                />
                            )}
                            <Image
                                src={`specialties/${specialty}`}
                                alt={specialty}
                                style={{ width: "20px" }}
                                tooltip={specialty}
                            />
                        </Stack>
                    </Stack>
                </FlexBox>
            }
            actions={
                <IconButton onClick={handleDelete}>
                    <StyledTooltip title="Delete" arrow placement="top">
                        <DeleteIcon />
                    </StyledTooltip>
                </IconButton>
            }
            titleLineHeight="100%"
            contentPadding="20px"
        >
            <TextStyled>Materials Required</TextStyled>
            <Grid container spacing={2} sx={{ mt: "15px" }}>
                {createMaterialCostData(costs as TotalCostObject).map(
                    (material, index) => (
                        <MaterialImage
                            key={index}
                            name={material.name}
                            rarity={material.rarity}
                            cost={material.cost}
                            imgSrc={material.img}
                            size="64px"
                        />
                    )
                )}
            </Grid>
            <Divider sx={{ my: "15px" }} />
            <Dropdown title="Edit" contentPadding="5px 25px 25px">
                {"element" in data ? (
                    <CharacterSliders character={data} />
                ) : (
                    <WeaponSliders weapon={data} />
                )}
            </Dropdown>
        </MainContentBox>
    );
}

export default PlannerCard;
