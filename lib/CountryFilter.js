"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryFilter = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const CountryTheme_1 = require("./CountryTheme");
const styles = react_native_1.StyleSheet.create({
    input: {
        height: 48,
        width: '70%',
        ...react_native_1.Platform.select({
            web: {
                outlineWidth: 0,
                outlineColor: 'transparent',
                outlineOffset: 0,
            },
        }),
    },
});
const CountryFilter = (props) => {
    const { filterPlaceholderTextColor, fontFamily, fontSize, onBackgroundTextColor, } = (0, CountryTheme_1.useTheme)();
    return (react_1.default.createElement(react_native_1.TextInput, { testID: 'text-input-country-filter', autoCorrect: false, placeholderTextColor: filterPlaceholderTextColor, style: [
            styles.input,
            { fontFamily, fontSize, color: onBackgroundTextColor },
        ], ...props }));
};
exports.CountryFilter = CountryFilter;
exports.CountryFilter.defaultProps = {
    autoFocus: false,
    placeholder: 'Enter country name',
};
