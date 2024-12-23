import React from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import StatsTable from "custom/StatsTable";
import ToggleButtons from "custom/ToggleButtons";
import { skillDisplayButtons } from "components/Settings";

// Type imports
import { BangbooProps } from "types/bangboo";
import { selectSkillDisplay, SkillDisplay } from "reducers/settings";
import { useAppSelector } from "helpers/hooks";

function BangbooStatsTable({ bangboo }: BangbooProps) {
    const { stats } = bangboo;

    const currentSkillDisplay = useAppSelector(selectSkillDisplay).mode;
    const [mode, setMode] = React.useState<SkillDisplay>(currentSkillDisplay);
    const handleMode = (_: React.BaseSyntheticEvent, newView: SkillDisplay) => {
        if (newView !== null) {
            setMode(newView);
        }
    };

    const levels = [
        "1",
        "10",
        "10+",
        "20",
        "20+",
        "30",
        "30+",
        "40",
        "40+",
        "50",
        "50+",
        "60",
    ];

    const data = [
        ["Level", ...levels],
        [
            "Base HP",
            ...levels.map((_, index) => stats.hp[index].toLocaleString() || 0),
        ],
        [
            "Base ATK",
            ...levels.map((_, index) => stats.atk[index].toLocaleString() || 0),
        ],
        [
            "Base DEF",
            ...levels.map((_, index) => stats.def[index].toLocaleString() || 0),
        ],
        [
            "Crit Rate",
            ...levels.map((_, index) => `${stats.critRate[index]}%` || 0),
        ],
        [
            "Crit DMG",
            ...levels.map((_, index) => `${stats.critDMG[index]}%` || 0),
        ],
        [
            "Anomaly Mastery",
            ...levels.map((_, index) => stats.anomalyMastery[index] || 0),
        ],
    ];

    React.useEffect(() => {
        setMode(currentSkillDisplay);
    }, [currentSkillDisplay]);

    return (
        <MainContentBox
            title="Stats"
            actions={
                <ToggleButtons
                    buttons={skillDisplayButtons}
                    value={mode}
                    exclusive
                    onChange={handleMode}
                    spacing={0}
                    padding={10}
                    highlightOnHover={false}
                />
            }
        >
            <StatsTable
                mode={mode}
                levels={levels}
                data={data}
                orientation="column"
                sliderProps={{
                    sx: {
                        minWidth: "100px",
                        maxWidth: "50%",
                        ml: "10px",
                    },
                }}
                tableProps={{
                    sx: {
                        width:
                            mode === "slider"
                                ? { xs: "100%", sm: "50%" }
                                : "100%",
                    },
                }}
            />
        </MainContentBox>
    );
}

export default BangbooStatsTable;