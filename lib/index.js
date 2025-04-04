"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryModalProvider = exports.HeaderModal = exports.Flag = exports.FlagButton = exports.CountryList = exports.CountryFilter = exports.DEFAULT_THEME = exports.DARK_THEME = exports.CountryModal = exports.getCallingCode = exports.getAllCountries = void 0;
const react_1 = __importDefault(require("react"));
const CountryContext_1 = require("./CountryContext");
const CountryTheme_1 = require("./CountryTheme");
const CountryPicker_1 = require("./CountryPicker");
const Main = ({ theme, translation, ...props }) => {
    return (react_1.default.createElement(CountryTheme_1.ThemeProvider, { theme: { ...CountryTheme_1.DEFAULT_THEME, ...theme } },
        react_1.default.createElement(CountryContext_1.CountryProvider, { value: { ...CountryContext_1.DEFAULT_COUNTRY_CONTEXT, translation } },
            react_1.default.createElement(CountryPicker_1.CountryPicker, { ...props }))));
};
Main.defaultProps = {
    onSelect: () => { },
    withEmoji: true,
};
exports.default = Main;
var CountryService_1 = require("./CountryService");
Object.defineProperty(exports, "getAllCountries", { enumerable: true, get: function () { return CountryService_1.getCountriesAsync; } });
Object.defineProperty(exports, "getCallingCode", { enumerable: true, get: function () { return CountryService_1.getCountryCallingCodeAsync; } });
var CountryModal_1 = require("./CountryModal");
Object.defineProperty(exports, "CountryModal", { enumerable: true, get: function () { return CountryModal_1.CountryModal; } });
var CountryTheme_2 = require("./CountryTheme");
Object.defineProperty(exports, "DARK_THEME", { enumerable: true, get: function () { return CountryTheme_2.DARK_THEME; } });
Object.defineProperty(exports, "DEFAULT_THEME", { enumerable: true, get: function () { return CountryTheme_2.DEFAULT_THEME; } });
var CountryFilter_1 = require("./CountryFilter");
Object.defineProperty(exports, "CountryFilter", { enumerable: true, get: function () { return CountryFilter_1.CountryFilter; } });
var CountryList_1 = require("./CountryList");
Object.defineProperty(exports, "CountryList", { enumerable: true, get: function () { return CountryList_1.CountryList; } });
var FlagButton_1 = require("./FlagButton");
Object.defineProperty(exports, "FlagButton", { enumerable: true, get: function () { return FlagButton_1.FlagButton; } });
var Flag_1 = require("./Flag");
Object.defineProperty(exports, "Flag", { enumerable: true, get: function () { return Flag_1.Flag; } });
var HeaderModal_1 = require("./HeaderModal");
Object.defineProperty(exports, "HeaderModal", { enumerable: true, get: function () { return HeaderModal_1.HeaderModal; } });
var CountryModalProvider_1 = require("./CountryModalProvider");
Object.defineProperty(exports, "CountryModalProvider", { enumerable: true, get: function () { return CountryModalProvider_1.CountryModalProvider; } });
__exportStar(require("./types"), exports);
