"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = exports.ThemeProvider = exports.DARK_THEME = exports.DEFAULT_THEME = void 0;
const react_theme_provider_1 = require("@callstack/react-theme-provider");
const react_native_1 = require("react-native");
const ratio_1 = require("./ratio");
exports.DEFAULT_THEME = {
    primaryColor: '#ccc',
    primaryColorVariant: '#eee',
    backgroundColor: '#ffffff',
    onBackgroundTextColor: '#000000',
    fontSize: 16,
    fontFamily: react_native_1.Platform.select({
        ios: 'System',
        android: 'Roboto',
        web: 'Arial'
    }),
    filterPlaceholderTextColor: '#aaa',
    activeOpacity: 0.5,
    itemHeight: (0, ratio_1.getHeightPercent)(7),
    flagSize: react_native_1.Platform.select({ android: 20, default: 30 }),
    flagSizeButton: react_native_1.Platform.select({ android: 20, default: 30 })
};
exports.DARK_THEME = {
    ...exports.DEFAULT_THEME,
    primaryColor: '#222',
    primaryColorVariant: '#444',
    backgroundColor: '#000',
    onBackgroundTextColor: '#fff'
};
const { ThemeProvider, useTheme } = (0, react_theme_provider_1.createTheming)(exports.DEFAULT_THEME);
exports.ThemeProvider = ThemeProvider;
exports.useTheme = useTheme;
