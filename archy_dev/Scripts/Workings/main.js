"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const $ = require("jquery");
const blind_1 = require("./blind");
var control_panel;
(function (control_panel) {
    /* Global Selectors */
    const section_waterfall = $("#waterfall");
    function reset() {
        // Write to console
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        console.log("RESET ALL:");
        console.log("---------");
        section_waterfall.slideUp("slow");
        $("#showingHem").slideUp("slow");
        // Show the placeholder
        $("#placeHolder").show("fast", function () {
        });
        $("#centrePlaceHolder").show("slow", function () {
        });
        // Hide the existing drawing.
        $("#blindDrawing").hide("fast", function () {
        });
        $("#jobDetails").hide("fast", function () {
        });
        $("#measureDetails").hide("fast", function () {
        });
        $("#disclaimer").hide("fast", function () {
        });
        $("#numWidthsInfo").hide("fast", function () {
        });
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
        let blind = new blind_1.Blind();
    }
})(control_panel || (control_panel = {}));
//# sourceMappingURL=main.js.map