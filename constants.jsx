// --- Constants et Configuration ---

// Dimensions et mesures
var INCH = 72;
var DIMENSIONS = {
    cardWidth: INCH,
    sectionHeight: 18,
    titleHeight: 90,
    pageNumHeight: 18,
    margin: 36,
    spreadGutter: 12,
    startY: 225 // Header height on first page
};

// Calculs dérivés
var CARD_HEIGHT = DIMENSIONS.sectionHeight + DIMENSIONS.titleHeight + DIMENSIONS.pageNumHeight;

// Layout configuration
var LAYOUT = {
    maxSpreadsPerLine: 6,
    maxLinesPerPage: 4,
    spreadsPerPageFirstPage: 2 * 6, // 2 lines * 6 spreads
    spreadsPerPageOtherPages: 4 * 6  // 4 lines * 6 spreads
};

// Couleurs pastel prédéfinies
var PASTEL_COLORS = [
    { name: "GrayAd", rgb: [240, 240, 240] },
    { name: "Peach", rgb: [255, 223, 186] },
    { name: "Yellow", rgb: [255, 255, 186] },
    { name: "Mint", rgb: [186, 255, 201] },
    { name: "Aqua", rgb: [186, 255, 255] },
    { name: "Sky", rgb: [186, 223, 255] },
    { name: "Lavender", rgb: [201, 186, 255] },
    { name: "Lilac", rgb: [255, 186, 255] },
    { name: "Coral", rgb: [255, 204, 188] },
    { name: "Pistachio", rgb: [204, 255, 188] },
    { name: "BlueGrey", rgb: [204, 229, 255] },
    { name: "Sand", rgb: [240, 224, 200] },
    { name: "Grass", rgb: [205, 255, 195] },
    { name: "Orchid", rgb: [235, 200, 255] },
    { name: "Lime", rgb: [225, 255, 190] },
    { name: "Ice", rgb: [210, 250, 255] }
];

// Styles de texte
var TEXT_STYLES = {
    section: {
        pointSize: 6,
        justification: Justification.CENTER_ALIGN
    },
    title: {
        pointSize: 7,
        justification: Justification.CENTER_ALIGN
    },
    pageNumber: {
        pointSize: 6,
        justification: Justification.CENTER_ALIGN
    }
};

// Configuration des chemins
var PATHS = {
    templateFile: "C:/Users/noordotda/AppData/Roaming/Adobe/InDesign/Version 20.0/en_US/Scripts/Scripts Panel/flatplan-generator/masters/example.indt",
    logFile: "indesign_script_errors.log"
};