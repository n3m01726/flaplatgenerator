// --- Color Management ---

// Color manager object
var ColorManager = {
    sectionColorMap: {},
    currentColorIndex: 0,
    
    // Get or create pastel color for section
    getPastelColor: function(sectionName, doc) {
        if (this.sectionColorMap[sectionName]) {
            return this.sectionColorMap[sectionName];
        }

        var colorDef = PASTEL_COLORS[this.currentColorIndex % PASTEL_COLORS.length];
        var rgb = colorDef.rgb;
        var sanitized = sanitizeSectionName(sectionName);
        var colorName = colorDef.name + " - " + sanitized;

        var newColor = doc.colors.itemByName(colorName);
        if (!newColor.isValid) {
            newColor = doc.colors.add({
                name: colorName,
                model: ColorModel.PROCESS,
                space: ColorSpace.RGB,
                colorValue: rgb
            });
        }

        this.sectionColorMap[sectionName] = newColor;
        this.currentColorIndex++;
        return newColor;
    },
    
    // Reset color manager for new document
    reset: function() {
        this.sectionColorMap = {};
        this.currentColorIndex = 0;
    }
};