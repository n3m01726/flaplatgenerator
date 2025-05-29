// --- Main Application ---
// This file should be loaded last and includes all other modules

// Include all modules (adjust paths as needed)
 // #include "constants.jsx"
 // #include "utilities.jsx"
 // #include "colorManager.jsx"
 // #include "layoutCalculator.jsx"
 // #include "cardBuilder.jsx"

// --- Main Function ---
function generateFlatplan() {
    try {
        // Load CSV data
        var lines = loadCSVFile();
        if (!lines) return;

        // Open template
        var doc = openTemplate();
        if (!doc) return;

        // Reset managers for new document
        ColorManager.reset();
        CardBuilder.resetSeparators();

        // Build page list from CSV
        var pagesToGenerate = buildPageList(lines);

        // Generate cards for each page
        for (var i = 0; i < pagesToGenerate.length; i++) {
            var pageInfo = pagesToGenerate[i];

            // Calculate position
            var position = LayoutCalculator.calculatePagePosition(i);
            var coordinates = LayoutCalculator.calculateCardPosition(position);

            // Get or create page
            var page = LayoutCalculator.getOrCreatePage(doc, position.docPageIndex);

            // Apply master
            LayoutCalculator.applyMaster(page, position.docPageIndex, doc);

            // Create card
            CardBuilder.createCard(page, pageInfo, coordinates.x, coordinates.y, doc);
            
            // Create separator line every 4 pages for printers
            CardBuilder.createSeparatorLine(page, i, position, coordinates, doc);
        }

        alert("Flatplan generated from template with block pagination!");

    } catch (e) {
        var errorMsg = "Error in generateFlatplan: " + e.message + (e.line ? (" (Line: " + e.line + ")") : "");
        alert(errorMsg);
        logError(errorMsg + "\nStack trace:\n" + (e.stack || "No stack available"));
        throw e; // Re-throw for outer error handler
    }
}

// --- Global Error Handling Wrapper ---
try {
    generateFlatplan();
} catch (e) {
    var errorMsg = "Critical Error: " + e.message + (e.line ? (" (Line: " + e.line + ")") : "");
    alert(errorMsg);
    logError(errorMsg + "\nStack trace:\n" + (e.stack || "No stack available"));
}