import { useParams } from "react-router";

// Component imports
import WeaponImage from "./WeaponImage";
import WeaponInfo from "./WeaponInfo";
import WeaponPassive from "./WeaponPassive";
import WeaponTable from "./WeaponTable";
import PageNotFound from "components/PageNotFound";

// MUI Imports
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectWeapons } from "reducers/weapon";

function WeaponPage() {
    const params = useParams<{ name: string }>();
    const weapon = useAppSelector(selectWeapons).find(
        (wep) => wep.name.split(" ").join("_").toLowerCase() === params.name
    );

    if (weapon) {
        document.title = `${weapon.displayName} ${
            import.meta.env.VITE_DOCUMENT_TITLE
        }`;

        return (
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <WeaponImage weapon={weapon} />
                </Grid>
                <Grid size="grow">
                    <WeaponInfo weapon={weapon} />
                    <WeaponPassive weapon={weapon} />
                    <WeaponTable weapon={weapon} />
                </Grid>
            </Grid>
        );
    } else {
        return <PageNotFound />;
    }
}

export default WeaponPage;
