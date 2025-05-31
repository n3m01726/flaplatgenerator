// --- Card Builder ---

var CardBuilder = {
    
    // Format title based on section type and fractional ads
    formatTitle: function(pageInfo) {
        if (pageInfo.adSize === "fractional" && pageInfo.fractionalAds && pageInfo.fractionalAds.length > 0) {
            // Display fractional ads
            var titles = [];
            for (var i = 0; i < pageInfo.fractionalAds.length; i++) {
                var ad = pageInfo.fractionalAds[i];
                var fraction = AD_FRACTIONS[ad.adSize] ? AD_FRACTIONS[ad.adSize].label : ad.adSize;
                var adTitle = ad.advertiser && ad.sector ? 
                    ad.advertiser + " – " + ad.sector : ad.title;
                titles.push(fraction + " " + adTitle);
            }
            return titles.join("\n---\n");
        } else if (pageInfo.section.toLowerCase() === "publicité" && pageInfo.advertiser && pageInfo.sector) {
            return pageInfo.title + "\n" + pageInfo.advertiser + " – " + pageInfo.sector;
        } else {
            return pageInfo.title;
        }
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
    
    // Create title box with fractional ad visualization
    createTitleBox: function(page, x, y, title, color, borderColor, strokeTint, pageInfo) {
        var titleBox = page.textFrames.add({
            geometricBounds: [y + DIMENSIONS.sectionHeight, x, y + DIMENSIONS.sectionHeight + DIMENSIONS.titleHeight, x + DIMENSIONS.cardWidth],
            contents: title
        });
        
        titleBox.fillColor = color;
        titleBox.strokeColor = borderColor;
        titleBox.strokeTint = strokeTint;
        titleBox.strokeWeight = 1;
        titleBox.strokeType = "Dotted";
        titleBox.texts[0].pointSize = (pageInfo && pageInfo.adSize === "fractional") ? 5 : TEXT_STYLES.title.pointSize;
        titleBox.texts[0].justification = TEXT_STYLES.title.justification;
        titleBox.textFramePreferences.verticalJustification = VerticalJustification.CENTER_ALIGN;
        
        // Add visual dividers for fractional ads
        if (pageInfo && pageInfo.adSize === "fractional" && pageInfo.fractionalAds && pageInfo.fractionalAds.length > 1) {
            this.addFractionalDividers(page, x, y, pageInfo.fractionalAds.length, borderColor);
        }
        
        return titleBox;
    },
    
    // Add visual dividers for fractional ads
    addFractionalDividers: function(page, x, y, adCount, borderColor) {
        var titleBoxY = y + DIMENSIONS.sectionHeight;
        var dividerHeight = DIMENSIONS.titleHeight / adCount;
        
        // Create horizontal divider lines
        for (var i = 1; i < adCount; i++) {
            var dividerY = titleBoxY + (i * dividerHeight);
            var dividerLine = page.graphicLines.add();
            dividerLine.paths[0].pathPoints[0].anchor = [dividerY, x];
            dividerLine.paths[0].pathPoints[1].anchor = [dividerY, x + DIMENSIONS.cardWidth];
            dividerLine.strokeColor = borderColor;
            dividerLine.strokeWeight = 0.5;
            dividerLine.strokeType = "Solid";
            dividerLine.strokeTint = 30;
        }
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
    
    // Create complete card
    createCard: function(page, pageInfo, x, y, doc) {
        var title = this.formatTitle(pageInfo);
        var color = ColorManager.getPastelColor(pageInfo.section, doc);
        var borderColor = doc.swatches.itemByName("Black");
        var strokeTint = 50;
        
        // Create all three boxes
        this.createSectionBox(page, x, y, pageInfo.section, borderColor, strokeTint);
        this.createTitleBox(page, x, y, title, color, borderColor, strokeTint, pageInfo);
        this.createPageBox(page, x, y, pageInfo.pageNum, borderColor, strokeTint);
    }
};