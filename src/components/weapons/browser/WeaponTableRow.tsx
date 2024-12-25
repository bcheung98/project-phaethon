import parse from "html-react-parser";

// Component imports
import Image from "custom/Image";
import RouterLink from "components/nav/RouterLink";
import { StyledTableRow, StyledTableCell } from "styled/StyledTable";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme } from "@mui/material";

// Helper imports
import { combineStyles } from "helpers/utils";

// Type imports
import { WeaponRow } from "./WeaponTable";

interface WeaponTableRowProps extends WeaponRow {
    signature: string;
    signatureFullName: string;
    mainStat: string;
    subStat: string;
}

function WeaponTableRow({ row }: { row: WeaponTableRowProps }) {
    const theme = useTheme();

    const columns = [
        {
            label: row.displayName,
            labelStyle: {
                cursor: "pointer",
                "&:hover": {
                    color: theme.text.selected,
                    textDecoration: "underline",
                },
            },
            img: `w-engines/${row.name}`,
            imgStyle: {
                width: "48px",
                height: "auto",
                cursor: "pointer",
            },
            href: `/w-engines/${row.name.split(" ").join("_").toLowerCase()}`,
        },
        {
            img: `ranks/item/${row.rarity}`,
            imgStyle: {
                width: "40px",
                height: "40px",
            },
        },
        {
            label: row.specialty,
            img: `specialties/${row.specialty}`,
        },
        {
            label:
                row.signatureFullName !== "_" ? row.signatureFullName : "---",
            labelStyle:
                row.signature !== "_"
                    ? {
                          cursor: "pointer",
                          "&:hover": {
                              color: `rgb(30, 175, 255)`,
                              textDecoration: "underline",
                          },
                      }
                    : { marginLeft: "0px" },
            img:
                row.signature !== "_"
                    ? `characters/avatars/${row.signature}`
                    : null,
            imgStyle: {
                width: "48px",
                height: "auto",
                cursor: "pointer",
            },
            href:
                row.signature !== "_"
                    ? `/agents/${row.signature
                          .split(" ")
                          .join("_")
                          .toLowerCase()}`
                    : "",
        },
        {
            label: row.mainStat,
            labelStyle: { marginLeft: "0px" },
        },
        {
            label: row.subStat,
            labelStyle: { marginLeft: "0px" },
        },
    ];

    return (
        <StyledTableRow color="secondary" hover>
            {columns.map((col, index) => (
                <StyledTableCell key={index}>
                    <FlexBox columnGap="8px">
                        {col.img && (
                            <RouterLink
                                to={col.href || ""}
                                sx={{
                                    cursor: col.href ? "pointer" : "default",
                                    userSelect: col.href
                                        ? "pointer"
                                        : "default",
                                }}
                            >
                                <Image
                                    src={col.img}
                                    alt={col.label}
                                    style={combineStyles(
                                        {
                                            width: "32px",
                                            height: "32px",
                                        },
                                        col.imgStyle
                                    )}
                                />
                            </RouterLink>
                        )}
                        {col.label && (
                            <RouterLink
                                to={col.href || ""}
                                sx={{
                                    cursor: col.href ? "pointer" : "text",
                                    userSelect: col.href ? "pointer" : "text",
                                }}
                            >
                                <TextStyled
                                    sx={combineStyles(
                                        {
                                            marginLeft: "8px",
                                            textAlign: "left",
                                        },
                                        col.labelStyle
                                    )}
                                >
                                    {parse(col.label)}
                                </TextStyled>
                            </RouterLink>
                        )}
                    </FlexBox>
                </StyledTableCell>
            ))}
        </StyledTableRow>
    );
}

export default WeaponTableRow;
