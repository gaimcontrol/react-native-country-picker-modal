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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryConsumer = exports.CountryProvider = exports.useContext = exports.CountryContext = exports.DEFAULT_COUNTRY_CONTEXT = void 0;
const React = __importStar(require("react"));
const CountryService_1 = require("./CountryService");
exports.DEFAULT_COUNTRY_CONTEXT = {
    translation: 'common',
    getCountryNameAsync: CountryService_1.getCountryNameAsync,
    getImageFlagAsync: CountryService_1.getImageFlagAsync,
    getEmojiFlagAsync: CountryService_1.getEmojiFlagAsync,
    getCountriesAsync: CountryService_1.getCountriesAsync,
    getCountryCallingCodeAsync: CountryService_1.getCountryCallingCodeAsync,
    getCountryCurrencyAsync: CountryService_1.getCountryCurrencyAsync,
    search: CountryService_1.search,
    getLetters: CountryService_1.getLetters,
    getCountryInfoAsync: CountryService_1.getCountryInfoAsync,
};
exports.CountryContext = React.createContext(exports.DEFAULT_COUNTRY_CONTEXT);
const useContext = () => React.useContext(exports.CountryContext);
exports.useContext = useContext;
exports.CountryProvider = exports.CountryContext.Provider, exports.CountryConsumer = exports.CountryContext.Consumer;
