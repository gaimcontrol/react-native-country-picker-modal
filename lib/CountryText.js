"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryText = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const CountryTheme_1 = require("./CountryTheme");
const CountryText = (props) => {
    const { fontFamily, fontSize, onBackgroundTextColor } = (0, CountryTheme_1.useTheme)();
    return (react_1.default.createElement(react_native_1.Text, { ...props, style: { fontFamily, fontSize, color: onBackgroundTextColor } }));
};
exports.CountryText = CountryText;
