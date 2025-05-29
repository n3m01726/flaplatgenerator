// --- Utilities Functions ---

// Error logging utility
function logError(errorMsg) {
    var logFile = File(PATHS.logFile);
    if (logFile.open("a")) { // Append mode
        var now = new Date();
        logFile.writeln("[" + now.toISOString() + "] " + errorMsg);
        logFile.close();
    }
}

// Sanitize section name for color naming
function sanitizeSectionName(name) {
    return name.replace(/[^\w\s\-]/g, "").replace(/\s+/g, "_").substring(0, 30);
}

// CSV file handling
function loadCSVFile() {
    var csvFile = File.openDialog("Select your enriched CSV file", "*.csv");
    if (!csvFile) {
        alert("No CSV file selected. Exiting.");
        return null;
    }

    csvFile.encoding = "UTF-8";
    if (!csvFile.open('r')) {
        alert("Failed to open CSV file.");
        return null;
    }
    
    var lines = [];
    while (!csvFile.eof) {
        var line = csvFile.readln();
        if (line) lines.push(line);
    }
    csvFile.close();
    lines.shift(); // Remove header
    
    return lines;
}

// Template file handling
function openTemplate() {
    var templateFile = new File(PATHS.templateFile);
    if (!templateFile.exists) {
        alert("Template file not found at: " + PATHS.templateFile);
        return null;
    }
    return app.open(templateFile);
}

// Build page list from CSV data
function buildPageList(lines) {
    var pagesToGenerate = [];

    for (var i = 0; i < lines.length; i++) {
        var row = lines[i].split(',');

        var startPageNum = parseInt(row[0], 10);
        var title = row[1];
        var section = row[2];
        var pageCount = parseInt(row[3], 10);
        var advertiser = row[4];
        var sector = row[5];

        for (var p = 0; p < pageCount; p++) {
            pagesToGenerate.push({
                pageNum: startPageNum + p,
                title: title,
                section: section,
                advertiser: advertiser,
                sector: sector
            });
        }
    }

    return pagesToGenerate;
}