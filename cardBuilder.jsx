// --- Card Builder ---

var CardBuilder = {
    
    // Track created separator lines to avoid duplicates
    createdSeparators: {},
    
    // Format title based on section type
    formatTitle: function(pageInfo) {
        return (pageInfo.section.toLowerCase() === "publicité" && pageInfo.advertiser && pageInfo.sector)
            ? pageInfo.title + "\n" + pageInfo.advertiser + " – " + pageInfo.sector
            : pageInfo.title;
    },
    
    // Create section box
    createSectionBox: function(page, x, y, section, borderColor, strokeTint) {
        var sectionBox = page.textFrames.add({
            geometricBounds: [y, x, y + DIMENSIONS.sectionHeight, x + DIMENSIONS.cardWidth],
            contents: section
        });
        
        sectionBox.strokeColor = borderColor;
        sectionBox.strokeTint = strokeTint;
        sectionBox.strokeWeight = 1;
        sectionBox.strokeType = "Dotted";
        sectionBox.texts[0].pointSize = TEXT_STYLES.section.pointSize;
        sectionBox.texts[0].justification = TEXT_STYLES.section.justification;
        sectionBox.textFramePreferences.verticalJustification = VerticalJustification.CENTER_ALIGN;
        
        return sectionBox;
    },
    
    // Create title box
    createTitleBox: function(page, x, y, title, color, borderColor, strokeTint) {
        var titleBox = page.textFrames.add({
            geometricBounds: [y + DIMENSIONS.sectionHeight, x, y + DIMENSIONS.sectionHeight + DIMENSIONS.titleHeight, x + DIMENSIONS.cardWidth],
            contents: title
        });
        
        titleBox.fillColor = color;
        titleBox.strokeColor = borderColor;
        titleBox.strokeTint = strokeTint;
        titleBox.strokeWeight = 1;
        titleBox.strokeType = "Dotted";
        titleBox.texts[0].pointSize = TEXT_STYLES.title.pointSize;
        titleBox.texts[0].justification = TEXT_STYLES.title.justification;
        titleBox.textFramePreferences.verticalJustification = VerticalJustification.CENTER_ALIGN;
        
        return titleBox;
    },
    
    // Create page number box
    createPageBox: function(page, x, y, pageNum, borderColor, strokeTint) {
        var pageBox = page.textFrames.add({
            geometricBounds: [y + DIMENSIONS.sectionHeight + DIMENSIONS.titleHeight, x, y + CARD_HEIGHT, x + DIMENSIONS.cardWidth],
            contents: pageNum.toString()
        });
        
        pageBox.strokeColor = borderColor;
        pageBox.strokeTint = strokeTint;
        pageBox.strokeWeight = 1;
        pageBox.strokeType = "Dotted";
        pageBox.texts[0].pointSize = TEXT_STYLES.pageNumber.pointSize;
        
        // Align page numbers: even numbers to left, odd numbers to right
        if (pageNum % 2 === 0) {
            pageBox.texts[0].justification = Justification.LEFT_ALIGN;
        } else {
            pageBox.texts[0].justification = Justification.RIGHT_ALIGN;
        }
        
        pageBox.textFramePreferences.verticalJustification = VerticalJustification.CENTER_ALIGN;
        
        return pageBox;
    },
  // --- Create overlay for partial ad ---
createAdOverlayBox: function(page, pageInfo, x, y, doc) {
    var format = pageInfo.title.match(/(\d{6})\s*-\s*[^-]+?\s*-\s*(\d\/\d)/);
    if (!format) return;

    var adNumber = format[1];
    var fraction = format[2];
    var widthRatio = 1;

    switch (fraction) {
        case "1/2":
            widthRatio = 0.5; break;
        case "1/3":
            widthRatio = 1/3; break;
        case "1/4":
            widthRatio = 0.25; break;
        default:
            return;
    }

    var overlayWidth = DIMENSIONS.cardWidth * widthRatio;
    var borderColor = doc.swatches.itemByName("Black");

    var graySwatch = doc.colors.itemByName("GrisPub");
    if (!graySwatch.isValid) {
        graySwatch = doc.colors.add({
            name: "GrisPub",
            model: ColorModel.PROCESS,
            space: ColorSpace.CMYK,
            colorValue: [0, 0, 0, 20]
        });
    }

    var overlayBox = page.textFrames.add({
        geometricBounds: [
            y + DIMENSIONS.sectionHeight,
            x,
            y + DIMENSIONS.sectionHeight + DIMENSIONS.titleHeight,
            x + overlayWidth
        ],
        contents: adNumber
    });

    overlayBox.fillColor = graySwatch;
    overlayBox.fillTint = 100;
    overlayBox.strokeColor = borderColor;
    overlayBox.strokeTint = 50;
    overlayBox.strokeWeight = 1;
    overlayBox.strokeType = "Solid";

    overlayBox.texts[0].justification = Justification.CENTER_ALIGN;
    overlayBox.texts[0].pointSize = 6;
    overlayBox.textFramePreferences.verticalJustification = VerticalJustification.CENTER_ALIGN;
},
  
// Create complete card with optional ad size overlay
createCard: function(page, pageInfo, x, y, doc) {
    var title = this.formatTitle(pageInfo);
    var color = ColorManager.getPastelColor(pageInfo.section, doc);
    var borderColor = doc.swatches.itemByName("Black");
    var strokeTint = 50;

    // Crée les boîtes principales
    this.createSectionBox(page, x, y, pageInfo.section, borderColor, strokeTint);
    this.createTitleBox(page, x, y, title, color, borderColor, strokeTint);
    this.createPageBox(page, x, y, pageInfo.pageNum, borderColor, strokeTint);

    // Si section "Publicité" et format fractionné
    if (pageInfo.section.toLowerCase() === "publicité" && pageInfo.adSize) {
        var adSize = pageInfo.adSize.trim().toLowerCase();
        var fractionHeight = 0;

        switch (adSize) {
            case "1/2":
                fractionHeight = CARD_HEIGHT / 2;
                break;
            case "1/3":
                fractionHeight = CARD_HEIGHT / 3;
                break;
            case "1/4":
                fractionHeight = CARD_HEIGHT / 4;
                break;
            default:
                fractionHeight = 0;
        }

        // Si format fractionné reconnu
        if (fractionHeight > 0) {
            var adBox = page.textFrames.add({
                geometricBounds: [
                    y + DIMENSIONS.sectionHeight, // top
                    x,                             // left
                    y + DIMENSIONS.sectionHeight + fractionHeight, // bottom
                    x + DIMENSIONS.cardWidth       // right
                ],
                contents: this.extractAdNumber(pageInfo.title)
            });

            // Style gris visible
            adBox.fillColor = doc.swatches.itemByName("Black");
            adBox.fillTint = 15; // Gris clair
            adBox.strokeWeight = 0;
            adBox.texts[0].fillColor = doc.swatches.itemByName("Paper");
            adBox.texts[0].pointSize = 10;
            adBox.texts[0].justification = Justification.CENTER_ALIGN;
            adBox.textFramePreferences.verticalJustification = VerticalJustification.CENTER_ALIGN;

            // $.writeln("GrisPub ajouté pour " + pageInfo.title);
        }
    }
},

// Helper pour extraire le numéro d'annonce au début du titre (ex: "0001165 - ...")
extractAdNumber: function(title) {
    var match = title.match(/^(\d{6,})/);
    return match ? match[1] : "";
},


    // Create separator line every 4 pages
    createSeparatorLine: function(page, pageIndex, position, coordinates, doc) {
        // Only create separator every 4 pages and not on first page
        if (pageIndex > 0 && (pageIndex % 4) === 0) {
            var separatorKey = position.docPageIndex + "_" + Math.floor(pageIndex / 4);
            
            // Avoid duplicate separators on same page
            if (!this.createdSeparators[separatorKey]) {
                var borderColor = doc.swatches.itemByName("Black");
                var currentStartY = (position.docPageIndex === 0) ? DIMENSIONS.startY : 0;
                
                // Calculate separator position - vertical line before the page group
                var separatorX = coordinates.x - (DIMENSIONS.spreadGutter / 2);
                var separatorY1 = currentStartY + DIMENSIONS.margin;
                var separatorY2 = separatorY1 + (LAYOUT.maxLinesPerPage * (CARD_HEIGHT + DIMENSIONS.spreadGutter)) - DIMENSIONS.spreadGutter;
                
                // Create the dashed separator line
                var separatorLine = page.graphicLines.add();
                separatorLine.paths[0].pathPoints[0].anchor = [separatorY1 + 8, separatorX]; // Start slightly below dot
                separatorLine.paths[0].pathPoints[1].anchor = [separatorY2, separatorX];
                separatorLine.strokeColor = borderColor;
                separatorLine.strokeWeight = 1;
                separatorLine.strokeType = "Dashed";
                separatorLine.strokeTint = 50;
                
                // Create a dot at the top of the line
                var dot = page.ovals.add();
                var dotSize = 4; // 4pt diameter
                dot.geometricBounds = [
                    separatorY1, 
                    separatorX - (dotSize/2), 
                    separatorY1 + dotSize, 
                    separatorX + (dotSize/2)
                ];
                dot.fillColor = borderColor;
                dot.fillTint = 50;
                dot.strokeWeight = 0; // No stroke on the dot
                
                this.createdSeparators[separatorKey] = true;
            }
        }
    },
    
    // Reset separator tracking for new document
    resetSeparators: function() {
        this.createdSeparators = {};
    }
};