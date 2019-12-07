/**
 * A blind is only a blind and not a client or customer
 */
export class Blind {
    private _width: number; // cm
    private _width_unit: string;
    private _height: number; // cm
    private _height_unit: string;
    private _num_widths: number;
    private _fabric_cut_width: number; // cm
    private _fabric_repeat: number; // cm
    private _lining_inner_type: string; // enum
    private _lining_is_inner: boolean;
    private _lining_outer_type: string;
    private _railing_type: string;
    private _railing_depth: number; // cm
    private _stack_type: string;
    private _waterfall_increment: number; // cm
    private _showing_hem_size: number; // cm
    private _stack_folds: number;
    private _pockets_depth: number; // cm
    private _rings_type: string;
    private _rings_margin: number;
    private _rings_count: number;
    private _hem_turnings: number;
    private _cut_length_lining: number;
    private _cut_length_fabric_inner: number;
    private _pockets_total_length: number;


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

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get width_unit(): string {
        return this._width_unit;
    }

    set width_unit(value: string) {
        this._width_unit = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }

    get height_unit(): string {
        return this._height_unit;
    }

    set height_unit(value: string) {
        this._height_unit = value;
    }

    get num_widths(): number {
        return this._num_widths;
    }

    set num_widths(value: number) {
        this._num_widths = value;
    }

    get fabric_cut_width(): number {
        return this._fabric_cut_width;
    }

    set fabric_cut_width(value: number) {
        this._fabric_cut_width = value;
    }

    get fabric_repeat(): number {
        return this._fabric_repeat;
    }

    set fabric_repeat(value: number) {
        this._fabric_repeat = value;
    }

    get lining_inner_type(): string {
        return this._lining_inner_type;
    }

    set lining_inner_type(value: string) {
        this._lining_inner_type = value;
    }

    get lining_is_inner(): boolean {
        return this._lining_is_inner;
    }

    set lining_is_inner(value: boolean) {
        this._lining_is_inner = value;
    }

    get lining_outer_type(): string {
        return this._lining_outer_type;
    }

    set lining_outer_type(value: string) {
        this._lining_outer_type = value;
    }

    get railing_type(): string {
        return this._railing_type;
    }

    set railing_type(value: string) {
        this._railing_type = value;
    }

    get railing_depth(): number {
        return this._railing_depth;
    }

    set railing_depth(value: number) {
        this._railing_depth = value;
    }

    get stack_type(): string {
        return this._stack_type;
    }

    set stack_type(value: string) {
        this._stack_type = value;
    }

    get waterfall_increment(): number {
        return this._waterfall_increment;
    }

    set waterfall_increment(value: number) {
        this._waterfall_increment = value;
    }

    get showing_hem_size(): number {
        return this._showing_hem_size;
    }

    set showing_hem_size(value: number) {
        this._showing_hem_size = value;
    }

    get stack_folds(): number {
        return this._stack_folds;
    }

    set stack_folds(value: number) {
        this._stack_folds = value;
    }

    get pockets_depth(): number {
        return this._pockets_depth;
    }

    set pockets_depth(value: number) {
        this._pockets_depth = value;
    }

    get rings_type(): string {
        return this._rings_type;
    }

    set rings_type(value: string) {
        this._rings_type = value;
    }

    get rings_margin(): number {
        return this._rings_margin;
    }

    set rings_margin(value: number) {
        this._rings_margin = value;
    }

    get rings_count(): number {
        return this._rings_count;
    }

    set rings_count(value: number) {
        this._rings_count = value;
    }

    get hem_turnings(): number {
        return this._hem_turnings;
    }

    set hem_turnings(value: number) {
        this._hem_turnings = value;
    }

    get cut_length_lining(): number {
        return this._cut_length_lining;
    }

    set cut_length_lining(value: number) {
        this._cut_length_lining = value;
    }

    get cut_length_fabric_inner(): number {
        return this._cut_length_fabric_inner;
    }

    set cut_length_fabric_inner(value: number) {
        this._cut_length_fabric_inner = value;
    }

    get pockets_total_length(): number {
        return this._pockets_total_length;
    }

    set pockets_total_length(value: number) {
        this._pockets_total_length = value;
    }
}