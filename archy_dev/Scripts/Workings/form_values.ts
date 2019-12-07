import * as $ from "jquery";

namespace control_panel {
    /**
     * FORM VALUES
     * Defaults, replaced and updated every time users changed them.
     */
    function formValues() {
        // DETAILS
        // Client
        $("#clientTextBox").change(function () {
            /*Use manually entered value if there is one, otherwise use default.*/
            if (!(this.value === "")) {
                blind.detailsClient = this.value;
                console.log("Details client change: " + blind.detailsClient);
            } else {
                blind.detailsClient = DEFAULT_DETAILS_PLACEHOLDER;
                console.log("Details client change, using default (" + DEFAULT_DETAILS_PLACEHOLDER + ")");
            }
        });
        // Customer
        $("#customerTextBox").change(function () {
            /*Use manually entered value if there is one, otherwise use default.*/
            if (!(this.value === "")) {
                blind.detailsCustomer = this.value;
                console.log("Details customer change: " + blind.detailsCustomer);
            } else {
                blind.detailsCustomer = DEFAULT_DETAILS_PLACEHOLDER;
                console.log("Details customer change, using default (" + DEFAULT_DETAILS_PLACEHOLDER + ")");
            }
        });
        // Reference
        $("#referenceTextBox").change(function () {
            /*Use manually entered value if there is one, otherwise use default.*/
            if (!(this.value === "")) {
                blind.detailsReference = this.value;
                console.log("Details reference change: " + blind.detailsReference);
            } else {
                blind.detailsReference = DEFAULT_DETAILS_PLACEHOLDER;
                console.log("Details reference change, using default (" + DEFAULT_DETAILS_PLACEHOLDER + ")");
            }
        });
        // Number of Blinds:
        $("#numOfBlinds").change(function () {
            /*Use manually entered value if there is one, otherwise use default.*/
            if (!(this.value === "")) {
                blind.noOfBlinds = +this.value;
                console.log("Details no. blinds change: " + blind.noOfBlinds);
            } else {
                blind.noOfBlinds = DEFAULT_NO_BLINDS;
                console.log("Details no. blinds change, using default (" + blind.noOfBlinds + ")");
            }
        });
        // Number of Blinds: plus button
        $("#numBlindsPlus").click(function () {
            var numBlinds = $("#numOfBlinds");
            if (numBlinds.val() === "") {
                blind.noOfBlinds = 2; // Already assumed to be 1, then add 1.
                numBlinds.val(blind.noOfBlinds);
            } else {
                var currVal = parseInt(numBlinds.val());
                numBlinds.val(currVal + 1);
                blind.noOfBlinds = +numBlinds.val();
            }
            console.log("Number of Blinds change: " + blind.noOfBlinds);
            // Enable minus button again now value must be greater than 1.
            $("#numBlindsMinus").attr("disabled", false);
        });
        // Number of Blinds: minus button
        $("#numBlindsMinus").click(function () {
            var numBlinds = $("#numOfBlinds");
            if (numBlinds.val() === "") {
                blind.noOfBlinds = 1; // Already assumed to be 1, then cant reduce any more.
                numBlinds.val(blind.noOfBlinds);
            } else {
                var currVal = parseInt(numBlinds.val());
                // Only subtract if more than 1.
                if (currVal > 1) {
                    currVal = currVal - 1;
                    numBlinds.val(currVal);
                    blind.noOfBlinds = +numBlinds.val();
                    // If current value is now 1, then disable button (re-enabled by plus).
                    if (currVal === 1) {
                        $("#numBlindsMinus").attr("disabled", true);
                    }
                }
            }
            console.log("Number of Blinds change: " + blind.noOfBlinds);
        });

        // DIMENSIONS
        // Width
        $("#width").change(function () {
            // Required so no validation needed.
            blind.width = +this.value;
            console.log("Blind width change: " + blind.width);
        });
        $("#widthUnit").change(function () { // Width unit used.
            var width = $("#width");
            var widthOld = width.val();
            var widthNew = width.val();

            //Convert width numerical value to cm and log progress to console.
            if (this.value === "in") {
                width.val(round1DP(widthNew *= 2.54));
            } else if (this.value === "mm") {
                width.val(round1DP(widthNew /= 10));
            }
            console.log("Blind width unit change: " + widthOld + this.value + "'s changed to " +
                widthNew + "cm's.");

            // Reset CM as the selected value, update blind width to reflect new value, update console.
            $("#widthUnit").val("cm");
            blind.widthUnit = this.value;
            blind.width = +widthNew;
            console.log("Blind width change: " + blind.width + blind.heightUnit + "'s.");
        });

        // Height
        $("#height").change(function () {
            // Required so no validation needed.
            blind.height = +this.value;
            console.log("Blind height change: " + blind.height);
        });
        $("#heightUnit").change(function () { // Height unit used.
            var height = $("#height");
            var heightOld = height.val();
            var heightNew = height.val();

            // Convert height numerical value to cm and log progress to console.
            if (this.value === "in") {
                height.val(round1DP(heightNew *= 2.54));
            } else if (this.value === "mm") {
                height.val(round1DP(heightNew /= 10));
            }
            console.log("Blind height unit change: " + heightOld + this.value + "'s changed to " +
                heightNew + "cm's.");

            // Reset CM as the selected value, update blind height to reflect new value, update console.
            $("#heightUnit").val("cm");
            blind.heightUnit = this.value;
            blind.height = +heightNew;
            console.log("Blind height change: " + blind.height + blind.heightUnit + "'s.");
        });

        // Number of Widths
        $("#numOfWidths").change(function () {
            /*Use manually entered value if there is one, otherwise use default.*/
            if (!(this.value === "")) {
                blind.noOfWidths = +this.value;
                console.log("Number of Widths change: " + blind.noOfWidths);
            } else {
                blind.noOfWidths = DEFAULT_NO_WIDTHS;
                console.log("Number of Widths change, using default (" + blind.noOfWidths + ")");
            }
            // Enable manual overwrite now user has interacted
            widthsManualOverwrite = true;
        });
        // Number of Widths: plus button
        $("#numWidthsPlus").click(function () {
            var numWidths = $("#numOfWidths");
            if (numWidths.val() === "") {
                blind.noOfWidths = 2; // Already assumed to be 1, then add 1.
                numWidths.val(blind.noOfWidths);
            } else {
                var currVal = parseInt(numWidths.val());
                numWidths.val(currVal + 1);
                blind.noOfWidths = +numWidths.val();
            }
            console.log("Number of Widths change: " + blind.noOfWidths);
            // Enable manual overwrite now user has interacted.
            widthsManualOverwrite = true;

            // Enable minus button again now value must be greater than 1.
            $("#numWidthsMinus").attr("disabled", false);
        });
        // Number of Widths: minus button
        $("#numWidthsMinus").click(function () {
            var numWidths = $("#numOfWidths");
            if (numWidths.val() === "") {
                blind.noOfWidths = 1; // Already assumed to be 1, then cant reduce any more.
                numWidths.val(blind.noOfWidths);
            } else {
                var currVal = parseInt(numWidths.val());
                // Only subtract if more than 1.
                if (currVal > 1) {
                    currVal = currVal - 1;
                    numWidths.val(currVal);
                    blind.noOfWidths = +numWidths.val();
                    // If current value is now 1, then disable button (re-enabled by plus).
                    if (currVal === 1) {
                        $("#numWidthsMinus").attr("disabled", true);
                    }
                }
            }
            console.log("Number of Widths change: " + blind.noOfWidths);
            // Enable manual overwrite now user has interacted.
            widthsManualOverwrite = true
        });

        // FABRIC
        // Cut width
        $("#fabricCutWidth").change(function () {
            /*Use manually entered value if there is one, otherwise use default.*/
            if (!(this.value === "")) {
                blind.fabricCutWidth = +this.value;
                console.log("Fabric cut width change: " + blind.fabricCutWidth);
            } else {
                blind.fabricCutWidth = DEFAULT_FAB_CUT_WIDTH;
                console.log("Fabric cut width change, using default (" + DEFAULT_FAB_CUT_WIDTH + ")");
            }
            /**
             * ADD HANDLER FOR CM/INCH
             */
        });
        // Repeat
        $("#fabricRepeat").change(function () {
            /*Use manually entered value if there is one, otherwise use default.*/
            if (!(this.value === "")) {
                blind.fabricRepeat = +this.value;
                console.log("Fabric repeat change: " + blind.fabricRepeat);
            } else {
                blind.fabricRepeat = DEFAULT_FAB_REPEAT;
                console.log("Fabric repeat change, using default (" + DEFAULT_FAB_REPEAT + ")");
            }
            /**
             * ADD HANDLER FOR CM/INCH
             */
        });

        // LININGS
        // Inner
        $("#liningsInner").change(function () {
            blind.liningInner = this.value;
            console.log("Linings inner change " + blind.liningInner);
            /**
             * ADD HANDLER FOR IF EMPTY isLiningsInner BOOLEAN
             */
        });
        // Outer
        $("#liningsOuter").change(function () {
            blind.liningOuter = this.value;
            console.log("Linings outer change: " + blind.liningOuter);
        });

        // RAILING
        // Type
        $("#railingType").on('input', function () {
            blind.railingType = this.value;
            console.log("Railing type change: " + blind.railingType);
            var depthText = $("#railingDepth");

            /*If input type is Baton, Evans or Hallis, use the default railing depth for that type. Else
            * use the manually input type. If no input type given at all, use default.*/
            if (blind.railingType === "Baton") {
                blind.railingDepth = DEFAULT_RAIL_BATON;
                depthText.val(DEFAULT_RAIL_BATON);
                console.log("Railing BATON chosen, using " + DEFAULT_RAIL_BATON + " for depth.");
            } else if (blind.railingType === "Evans") {
                blind.railingDepth = DEFAULT_RAIL_EVANS;
                depthText.val(DEFAULT_RAIL_EVANS);
                console.log("Railing EVANS chosen, using " + DEFAULT_RAIL_EVANS + " for depth.");
            } else if (blind.railingType === "Hallis") {
                blind.railingDepth = DEFAULT_RAIL_HALLIS;
                depthText.val(DEFAULT_RAIL_HALLIS);
                console.log("Railing HALLIS chosen, using " + DEFAULT_RAIL_HALLIS + " for depth.");
            } else {
                /*None of the above so use manually entered value if there is one, otherwise use
                default.*/
                if (!(this.value === "")) {
                    blind.railingType = this.value;
                    console.log("Railing type change: " + blind.railingDepth);
                } else {
                    blind.railingType = DEFAULT_RAILING_TYPE;
                    // If the railing depth text box is empty, assign default value, otherwise keep what it is.
                    if (depthText.val() === "") {
                        blind.railingDepth = DEFAULT_RAILING_DEPTH;
                        depthText.val(DEFAULT_RAILING_DEPTH);
                    }
                    console.log("Railing type change, using default (" + DEFAULT_RAILING_TYPE + ")");
                }
            }
        });
        // Depth
        $("#railingDepth").change(function () {
            /*If value not empty use it, otherwise user entered a value then deleted it after, so do
            nothing as not to override the defaults above.*/
            if (!(this.value === "")) {
                blind.railingDepth = +this.value;
                console.log("Railing depth change: " + blind.railingDepth);
            } else {
                /*Value entered deleted, so revert back to default. If existing railing type is not default, set it to
                that types default value. Otherwise revert to standard default.*/
                var depthText = $("#railingDepth");
                if (blind.railingType !== DEFAULT_RAILING_TYPE) {
                    if (blind.railingType === "Baton") {
                        blind.railingDepth = DEFAULT_RAIL_BATON;
                        depthText.val(DEFAULT_RAIL_BATON);
                        console.log("Railing depth deleted, reverting to BATON default " + DEFAULT_RAIL_BATON + " for depth.");
                    } else if (blind.railingType === "Evans") {
                        blind.railingDepth = DEFAULT_RAIL_EVANS;
                        depthText.val(DEFAULT_RAIL_EVANS);
                        console.log("Railing depth deleted, reverting to EVANS default " + DEFAULT_RAIL_EVANS + " for depth.");
                    } else if (blind.railingType === "Hallis") {
                        blind.railingDepth = DEFAULT_RAIL_HALLIS;
                        depthText.val(DEFAULT_RAIL_HALLIS);
                        console.log("Railing depth deleted, reverting to HALLIS default " + DEFAULT_RAIL_HALLIS + " for depth.");
                    }
                } else {
                    blind.railingDepth = DEFAULT_RAILING_DEPTH;
                    depthText.val(DEFAULT_RAILING_DEPTH);
                    console.log("Railing depth change, using default (" + DEFAULT_RAILING_DEPTH + ")");
                }
            }
            /**
             * ADD HANDLER FOR CM/INCH
             */
        });
        $("#railingUnit").change(function () { // Railing depth unit
            var railingDepth = $("#railingDepth");
            var depthOld = railingDepth.val();
            var depthNew = railingDepth.val();

            // Convert railing depth numerical value to cm and log progress to console.
            if (this.value === "in") {
                railingDepth.val(round1DP(depthNew *= 2.54));
            } else if (this.value === "mm") {
                railingDepth.val(round1DP(depthNew /= 10));
            }
            console.log("Blind railing depth unit change: " + depthOld + this.value + "'s changed to " +
                depthNew + "cm's.");

            // Reset CM as the selected value, update blind railing depth to reflect new value, update console.
            $("#railingUnit").val("cm");
            blind.railingUnit = this.value;
            blind.railingDepth = +depthNew;
            console.log("Blind railing depth change: " + blind.railingDepth + blind.railingUnit + "'s.");
        });


        // STACK
        // Type
        $("#selectStack").change(function () {
            blind.stackType = this.value;
            console.log("Stack type change: " + blind.stackType);
        });
        // Waterfall
        $("#waterfallIncrements").change(function () {
            /*If value not empty use it, otherwise user entered a value then deleted it after, so do
             nothing as not to override the defaults above. Otherwise revert to default.*/
            if (!(this.value === "")) {
                blind.waterfallIncrement = +this.value;
                console.log("Waterfall increment change: " + blind.waterfallIncrement);
            } else {
                blind.waterfallIncrement = DEFAULT_WATERFALL_INCREMENT;
            }
        });
        $("#waterfallUnit").change(function () { // Waterfall/cascade increment unit
            var waterIncrements = $("#waterfallIncrements");
            var incrementsOld = waterIncrements.val();
            var incrementsNew = waterIncrements.val();

            // Convert waterfall increments numerical value to cm and log progress to console.
            if (this.value === "in") {
                waterIncrements.val(round1DP(incrementsNew *= 2.54));
            } else if (this.value === "mm") {
                waterIncrements.val(round1DP(incrementsNew /= 10));
            }
            console.log("Blind waterfall increments unit change: " + incrementsOld + this.value +
                "'s changed to " + incrementsNew + "cm's.");

            /*Reset CM as the selected value, update blind waterfall increments to reflect new value,
            update console.*/
            $("#waterfallUnit").val("cm");
            blind.waterfallIncrementUnit = this.value;
            blind.waterfallIncrement = +incrementsNew;
            console.log("Blind railing depth change: " + blind.waterfallIncrement +
                blind.waterfallIncrementUnit + "'s.");
        });


        // Showing Hem
        $("#showingHemSize").change(function () {
            /*If value not empty use it, otherwise user entered a value then deleted it after, so do
             nothing as not to override the defaults above. Otherwise revert to default.*/
            if (!(this.value === "")) {
                blind.showingHemSize = +this.value;
                console.log("Showing hem size change " + blind.showingHemSize);
            } else {
                blind.showingHemSize = DEFAULT_SHOWING_HEM;
            }
        });
        $("#showingUnit").change(function () { // Showing hem size unit
            var showingSize = $("#showingHemSize");
            var showingOld = showingSize.val();
            var showingNew = showingSize.val();

            // Convert showing hem size numerical value to cm and log progress to console.
            if (this.value === "in") {
                showingSize.val(round1DP(showingNew *= 2.54));
            } else if (this.value === "mm") {
                showingSize.val(round1DP(showingNew /= 10));
            }
            console.log("Blind showing hem size unit change: " + showingOld + this.value +
                "'s changed to " + showingNew + "cm's.");

            /*Reset CM as the selected value, update blind showing hem size to reflect new value,
            update console.*/
            $("#showingUnit").val("cm");
            blind.showingHemUnit = this.value;
            blind.showingHemSize = +showingNew;
            console.log("Blind showing hem size change: " + blind.showingHemSize +
                blind.showingHemUnit + "'s.");
        });


        // Folds count
        $("#sliderFoldsCount").change(function () {
            blind.stackFolds = this.value;
            console.log("Stack folds change: " + blind.stackFolds);

            // Manual overwrite, else value auto generated.
            foldsManualOverwrite = true;
        });

        // POCKETS
        // Depth
        $("#pocketsDepth").change(function () {
            /*Use manually entered value if there is one, otherwise use default.*/
            if (!(this.value === "")) {
                blind.pocketsDepth = +this.value;
                console.log("Pocket depth change: " + blind.pocketsDepth);
            } else {
                blind.pocketsDepth = DEFAULT_POCKET_DEPTH;
                console.log("Pocket depth change, using default (" + DEFAULT_POCKET_DEPTH + ")");
            }
            /**
             * ADD HANDLER FOR CM/INCH
             */
        });

        // RINGS
        // Type
        $("#ringsType").change(function () {
            blind.ringsType = this.value;
            console.log("Rings type change: " + blind.ringsType);
        });
        // Margins
        $("#ringsMargin").change(function () {
            /*Use manually entered value if there is one, otherwise use default.*/
            if (!(this.value === "")) {
                blind.ringsMargin = +this.value;
                console.log("Rings margin change: " + blind.ringsMargin);
            } else {
                blind.ringsMargin = DEFAULT_RING_MARGIN;
                console.log("Rings margin change, using default (" + DEFAULT_RING_MARGIN + ")");
            }
            /**
             * ADD HANDLER FOR CM/INCH
             */
        });
        // Count
        $("#ringsCount").change(function () {
            blind.ringsCount = this.value;
            console.log("Ring count change:" + blind.ringsCount);

            // Manual overwrite, else value auto generated
            ringsManualOverwrite = true;
        })
    }
}