"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A blind is only a blind and not a client or customer
 */
class Blind {
    /**
     * Create a new bind using default values
     */
    constructor() {
        this._width = 0;
        this._width_unit = "cm";
        this._height = 0;
        this._height_unit = "cm";
        this._num_widths = 1;
        this._fabric_cut_width = 123.5;
        this._fabric_repeat = 23.45;
        this._lining_inner_type = "Unspecified";
        this._lining_is_inner = false;
        this._lining_outer_type = "Unspecified";
        this._railing_type = "Railing";
        this._railing_depth = 6;
        this._stack_type = "Normal";
        this._waterfall_increment = 2.5;
        this._showing_hem_size = 2.5;
        this._stack_folds = 4;
        this._pockets_depth = 3;
        this._rings_type = "Unspecified";
        this._rings_margin = 10.5;
        this._rings_count = 5;
        this._hem_turnings = 15;
        this._cut_length_lining = 0;
        this._cut_length_fabric_inner = 0;
        this._pockets_total_length = 0;
    }
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
    }
    get width_unit() {
        return this._width_unit;
    }
    set width_unit(value) {
        this._width_unit = value;
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
    }
    get height_unit() {
        return this._height_unit;
    }
    set height_unit(value) {
        this._height_unit = value;
    }
    get num_widths() {
        return this._num_widths;
    }
    set num_widths(value) {
        this._num_widths = value;
    }
    get fabric_cut_width() {
        return this._fabric_cut_width;
    }
    set fabric_cut_width(value) {
        this._fabric_cut_width = value;
    }
    get fabric_repeat() {
        return this._fabric_repeat;
    }
    set fabric_repeat(value) {
        this._fabric_repeat = value;
    }
    get lining_inner_type() {
        return this._lining_inner_type;
    }
    set lining_inner_type(value) {
        this._lining_inner_type = value;
    }
    get lining_is_inner() {
        return this._lining_is_inner;
    }
    set lining_is_inner(value) {
        this._lining_is_inner = value;
    }
    get lining_outer_type() {
        return this._lining_outer_type;
    }
    set lining_outer_type(value) {
        this._lining_outer_type = value;
    }
    get railing_type() {
        return this._railing_type;
    }
    set railing_type(value) {
        this._railing_type = value;
    }
    get railing_depth() {
        return this._railing_depth;
    }
    set railing_depth(value) {
        this._railing_depth = value;
    }
    get stack_type() {
        return this._stack_type;
    }
    set stack_type(value) {
        this._stack_type = value;
    }
    get waterfall_increment() {
        return this._waterfall_increment;
    }
    set waterfall_increment(value) {
        this._waterfall_increment = value;
    }
    get showing_hem_size() {
        return this._showing_hem_size;
    }
    set showing_hem_size(value) {
        this._showing_hem_size = value;
    }
    get stack_folds() {
        return this._stack_folds;
    }
    set stack_folds(value) {
        this._stack_folds = value;
    }
    get pockets_depth() {
        return this._pockets_depth;
    }
    set pockets_depth(value) {
        this._pockets_depth = value;
    }
    get rings_type() {
        return this._rings_type;
    }
    set rings_type(value) {
        this._rings_type = value;
    }
    get rings_margin() {
        return this._rings_margin;
    }
    set rings_margin(value) {
        this._rings_margin = value;
    }
    get rings_count() {
        return this._rings_count;
    }
    set rings_count(value) {
        this._rings_count = value;
    }
    get hem_turnings() {
        return this._hem_turnings;
    }
    set hem_turnings(value) {
        this._hem_turnings = value;
    }
    get cut_length_lining() {
        return this._cut_length_lining;
    }
    set cut_length_lining(value) {
        this._cut_length_lining = value;
    }
    get cut_length_fabric_inner() {
        return this._cut_length_fabric_inner;
    }
    set cut_length_fabric_inner(value) {
        this._cut_length_fabric_inner = value;
    }
    get pockets_total_length() {
        return this._pockets_total_length;
    }
    set pockets_total_length(value) {
        this._pockets_total_length = value;
    }
}
exports.Blind = Blind;
//# sourceMappingURL=blind.js.map