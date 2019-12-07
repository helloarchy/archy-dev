/**
 * WORKINGS
 * A roman blind dimension calculator. Used for generating the various measurements needed to make
 * a roman blind, as per the various input parameters. Has many extra options for fine tuning the
 * output blind.
 * Created: 2017/01/30
 * Last modified: 2018/04/18
 * @author Robert Hardy
 * @version 1.2.1
 */



/* GLOBAL VARIABLES/CONSTANTS (not declared with var to make auto global
* Initialised on page load with values, see below onPageLoad(). */
/*var bT = document.getElementById("blindTable"); //Table used for produced blind drawing.*/
/*var stackChoice = $("#selectStack"); // Determines generated stack type.*/
var blind; // blind object
var foldsManualOverwrite = false; // Used for auto calculating values unless user declares.
var ringsManualOverwrite = false;
var DEFAULT_DETAILS_PLACEHOLDER = "________________________";
var DEFAULT_FAB_CUT_WIDTH = 123.5; // cm
var DEFAULT_FAB_REPEAT = 23.45; // cm
var DEFAULT_RAIL_BATON = 6; // cm
var DEFAULT_RAIL_EVANS = 6; // cm
var DEFAULT_RAIL_HALLIS = 5; // cm
var DEFAULT_WATERFALL_INCREMENT = 2.5; // cm
var DEFAULT_SHOWING_HEM = 2.5; // cm
var DEFAULT_RAILING_TYPE = "Railing";
var DEFAULT_RAILING_DEPTH = 6; // cm
var DEFAULT_POCKET_DEPTH = 3; // cm Half of full pocket (6 cm)
var DEFAULT_RING_MARGIN = 10.5; // cm
// Feb 2018 update:
var DEFAULT_NO_BLINDS = 1; // Typically one blind per job sheet
var DEFAULT_NO_WIDTHS = 1; // Typically a blind is a single width
var DEFAULT_CUT_WIDTH = 132; // cm. Used to establish how many widths on a blind.
var widthsManualOverwrite = false; // Used for auto calculating number of widths.

/*
 * ON PAGE LOAD:
 */
$(document).ready(function () {
});


/**
 * Collapsible Arrows:
 * Changing the collapse arrow directions on blind input fields.
 */
$(function () {
    /* Trigger all initial page load functions (normally handled by document ready, but need to be able
    * to recall the function again on reset. */
    onPageLoad();

    $("legend").click(function () {
        $(this).parent().find(".fieldContent").slideToggle("slow");
        $(this).children(".arrowDown").toggle();
        $(this).children(".arrowUp").toggle();
    });
});


function onPageLoad() {
    // Listen for form changes
    formValues();

    // send values to functions to update initial values.
    foldsChange($("#sliderFoldsCount").val());
    ringsCountChange($("#ringsCount").val());

    // hide drawing elements
    $("#blindDrawing").hide("fast", function () {});
    $("#jobDetails").hide("fast", function () {});
    $("#measureDetails").hide("fast", function () {});
    $("#disclaimer").hide("fast", function () {});
    $("#numWidthsInfo").hide("fast", function () {});


    // Initialise new blind with values.
    blind = new Blind(); // blind object

    /**
     * SUBMIT BUTTON CLICK:
     */
    $("#formBlinds").on("submit", function (e) {
        // Cache duplicate selectors
        var numWidths = $("#numWidthsInfo");

        // Stop submit from refreshing page
        e.preventDefault();

        // Clear the canvas for new drawing
        $("#blindTable").html("");
        $("#fabricMeasures").html("");
        /*$("#innerLiningMeasures").html("");*/
        $("#liningMeasures").html("");
        numWidths.html("");
        $("#drawingDetailsClient").html("");
        $("#drawingDetailsCustAndRef").html("");
        /*$("#initialCalcs").html("");*/
        $("#initCalcsDropFig").html("");
        $("#initCalcsVelcroFig").html("");
        $("#initCalcsRevealFig").html("");
        $("#initCalcsResultFig").html("");


        // Hide placeholder
        $("#placeHolder").hide("fast", function () {});
        $("#centrePlaceHolder").hide("slow", function () {});


        // Un-hide drawing elements
        $("#blindDrawing").show("fast", function () {});
        $("#jobDetails").show("fast", function () {});
        $("#measureDetails").show("fast", function () {});
        $("#disclaimer").show("fast", function () {});
        numWidths.show("fast", function () {});


        // Write client details to drawing:
        writeJobDetails();

        // Write initial calculations:
        writeInitialCalcs();

        // Generate drawing and calculations
        generateBlinds();

        // Apply labels to dimensional rulers now table generated.
        writeDimensionLabels();

        // Write measure details to drawing:
        writeMeasureDetails();

        // Write number of blinds and cuts explanation
        writeNumWidthsInfo();

        // Reset manual overwrites
        foldsManualOverwrite = false;
        ringsManualOverwrite = false;
        widthsManualOverwrite = false;
    });

    $("#resetButton").click(function () {
        // Write to console
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        console.log("RESET ALL:");
        console.log("---------");

        $("#waterfall").slideUp("slow");
        $("#showingHem").slideUp("slow");

        // Show the placeholder
        $("#placeHolder").show("fast", function () {
        });
        $("#centrePlaceHolder").show("slow", function () {
        });

        // Hide the existing drawing.
        $("#blindDrawing").hide("fast", function () {});
        $("#jobDetails").hide("fast", function () {});
        $("#measureDetails").hide("fast", function () {});
        $("#disclaimer").hide("fast", function () {});
        $("#numWidthsInfo").hide("fast", function () {});

        // Change all values back to defaults.
        $("#sliderFoldsCount").val(4);
        $("#foldsValueText").val(4);

        // Reset manual overwrites
        /*foldsManualOverwrite = false;
        ringsManualOverwrite = false;
        widthsManualOverwrite = false;*/

        // Re-establish values from the forms.
        /*formValues();*/ // Caused double firing of inputs (inc/dec buttons).

        // Wide previous blind values and reinitialise with new values (forces use of defaults if none given).
        blind = new Blind();
    });
}


/**
 * Slider value text changes:
 * Two methods for updating slider value text in blinds form.
 */
function foldsChange(value) {
    $("#foldsValueText").text(value);
}

function ringsCountChange(value) {
    $("#ringsCountText").text(value);
}

/**
 * Stack type list:
 * Handle users stack choice, hiding and displaying form elements.
 */
$(function () {
    $("#selectStack").on("change", function () {
        if (this.selectedIndex === 0) {
            // Normal stack: Hide showing hem and water if showing.
            $("#showingHem").slideUp("slow");
            $("#waterfall").slideUp("slow");
        } else if (this.selectedIndex === 1) {
            // Waterfall stack: Show water stuff, hide showing hem if showing.
            $("#waterfall").slideDown("slow");
            $("#showingHem").slideUp("slow");
        } else if (this.selectedIndex === 2) {
            // Showing at hem stack: Show showing stuff, hide water if showing.
            $("#showingHem").slideDown("slow");
            $("#waterfall").slideUp("slow");
        }
        // Lose focus after choice.
        $("#selectStack").blur();
    });
});


/**
 * BLIND CLASS (object declaration)
 */
function Blind() {
    // DETAILS:
    this.detailsClient = DEFAULT_DETAILS_PLACEHOLDER;
    this.detailsCustomer = DEFAULT_DETAILS_PLACEHOLDER;
    this.detailsReference = DEFAULT_DETAILS_PLACEHOLDER;
    this.noOfBlinds = DEFAULT_NO_BLINDS;

    // DIMENSIONS:
    this.width = 0; //cm
    this.widthUnit = "cm";
    this.height = 0; //cm
    this.heightUnit = "cm";
    this.noOfWidths = DEFAULT_NO_WIDTHS;

    // FABRIC:
    this.fabricCutWidth = DEFAULT_FAB_CUT_WIDTH;
    this.fabricRepeat = DEFAULT_FAB_REPEAT;

    // LININGS:
    this.liningInner = "Unspecified";
    this.liningIsInner = false; // Inner linings not always needed.
    this.liningOuter = "Unspecified";
    // outer always needed

    // RAILING:
    this.railingType = DEFAULT_RAILING_TYPE;
    this.railingDepth = DEFAULT_RAILING_DEPTH; //cm

    // STACK:
    this.stackType = "normal";
    this.waterfallIncrement = DEFAULT_WATERFALL_INCREMENT; //cm
    this.showingHemSize = DEFAULT_SHOWING_HEM; //cm
    this.stackFolds = 4;

    // POCKETS:
    this.pocketsDepth = 3; //cm

    // RINGS:
    this.ringsType = "Unspecified";
    this.ringsMargin = DEFAULT_RING_MARGIN;
    this.ringsCount = 5;

    // Misc other T.B.O
    this.hemTurnings = 15;

    // Calculated sizes:
    this.cutLengthLining = 0;
    this.cutLengthFabInner = 0;
    this.pocketsTotalLength = 0;
}



/**
 * Validates user input. Use manually entered value if there is one, otherwise use default.
 * @param text, the generic text value for the item to be changed.
 * @param toSet, the blind attribute to assign validated value to.
 * @param inputVal, the user input given.
 * @param DEFAULT, the value to default back to if input is blank.
 */
function textBoxValidation(text, toSet, inputVal, DEFAULT) {
    if (!(inputVal === "")) {
        toSet = inputVal;
        console.log(text + " change: " + toSet);
    } else {
        toSet = DEFAULT;
        console.log(text + ", using default (" + DEFAULT + ")");
    }
}


/**
 * Auto Calculation of Stack Folds:
 * Value can be overwritten by manual input. If no manual input, the value generated here will be
 * used. Ranges determined by predefined values, hard coded here.
 * @returns {*} value to be used for folds.
 */
function autoCalcFoldCount() {
    var autoFoldResult;
    var value = blind.height;
    if (40 <= value && value <= 59.99) {
        autoFoldResult = 1;
    } else if (60 <= value && value <= 79.99) {
        autoFoldResult = 2;
    } else if (80 <= value && value <= 119.99) {
        autoFoldResult = 3;
    } else if (120 <= value && value <= 159.99) {
        autoFoldResult = 4;
    } else if (160 <= value && value <= 199.99) {
        autoFoldResult = 5;
    } else if (200 <= value && value <= 239.99) {
        autoFoldResult = 6;
    } else if (240 <= value && value <= 279.99) {
        autoFoldResult = 7;
    }

    // Debug
    console.log("Fold count (auto): " + autoFoldResult);

    // Reflect new fold count in form elements
    $("#sliderFoldsCount").val(autoFoldResult);
    $("#foldsValueText").val(autoFoldResult);

    return autoFoldResult;
}


/**
 * RING COUNT AUTO GENERATOR
 * Value can be overwritten by manual input. If no manual input, the value
 * generated here will be used.
 */
function autoCalcRingsCount() {
    /**
     * Match blind width to certain specific sizes for different
     * ring count.
     * All units in cm and require converting from inch/mm beforehand.
     * note: used switch statement but changed to if/else more efficient.
     */
    var autoRingResult;
    var value = blind.width;
    if (26 <= value && value <= 70.99) {
        autoRingResult = 2;
    } else if (71 <= value && value <= 104.99) {
        autoRingResult = 3;
    } else if (105 <= value && value <= 149.99) {
        autoRingResult = 4;
    } else if (150 <= value && value <= 179.99) {
        autoRingResult = 5;
    } else if (180 <= value && value <= 224.99) {
        autoRingResult = 6;
    } else if (225 <= value && value <= 269.99) {
        autoRingResult = 7;
    }

    // Debug
    console.log("Ring count (auto): " + autoRingResult);

    // Reflect new ring count in form elements
    $("#ringsCount").val(autoRingResult);
    $("#ringsCountText").val(autoRingResult);

    return autoRingResult;
}


/**
 * WIDTHS AUTO GENERATOR
 * Value can be overwritten by manual input. If none, then value auto generated here.
 */
function autoCalcNoWidths() {
    // Divide blind width by cut width and round up to nearest whole number.
    var autoNoWidths = Math.ceil(blind.width / DEFAULT_CUT_WIDTH);
    $("#numOfWidths").val(autoNoWidths);
    console.log("Number of widths (auto): " + autoNoWidths);
    return autoNoWidths;
}

/**
 * Write Details:
 * Add customer details to the printable drawing.
 */
function writeJobDetails() {
    $("#drawingDetailsClient").html(blind.detailsClient);
    $("#drawingDetailsCustAndRef").html(blind.detailsCustomer + ": " + blind.detailsReference);
}


/**
 * Write initial calculations:
 * Add the initial calculations to the printable drawing. OnSubmit all html is wiped, so can generate
 * only once without worrying about duplication or value changes.
 */
function writeInitialCalcs() {
    // Full drop
    $("#initCalcsDropFig").append(
        "<td>" + round1DP(+blind.height) + "</td><td class='initCalcsLabels'>Drop</td>"
    );
    // Railing
    $("#initCalcsVelcroFig").append(
        "<td>- " + round1DP(+blind.railingDepth) + "</td><td class='initCalcsLabels'>" +
        blind.railingType + "</td>"
    );
    // Add additional calculations if the blind has showing hem, if not, don't show it.
    if (blind.stackType === "showingHem") {
        $("#initCalcsRevealFig").append(
            "<td>- " + round1DP(blind.showingHemSize) + "</td><td class='initCalcsLabels'>Reveal</td>"
        );
        // Result
        $("#initCalcsResultFig").append(
            "<td id='initCalcsResult'>" + round1DP(+blind.height -
            (+blind.railingDepth + +blind.showingHemSize)) + "</td><td id='initCalcsLabelsResult'>"
            + blind.heightUnit + "</td>"
        );
    } else {
        // Result
        $("#initCalcsResultFig").append(
            "<td id='initCalcsResult'>" + round1DP(+blind.height - +blind.railingDepth) +
            "</td><td id='initCalcsLabelsResult'>" + blind.heightUnit + "</td>"
        );
    }
}


/**
 * BLIND GENERATOR
 * This function takes the blind object previously created and generates a full
 * illustration of it in the blindDrawing div. All calculations for measurements
 * are also generated here.
 */
function generateBlinds() {
    var blindTable = $("#blindTable"); // Cache call for optimisation

    // Check if rings, folds, and num of widths have user specified values, if not, auto generate them.
    if (ringsManualOverwrite === false) {
        blind.ringsCount = autoCalcRingsCount();
    }
    if (foldsManualOverwrite === false) {
        blind.stackFolds = autoCalcFoldCount();
    }
    if (widthsManualOverwrite === false) {
        blind.noOfWidths = autoCalcNoWidths();
    }

    // Initialise images for blind drawing.
    initImgVars();

    /* GET FOLD SIZES:
    If waterfall, use waterfall function, otherwise get from usual function. */
    var stackSizes = []; // Array for stack sizes.
    if (blind.stackType === "normal") {
        // Generate normal stack sizes.
        stackSizes = autoCalcStackNormal();
    } else if (blind.stackType === "waterfall") {
        // Generate waterfall stack sizes.
        stackSizes = autoCalcStackWaterfall();
    } else if (blind.stackType === "showingHem") {
        // Generate showing at hem sizes.
        stackSizes = autoCalcStackShowingHem();
    }
    stackSizes = stackSizes.reverse(); // Reverse array for popping in order written.

    // -- Add sections to drawing --

    /* VELCRO/HEAD RAIL STRIP:
    Add first but of vertical dimension line.*/
    blindTable.append("<tr id='velcro'><td>" + window.arrowUP + "</td>");

    /*Add left to drawing, then use loop to add middles and spots, then ultimately right. */
    var velcroRow = $("#velcro");
    velcroRow.append("<td>" + window.velcroLEFT + "</td>");
    var h = blind.ringsCount; // Velcro width counter
    var labelCounter = 1; // Determines mid section to add label to.
    for (h; h > 0; h--) {
        // If more than one ring, add ring plus spacer. Else add final ring and right edge.
        if (h > 1) {
            if (labelCounter > 0) {
                velcroRow.append("<td>" + window.velcroMIDDLE + "</td>" + "<td class='labelImg'>"
                    + window.velcroMIDDLE + "<span class='lblImgSmall'>" + round1DP(stackSizes.pop())
                    + "</span></td>");
                labelCounter--;
            } else {
                velcroRow.append("<td>" + window.velcroMIDDLE + "</td>" +
                    "<td>" + window.velcroMIDDLE + "</td>");
            }
        } else {
            // Draw velcro on right edge
            velcroRow.append("<td>" + window.velcroMIDDLE + "</td>" + "<td>" + window.velcroRIGHT
                + "</td></tr>");
        }
    }

    /**
     * MID SECTIONS:
     * Iterates for each pocket, terminates when no pockets left. Each loop creates a new pocket
     * div and adds it to html blind drawing. Nested statements create blind elements before,
     * between, and after pockets.
     */
    var verticalCount = blind.stackFolds; //stack folds determines vertical elements.
    var widthCount = blind.ringsCount; // rings count determines width elements.
    var i = verticalCount; // counter for vertical blind elements
    var j = verticalCount; // counter for width elements.
    var k, l, m; // counters for varying inner width elements.
    k = l = m = verticalCount;
    for (i; i > 0; i--) {
        /* BLANK PRE-FOLD:
        Add left to drawing, then use loop to add middles and spots, then ultimately right. */
        if (j > 0) {
            // Add dimension line first, then rest.
            blindTable.append("<tr id='blankA" + j + "'><td>" + window.lineVERTICAL + "</td>");
            var blankAnJ = $("#blankA" + j);
            blankAnJ.append("<td>" + window.blankLEFT + "</td>");
            k = widthCount; // set width counter
            for (k; k > 0; k--) {
                // If more than one ring, add ring plus spacer.
                // Else add final ring and right edge.
                if (k > 1) {
                    blankAnJ.append("<td>" + window.blankMIDDLE + "</td>" +
                        "<td>" + window.blankMIDDLE + "</td>");
                } else {
                    // Draw velcro on right edge
                    blankAnJ.append("<td>" + window.blankMIDDLE + "</td>" +
                        "<td>" + window.blankRIGHT + "</td></tr>");
                }
            }
            j--; // counter decrement
        }

        /* FOLD:
        Add left to drawing, then use loop to add middles and spots, then ultimately right. */
        if (l > 0) {
            // Add dimension line first, then rest.
            blindTable.append("<tr id='fold" + l + "'>" + "<td>" + window.lineVERTICAL + "</td>");
            var foldL = $("#fold" + l);
            foldL.append("<td>" + window.foldLEFT + "</td>");
            k = widthCount; // set width counter
            labelCounter = 1;
            for (k; k > 0; k--) {
                // Determine amount of middle elements by ring count. Add two
                // middles if still middle, if end add one plus right edge.
                if (k > 1) {
                    if (labelCounter > 0) {
                        foldL.append("<td class='labelImg'>" + window.blankMIDDLE +
                            "<span>" + round1DP(stackSizes.pop()) + "</span></td><td>" + window.blankMIDDLE +
                            "</td>");
                        labelCounter--;
                    } else {
                        foldL.append("<td>" + window.foldMIDDLE + "</td><td>"
                            + window.foldMIDDLE + "</td>");
                    }
                } else {
                    // Draw fold on right edge
                    foldL.append("<td>" + window.foldMIDDLE + "</td>" +
                        "<td>" + window.foldRIGHT + "</td></tr>");
                }
            }
            l--; // counter decrement
        }

        /* BLANK POST-FOLD:
        Add left to drawing, then use loop to add middles, then ultimately right. */
        if (m > 0) {
            // Add dimension line first, then rest.
            blindTable.append("<tr id='blankB" + m + "'>" + "<td>" + window.lineVERTICAL + "</td>");
            var blankBnM = $("#blankB" + m);
            blankBnM.append("<td>" + window.blankLEFT + "</td>");
            k = widthCount; // set width counter
            for (k; k > 0; k--) {
                // Determine amount of middle elements by ring count. Add two
                // middles if still middle, if end add one plus right edge.
                if (k > 1) {
                    blankBnM.append("<td>" + window.blankMIDDLE + "</td>" +
                        "<td>" + window.blankMIDDLE + "</td>");
                } else {
                    // Draw blank on right edge
                    blankBnM.append("<td>" + window.blankMIDDLE + "</td>" +
                        "<td>" + window.blankRIGHT + "</td></tr>");
                }
            }
            m--; // counter decrement
        }

        /* POCKETS:
        Add dimension line first, then rest.*/
        blindTable.append("<tr id='pocket" + i + "'><td>" + window.lineVERTICAL + "</td>");

        /*Add left to drawing, then use loop to add middles and spots, then ultimately right. */
        var pocketI = $("#pocket" + i);
        pocketI.append("<td>" + window.pocketLEFT + "</td>");
        k = widthCount; // set width counter
        labelCounter = 1;
        for (k; k > 0; k--) {
            // If more than one ring, add ring plus spacer.
            // Else add final ring and right edge.
            if (k > 1) {
                if (labelCounter > 0) {
                    pocketI.append("<td>" + window.pocketRINGSPOT + "</td>" +
                        "<td class='labelImg'>" + window.pocketMIDDLE + "<span class='lblImgSmall'>" +
                        round1DP(stackSizes.pop()) + "</span></td>");
                    labelCounter--;
                } else {
                    pocketI.append("<td>" + window.pocketRINGSPOT + "</td>" +
                        "<td>" + window.pocketMIDDLE + "</td>");
                }
            } else {
                // Draw pocket on right edge
                pocketI.append("<td>" + window.pocketRINGSPOT + "</td>" +
                    "<td>" + window.pocketRIGHT + "</td></tr>");
            }
        }
    }

    // -- Finally, add bottom pleat --

    /* BLANK SINGLE:
    Add dimension line first, then rest.*/
    blindTable.append("<tr id='blankSingle'><td>" + window.lineVERTICAL + "</td>");

    /*Add left to drawing, then use loop to add middles, then ultimately right. */
    var blankSingle = $("#blankSingle");
    blankSingle.append("<td>" + window.blankLEFT + "</td>");
    k = widthCount; // set width counter
    labelCounter = 1;
    for (k; k > 0; k--) {
        // Determine amount of middle elements by ring count. Add two
        // middles if still middle, if end add one plus right edge.
        if (k > 1) {
            if (labelCounter > 0) {
                blankSingle.append("<td class='labelImg'>" + window.blankMIDDLE + "<span>" +
                    round1DP(stackSizes.pop()) + "</span></td><td>" + window.blankMIDDLE + "</td>");
                labelCounter--;
            } else {
                blankSingle.append("<td>" + window.blankMIDDLE + "</td>" +
                    "<td>" + window.blankMIDDLE + "</td>");
            }
        } else {
            // Draw blank on right edge
            blankSingle.append("<td>" + window.blankMIDDLE + "</td>" +
                "<td>" + window.blankRIGHT + "</td></tr>");
        }
    }

    /* HEM/BOTTOM BAR:
    Add dimension line first, then rest.*/
    blindTable.append("<tr id='hem'><td>" + window.arrowDOWN + "</td>");

    /*Add left to drawing, then use loop to add middles, then ultimately right. */
    var hem = $("#hem");
    hem.append("<td>" + window.hemLEFT + "</td>");
    k = widthCount; // set width counter
    labelCounter = 1;
    for (k; k > 0; k--) {
        // Determine amount of middle elements by ring count. Add two
        // middles if still middle, if end add one plus right edge.
        if (k > 1) {
            if (labelCounter > 0) {
                hem.append("<td>" + window.hemMIDDLE + "</td><td class='labelImg'>" +
                    window.hemMIDDLE + "<span class='lblImgSmall'>" + round1DP(stackSizes.pop()) +
                    "</span></td>");
                labelCounter--;
            } else {
                hem.append("<td>" + window.hemMIDDLE + "</td><td>" + window.hemMIDDLE +
                    "</td>");
            }
        } else {
            // Draw blank single on right edge
            hem.append("<td>" + window.hemMIDDLE + "</td><td>" + window.hemRIGHT +
                "</td></tr>");
        }
    }

    /* DIMENSIONS HORIZONTAL:
    Add dimension line first, then rest.*/
    blindTable.append("<tr id='dimBottom'><td></td><td>" + window.arrowLEFT + "</td>");

    /*Add left to drawing, then use loop to add middles, then ultimately right. */
    var dimBottom = $("#dimBottom");
    dimBottom.append("<td>" + window.lineHORIZONTAL + "</td>");
    k = widthCount; // set width counter, skip first image.
    for (k; k > 0; k--) {
        // Determine amount of middle elements by ring count. Add two
        // middles if still middle, if end add one plus right edge.
        if (k > 1) {
            dimBottom.append("<td>" + window.lineHORIZONTAL + "</td><td>" + window.lineHORIZONTAL +
                "</td>");
        } else {
            // Draw blank single on right edge
            dimBottom.append("<td>" + window.arrowRIGHT +
                "</td></tr>");
        }
    }
}


/**
 * Calculates stack sizes for a normal blind.
 * @returns {Array} of measurements used by "generateBlind" to build drawing.
 */
function autoCalcStackNormal() {
    var stackSizes = []; // Populate with generated values and returned.
    var totalDepth = +blind.height;
    console.log("Total depth: " + totalDepth); //todo BURN

    // Add railing depth to array. Minus railing depth from blinds total depth.
    stackSizes.push(+blind.railingDepth);
    totalDepth -= +blind.railingDepth;
    console.log("Minus velcro/railing(" + +blind.railingDepth + "): " + totalDepth); //todo BURN

    /* For each fold, add depth from pocket to pocket, plus pocket itself. There are two folds per
    pocket, plus 1 for the bottom pleat. */
    var eachFold = round2DP(totalDepth / ((blind.stackFolds * 2) + 1));
    console.log("Each individual fold: " + eachFold);
    for (var k = 0; k < blind.stackFolds; k++) {

        stackSizes.push(eachFold * 2); // Add full pleat section to array.
        console.log("Adding pleat section: " + round2DP(eachFold * 2)); //todo BURN

        stackSizes.push(blind.pocketsDepth * 2); // Add pocket too.
        console.log("Adding pocket: " + round2DP(blind.pocketsDepth * 2)); //todo BURN

        console.log("Looping: " + k);
    }

    // Add half pleat section to array for bottom of blind.
    stackSizes.push(eachFold);
    console.log("Adding final pleat: " + eachFold);

    // Add final hem turnings to array for bottom of blind.
    stackSizes.push(+blind.hemTurnings);
    console.log("Adding hem turnings: " + blind.hemTurnings);

    blind.cutLengthLining = stackSizes.reduce(getSum);
    blind.cutLengthFabInner = (+blind.height) + (+blind.hemTurnings);
    blind.pocketsTotalLength = (blind.pocketsDepth * 2) * blind.stackFolds;
    console.log("Lining total size (+15 turning allowance): " + +blind.cutLengthLining);
    console.log("Fab Inner total size (+15 turning allowance): " + blind.cutLengthFabInner);
    console.log("Total pockets length: " + blind.pocketsTotalLength);
    return stackSizes;
}


/**
 * Calculates stack sizes for a normal blind.
 * @returns {Array} of measurements used by "generateBlind" to build drawing.
 */
function autoCalcStackWaterfall() {
    var stackSizes = []; // Populate with generated values and returned.
    var totalDepth = +blind.height;
    var WATER_INC = +blind.waterfallIncrement;
    console.log("Calculating WATERFALL Stack with increment: " + WATER_INC);

    var totalHalfFolds = (blind.stackFolds * 2) + 1;
    console.log("Total half folds: " + totalHalfFolds);

    /* This loop sums the total cascade needed for the blind, by adding the cascade for each fold
    and also increasing the cascade by the increment for each pocket in the blind.
     */
    var totalCascade = 0;
    var curCascade = 0;
    var loopTwice = 1;
    for (var i = 0; i < totalHalfFolds; i++) {
        totalCascade += curCascade;
        console.log("Current cascade: " + totalCascade);
        // Increase increment for every other half fold.
        if (!(loopTwice > 0)) {
            curCascade += WATER_INC;
            loopTwice = 1;
        } else {
            loopTwice--;
        }
    }
    console.log(" ==================>  Total cascade: " + totalCascade);

    /* Minus railing from drop */
    console.log("Total depth: " + totalDepth);
    stackSizes.push(+blind.railingDepth); // Add to array
    totalDepth -= +blind.railingDepth; // Minus railing from drop
    console.log("Minus velcro/railing(" + +blind.railingDepth + "): " + totalDepth);

    /* Minus the total cascade from the drop of the blind (which also minuses the railing depth),
     then divide by the half folds needed to get the size of the first fold, then multiply by two
     to get the size of the full fold. */
    var depthAfterCascade = (totalDepth - totalCascade);
    console.log("Total depth after cascade: " + depthAfterCascade);

    var firstFold = (depthAfterCascade / totalHalfFolds) * 2;
    console.log("First fold: " + firstFold);
    stackSizes.push(firstFold);

    /* Loop for remaining full folds, adding increment each time.
    Skip over first fold */
    var curFold = firstFold;
    for (var k = 1; k < blind.stackFolds; k++) {

        // Add pocket.
        stackSizes.push(blind.pocketsDepth * 2);
        console.log("Adding pocket: " + blind.pocketsDepth * 2); //todo BURN

        // Add the increment to the current fold, then push it to array.
        curFold += (WATER_INC * 2);
        stackSizes.push(curFold); // Add full pleat section to array.
        console.log("Adding pleat section: " + curFold); //todo BURN

        console.log("Looping: " + k);
    }

    // Add final pocket.
    stackSizes.push(blind.pocketsDepth * 2);
    console.log("Adding pocket: " + blind.pocketsDepth * 2); //todo BURN

    // Add final half pleat section to array for bottom of blind.
    var finalFold = (curFold + (WATER_INC * 2)) / 2;
    stackSizes.push(finalFold);
    console.log("Adding final pleat: " + finalFold);

    // Add final hem turnings to array for bottom of blind.
    stackSizes.push(blind.hemTurnings);
    console.log("Adding hem turnings: " + blind.hemTurnings);

    blind.cutLengthLining = stackSizes.reduce(getSum);
    blind.cutLengthFabInner = +blind.height + +blind.hemTurnings;
    blind.pocketsTotalLength = (blind.pocketsDepth * 2) * blind.stackFolds;
    console.log("Lining total size (+15 turning allowance): " + blind.cutLengthLining);
    console.log("Fab Inner total size (+15 turning allowance): " + blind.cutLengthFabInner);
    console.log("Total pockets length: " + blind.pocketsTotalLength);
    return stackSizes;
}


/**
 * Calculates the stack of a blind with an additional show at the final pleat.
 * @returns {Array} of measurements used by "generateBlind" to build drawing.
 */
function autoCalcStackShowingHem() {
    var stackSizes = []; // Populate with generated values and returned.
    var totalDepth = +blind.height - +blind.showingHemSize;
    console.log("Total depth (" + blind.height + ") minus showing hem: " + totalDepth); //todo BURN

    // Add railing depth to array. Minus railing depth from blinds total depth.
    stackSizes.push(+blind.railingDepth);
    totalDepth -= +blind.railingDepth;
    console.log("Minus velcro/railing(" + +blind.railingDepth + "): " + totalDepth); //todo BURN

    /* For each fold, add depth from pocket to pocket, plus pocket itself. There are two folds per
     pocket, plus 1 for the bottom pleat. */
    var eachFold = round2DP(totalDepth / ((blind.stackFolds * 2) + 1));
    console.log("Each individual fold: " + eachFold);
    for (var k = 0; k < blind.stackFolds; k++) {

        stackSizes.push(eachFold * 2); // Add full pleat section to array.
        console.log("Adding pleat section: " + round2DP(eachFold * 2)); //todo BURN

        stackSizes.push(blind.pocketsDepth * 2); // Add pocket too.
        console.log("Adding pocket: " + round2DP(blind.pocketsDepth * 2)); //todo BURN

        console.log("Looping: " + k);
    }

    // Add half pleat section to array for bottom of blind. But add back showing hem size.
    var bottomPleat = eachFold + +blind.showingHemSize;
    stackSizes.push(bottomPleat);
    console.log("Adding final pleat: " + bottomPleat);

    // Add final hem turnings to array for bottom of blind.
    stackSizes.push(+blind.hemTurnings);
    console.log("Adding hem turnings: " + blind.hemTurnings);

    blind.cutLengthLining = stackSizes.reduce(getSum);
    blind.cutLengthFabInner = (+blind.height) + (+blind.hemTurnings);
    blind.pocketsTotalLength = (blind.pocketsDepth * 2) * blind.stackFolds;
    console.log("Lining total size (+15 turning allowance): " + +blind.cutLengthLining);
    console.log("Fab Inner total size (+15 turning allowance): " + blind.cutLengthFabInner);
    console.log("Total pockets length: " + blind.pocketsTotalLength);
    return stackSizes;
}


/**
 * Get Sum:
 * For summing numbers in arrays.
 * @param total
 * @param num
 * @returns the sum of the two added.
 */
function getSum(total, num) {
    return total + num;
}


/**
 * Initialise image variables:
 * Initialise variables for each grid image for blind drawing, and size each image to fit bounds.
 * */
function initImgVars() {
    /* Calculate how many images needed by width and height. Width is simply the amount of rings,
    double, then plus the initial side image. Height is pockets count, tripled, then plus 3 for
    velcro and bottom pleat. */
    var MAX_WIDTH = 21; // size of table on page in cm (page width = 21.6cm)
    var MAX_HEIGHT = 19; // (page height = 27.94cm)
    var MAX_IMG_SIZE = 1.5; // natural image size in cm, to avoid stretching.
    var gridNumWidth = (blind.ringsCount * 2) + 1 + 1; // +1 for initial edge, +1 again for dimension lines
    var gridNumHeight = (blind.stackFolds * 4) + 3 + 1; // +3 for 2 bottom pieces and velcro, +1 again for dimensions.
    console.log("Grid width: " + gridNumWidth); //Debug
    console.log("Grid height: " + gridNumHeight);

    /* Establish the size of grids needed to fit blind in width wise, and with height wise, then
    use then compare against the images default size. Use smallest of the three to prevent image
    stretching. */
    var gridDivWidth = +MAX_WIDTH / +gridNumWidth;
    var gridDivHeight = +MAX_HEIGHT / +gridNumHeight;
    var imageSize = (Math.min(gridDivWidth, gridDivHeight, MAX_IMG_SIZE)).toFixed(2);
    var imageSizeStyle = "style='width: " + imageSize + "cm'";
    var imageSizeStyleDW = "style='width: " + (imageSize * 2) + "cm'";
    console.log("Image size: " + imageSize + "cm"); //Debug

    // Set table width to fix colspans
    /*$("#blindTable").css("width", (imageSize * gridNumWidth) + "cm");*/

    // VELCRO
    window.velcroLEFT = "<img src=img/workings/blind_img/velcro_LEFT_2.png " + imageSizeStyle + ">";
    window.velcroMIDDLE = "<img src=img/workings/blind_img/velcro_MIDDLE_2.png " + imageSizeStyle + ">";
    window.velcroRIGHT = "<img src=img/workings/blind_img/velcro_RIGHT_2.png " + imageSizeStyle + ">";

    // BLANKS
    window.blankLEFT = "<img src=img/workings/blind_img/blank_LEFT_2.png " + imageSizeStyle + ">";
    window.blankMIDDLE = "<img src=img/workings/blind_img/blank_MIDDLE_2.png " + imageSizeStyle + ">";
    window.blankMIDDLEDW = "<img src=img/workings/blind_img/blank_MIDDLE_DW_2.png " + imageSizeStyleDW + ">";
    window.blankRIGHT = "<img src=img/workings/blind_img/blank_RIGHT_2.png " + imageSizeStyle + ">";
    // FOLDS
    window.foldLEFT = "<img src=img/workings/blind_img/fold_LEFT_2.png " + imageSizeStyle + ">";
    window.foldMIDDLE = "<img src=img/workings/blind_img/fold_MIDDLE_2.png " + imageSizeStyle + ">";
    window.foldRIGHT = "<img src=img/workings/blind_img/fold_RIGHT_2.png " + imageSizeStyle + ">";
    // POCKETS
    window.pocketLEFT = "<img src=img/workings/blind_img/pocket_LEFT_2.png " + imageSizeStyle + ">";
    window.pocketMIDDLE = "<img src=img/workings/blind_img/pocket_MIDDLE_2.png " + imageSizeStyle + ">";
    window.pocketRINGSPOT = "<img src=img/workings/blind_img/pocket_RING_SPOT_2.png " + imageSizeStyle + ">";
    window.pocketRIGHT = "<img src=img/workings/blind_img/pocket_RIGHT_2.png " + imageSizeStyle + ">";
    // HEM
    window.hemLEFT = "<img src=img/workings/blind_img/hem_LEFT_2.png " + imageSizeStyle + ">";
    window.hemMIDDLE = "<img src=img/workings/blind_img/hem_MIDDLE_2.png " + imageSizeStyle + ">";
    window.hemRIGHT = "<img src=img/workings/blind_img/hem_RIGHT_2.png " + imageSizeStyle + ">";
    // DIMENSIONS: Vertical
    window.arrowUP = "<img src=img/workings/blind_img/arrow_up.png " + imageSizeStyle + ">";
    window.lineVERTICAL = "<img src=img/workings/blind_img/line_vertical.png " + imageSizeStyle + ">";
    window.arrowDOWN = "<img src=img/workings/blind_img/arrow_down.png " + imageSizeStyle + ">";
    // DIMENSIONS: Horizontal
    window.arrowLEFT = "<img src=img/workings/blind_img/arrow_left.png " + imageSizeStyle + ">";
    window.lineHORIZONTAL = "<img src=img/workings/blind_img/line_horizontal.png " + imageSizeStyle + ">";
    window.arrowRIGHT = "<img src=img/workings/blind_img/arrow_right.png " + imageSizeStyle + ">";
}


/**
 * Write Labels on Dimensions
 * Write the labels on the drawings dimensional guides now that the drawing is made.
 */
function writeDimensionLabels() {
    // Pure JS allows table index searching.
    var blindTable = document.getElementById("blindTable");

    // Get the total rows and columns of the table
    var totalRows = blindTable.rows.length;
    var totalCols = blindTable.rows[0].cells.length;

    // Pick middle cells.
    var middleRow = Math.floor(totalRows / 2); // Always favour upper
    var middleCol = Math.ceil(totalCols / 2);

    // Save cell locations now found.
    var cellVertical = blindTable.rows[middleRow].cells[0];
    var cellHorizontal = blindTable.rows[totalRows - 1].cells[middleCol]; // last row

    // Update class of existing TD's for CSS styling.
    cellVertical.classList.add("labelImg");
    cellVertical.classList.add("labelImgDimensions");
    cellVertical.innerHTML = window.lineVERTICAL + "<span>" + blind.height + "</span>";

    cellHorizontal.classList.add("labelImg");
    cellHorizontal.classList.add("labelImgDimensions");
    cellHorizontal.innerHTML = window.lineHORIZONTAL + "<span>" + blind.width + "</span>";


    /*foldL.append("<td class='labelImg'>" + window.blankMIDDLE +
        "<span>" + round1DP(stackSizes.pop()) + "</span></td><td>" + window.blankMIDDLE +
        "</td>");*/


    /*hem.append("<td>" + window.hemMIDDLE + "</td><td class='labelImg'>" +
        window.hemMIDDLE + "<span class='lblImgSmall'>" + round1DP(stackSizes.pop()) +
        "</span></td>");*/

}



/**
 * Write measure details:
 * Write cut length details at bottom of drawing.
 */
function writeMeasureDetails() {
    /* Fabric and Inner linings:
    If there is an inner lining, include it with the fabric cut details. Else, don't. */
    if (blind.liningIsInner) {
        $("#fabricMeasures").append("Fabric:" + round1DP(blind.liningInner) + ":" +
            "<ul>" + "<li>" + round1DP(blind.height) + "</li><li>+" + round1DP(blind.hemTurnings) +
            "</li>" + "<li class='cutSum'>" + round1DP(blind.cutLengthFabInner) + " " +
            blind.widthUnit + "</li></ul>");
    } else {
        $("#fabricMeasures").append("Fabric:<ul><li>" + round1DP(blind.height) + "</li><li>+"
            + round1DP(blind.hemTurnings) + "</li><li class='cutSum'>" +
            round1DP(blind.cutLengthFabInner) + " " + blind.widthUnit + "</li></ul>");
    }
    /* Outer Linings: */
    $("#liningMeasures").append("Lining:<ul><li>" + round1DP(blind.cutLengthFabInner) + "</li>" +
        "<li>+" + round1DP(blind.pocketsTotalLength) + "</li><li class='cutSum'>" +
        round1DP(+blind.cutLengthFabInner + +blind.pocketsTotalLength) + " " +
        blind.widthUnit + "</li></ul>");
}

/**
 * Write Number of Blinds and Widths
 * Write the info for number of blinds and widths per blind.
 */
function writeNumWidthsInfo() {
    var numWidthsText = $("#numWidthsInfo");
    var numWidths = +blind.noOfWidths;
    var numBlinds = +blind.noOfBlinds;

    numWidthsText.append(numBlinds + " \327 ");

    // Determine read-friendly way of expressing number of widths.
    if (numWidths === 1) {
        numWidthsText.append("SWB"); // SWB = Single-Width Blind
    } else if (numWidths === 2) {
        numWidthsText.append("DWB"); // DWB = Double-wide blind
    } else {
        numWidthsText.append(numWidths + "-width blinds");
    }

    // Total cuts needed is number of blinds times number of widths per blind.
    var totalCuts = numBlinds * numWidths;
    if (totalCuts > 1) {
        numWidthsText.append(" = " + totalCuts + " cuts total");
        // Elaborate if more than 1 blind.
        if (numBlinds > 1) {
            numWidthsText.append(" (" + numWidths + " per blind).");
        }
    } else {
        numWidthsText.append(" = " + totalCuts + " cut total");
    }
}


/**
 * Round2PD rounds numbers up to 2 decimal places.
 * @param value to be rounded.
 * @returns {number} rounded.
 */
function round2DP(value) {
    return Math.round((value) * 100) / 100;
}


/**
 * Round1PD rounds numbers up to 1 decimal place.
 * @param value to be rounded.
 * @returns {number} rounded.
 */
function round1DP(value) {
    return Math.round((value) * 10) / 10;
}
