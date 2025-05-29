// --- Layout Calculator ---

var LayoutCalculator = {
    
    // Calculate page and spread positioning
    calculatePagePosition: function(pageIndex) {
        var spreadIndex = Math.floor(pageIndex / 2);
        var isLeftPage = (pageIndex % 2 === 0);
        
        var currentDocPageIndex, spreadInPage;

        if (spreadIndex < LAYOUT.spreadsPerPageFirstPage) {
            currentDocPageIndex = 0;
            spreadInPage = spreadIndex;
        } else {
            currentDocPageIndex = Math.floor((spreadIndex - LAYOUT.spreadsPerPageFirstPage) / LAYOUT.spreadsPerPageOtherPages) + 1;
            spreadInPage = (spreadIndex - LAYOUT.spreadsPerPageFirstPage) % LAYOUT.spreadsPerPageOtherPages;
        }

        return {
            docPageIndex: currentDocPageIndex,
            spreadInPage: spreadInPage,
            isLeftPage: isLeftPage
        };
    },
    
    // Calculate card coordinates
    calculateCardPosition: function(position) {
        var lineNum = Math.floor(position.spreadInPage / LAYOUT.maxSpreadsPerLine);
        var spreadInLine = position.spreadInPage % LAYOUT.maxSpreadsPerLine;
        var col = spreadInLine * 2 + (position.isLeftPage ? 0 : 1);
        
        var currentStartY = (position.docPageIndex === 0) ? DIMENSIONS.startY : 0;
        var x = DIMENSIONS.margin + col * DIMENSIONS.cardWidth + spreadInLine * DIMENSIONS.spreadGutter;
        var y = currentStartY + DIMENSIONS.margin + lineNum * (CARD_HEIGHT + DIMENSIONS.spreadGutter);
        
        return { x: x, y: y };
    },
    
    // Get or create page
    getOrCreatePage: function(doc, pageIndex) {
        var page;
        if (pageIndex >= doc.pages.length) {
            page = doc.pages.add();
        } else {
            page = doc.pages[pageIndex];
        }
        return page;
    },
    
    // Apply master to page
    applyMaster: function(page, pageIndex, doc) {
        var masterA = doc.masterSpreads.itemByName("A-Master");
        var noMaster = doc.masterSpreads.itemByName("B-Master");
        
        if (pageIndex === 0 && masterA.isValid) {
            page.appliedMaster = masterA;
        } else if (noMaster.isValid) {
            page.appliedMaster = noMaster;
        }
    }
};