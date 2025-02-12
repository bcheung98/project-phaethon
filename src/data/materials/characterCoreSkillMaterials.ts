import {
    ExpertChallengeMaterial,
    NotoriousHuntMaterial,
} from "types/materials";

export const expertChallengeMaterials = <const>{
    "Murderous Obituary": {
        displayName: "Murderous Obituary",
        source: "Notorious - Dullahan",
    },
    "Crimson Awe": {
        displayName: "Crimson Awe",
        source: "Troublemaker - Wanted Enforcer",
    },
    "Ethereal Pursuit": {
        displayName: "Ethereal Pursuit",
        source: "Notorious - Armored Hati",
    },
    "Steel Malice": {
        displayName: "Steel Malice",
        source: "Hans - Energized",
    },
    "Destructive Advance": {
        displayName: "Destructive Advance",
        source: "Typhon Slugger",
    },
    "Falling Fist": {
        displayName: "Falling Fist",
        source: "Rampant Brute",
    },
    "Stealth Phantom": {
        displayName: "Stealth Phantom",
        source: "Doppelganger - Jane",
    },
    "Thunderous Dragon": {
        displayName: "Thunderous Dragon",
        source: "Thracian",
    },
};

export const expertChallengeMaterialNames = Object.keys(
    expertChallengeMaterials
) as ExpertChallengeMaterial[];

export const formatExpertChallengeMaterials = (
    material: ExpertChallengeMaterial
) => {
    const mat = expertChallengeMaterials[material] || {
        displayName: "",
        source: "?",
    };
    return `${mat.displayName} (${mat.source})`;
};

export const notoroiusHuntMaterials = <const>{
    "Ferocious Grip": {
        displayName: "Ferocious Grip",
        source: "Newborn Dead End Butcher",
    },
    "Living Drive": {
        displayName: "Living Drive",
        source: "Unknown Corruption Complex",
    },
    "Finale Dance Shoes": {
        displayName: "Finale Dance Shoes",
        source: "Twin Marionettes",
    },
    "Scarlet Engine": {
        displayName: "Scarlet Engine",
        source: "Corrupted Overlord - Pompey",
    },
    "Sycophant's Refinement": {
        displayName: "Sycophant's Refinement",
        source: "Sacrifice - Bringer",
    },
};

export const notoroiusHuntMaterialNames = Object.keys(
    notoroiusHuntMaterials
) as NotoriousHuntMaterial[];

export const formatNotoriousHuntMaterials = (
    material: NotoriousHuntMaterial
) => {
    const mat = notoroiusHuntMaterials[material] || {
        displayName: "",
        source: "?",
    };
    return `${mat.displayName} (${mat.source})`;
};
