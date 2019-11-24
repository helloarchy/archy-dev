/**
 * A blind is only a blind and not a client or customer
 */
var Blind = /** @class */ (function () {
    /**
     * Create a new bind using default values where overriding values are not provided
     * @param width
     * @param width_unit
     * @param height
     * @param height_unit
     * @param num_widths
     * @param fabric_cut_width
     * @param fabric_repeat
     * @param lining_inner_type
     * @param lining_is_inner
     * @param lining_outer_type
     * @param railing_type
     * @param railing_depth
     * @param stack_type
     * @param waterfall_increment
     * @param showing_hem_size
     * @param stack_folds
     * @param pockets_depth
     * @param rings_type
     * @param rings_margin
     * @param rings_count
     * @param hem_turnings
     * @param cut_length_lining
     * @param cut_length_fabric_inner
     * @param pockets_total_length
     */
    function Blind(width, width_unit, height, height_unit, num_widths, fabric_cut_width, fabric_repeat, lining_inner_type, lining_is_inner, lining_outer_type, railing_type, railing_depth, stack_type, waterfall_increment, showing_hem_size, stack_folds, pockets_depth, rings_type, rings_margin, rings_count, hem_turnings, cut_length_lining, cut_length_fabric_inner, pockets_total_length) {
        if (num_widths === void 0) { num_widths = 1; }
        if (fabric_cut_width === void 0) { fabric_cut_width = 123.5; }
        if (railing_type === void 0) { railing_type = "Railing"; }
        if (railing_depth === void 0) { railing_depth = 6; }
        if (waterfall_increment === void 0) { waterfall_increment = 2.5; }
        if (showing_hem_size === void 0) { showing_hem_size = 2.5; }
        if (pockets_depth === void 0) { pockets_depth = 3; }
        if (rings_margin === void 0) { rings_margin = 10.5; }
        this._width = width;
        this._width_unit = width_unit;
        this._height = height;
        this._height_unit = height_unit;
        this._num_widths = num_widths;
        this._fabric_cut_width = fabric_cut_width;
        this._fabric_repeat = fabric_repeat;
        this._lining_inner_type = lining_inner_type;
        this._lining_is_inner = lining_is_inner;
        this._lining_outer_type = lining_outer_type;
        this._railing_type = railing_type;
        this._railing_depth = railing_depth;
        this._stack_type = stack_type;
        this._waterfall_increment = waterfall_increment;
        this._showing_hem_size = showing_hem_size;
        this._stack_folds = stack_folds;
        this._pockets_depth = pockets_depth;
        this._rings_type = rings_type;
        this._rings_margin = rings_margin;
        this._rings_count = rings_count;
        this._hem_turnings = hem_turnings;
        this._cut_length_lining = cut_length_lining;
        this._cut_length_fabric_inner = cut_length_fabric_inner;
        this._pockets_total_length = pockets_total_length;
    }
    Object.defineProperty(Blind.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "width_unit", {
        get: function () {
            return this._width_unit;
        },
        set: function (value) {
            this._width_unit = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "height_unit", {
        get: function () {
            return this._height_unit;
        },
        set: function (value) {
            this._height_unit = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "num_widths", {
        get: function () {
            return this._num_widths;
        },
        set: function (value) {
            this._num_widths = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "fabric_cut_width", {
        get: function () {
            return this._fabric_cut_width;
        },
        set: function (value) {
            this._fabric_cut_width = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "fabric_repeat", {
        get: function () {
            return this._fabric_repeat;
        },
        set: function (value) {
            this._fabric_repeat = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "lining_inner_type", {
        get: function () {
            return this._lining_inner_type;
        },
        set: function (value) {
            this._lining_inner_type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "lining_is_inner", {
        get: function () {
            return this._lining_is_inner;
        },
        set: function (value) {
            this._lining_is_inner = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "lining_outer_type", {
        get: function () {
            return this._lining_outer_type;
        },
        set: function (value) {
            this._lining_outer_type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "railing_type", {
        get: function () {
            return this._railing_type;
        },
        set: function (value) {
            this._railing_type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "railing_depth", {
        get: function () {
            return this._railing_depth;
        },
        set: function (value) {
            this._railing_depth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "stack_type", {
        get: function () {
            return this._stack_type;
        },
        set: function (value) {
            this._stack_type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "waterfall_increment", {
        get: function () {
            return this._waterfall_increment;
        },
        set: function (value) {
            this._waterfall_increment = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "showing_hem_size", {
        get: function () {
            return this._showing_hem_size;
        },
        set: function (value) {
            this._showing_hem_size = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "stack_folds", {
        get: function () {
            return this._stack_folds;
        },
        set: function (value) {
            this._stack_folds = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "pockets_depth", {
        get: function () {
            return this._pockets_depth;
        },
        set: function (value) {
            this._pockets_depth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "rings_type", {
        get: function () {
            return this._rings_type;
        },
        set: function (value) {
            this._rings_type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "rings_margin", {
        get: function () {
            return this._rings_margin;
        },
        set: function (value) {
            this._rings_margin = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "rings_count", {
        get: function () {
            return this._rings_count;
        },
        set: function (value) {
            this._rings_count = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "hem_turnings", {
        get: function () {
            return this._hem_turnings;
        },
        set: function (value) {
            this._hem_turnings = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "cut_length_lining", {
        get: function () {
            return this._cut_length_lining;
        },
        set: function (value) {
            this._cut_length_lining = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "cut_length_fabric_inner", {
        get: function () {
            return this._cut_length_fabric_inner;
        },
        set: function (value) {
            this._cut_length_fabric_inner = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blind.prototype, "pockets_total_length", {
        get: function () {
            return this._pockets_total_length;
        },
        set: function (value) {
            this._pockets_total_length = value;
        },
        enumerable: true,
        configurable: true
    });
    return Blind;
}());
//# sourceMappingURL=blind.js.map