// Component imports
import { StyledTableCell } from "styled/StyledTable";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { TableHead, TableRow, TableSortLabel } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

export type Order = "asc" | "desc";

export interface HeadColumn {
    id: string;
    label: string;
}

interface SortTableHeadProps {
    headColumns: HeadColumn[];
    order: Order;
    orderBy: string;
    onRequestSort: (event: React.BaseSyntheticEvent, property: string) => void;
}

function SortTableHead({
    headColumns,
    order,
    orderBy,
    onRequestSort,
}: SortTableHeadProps) {
    const createSortHandler =
        (property: string) => (event: React.BaseSyntheticEvent) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headColumns.map((column) => (
                    <StyledTableCell
                        key={column.id as string}
                        align="left"
                        sortDirection={orderBy === column.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : "asc"}
                            onClick={createSortHandler(column.id)}
                            IconComponent={KeyboardArrowDown}
                            sx={(theme) => ({
                                "& .MuiTableSortLabel-icon": {
                                    fill:
                                        orderBy === column.id
                                            ? theme.border.highlight
                                            : "grey",
                                    opacity: 0,
                                },
                            })}
                        >
                            <TextStyled noWrap>{column.label}</TextStyled>
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default SortTableHead;

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
