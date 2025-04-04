"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryInfoAsync = exports.getLetters = exports.search = exports.getCountriesAsync = exports.getCountryCurrencyAsync = exports.getCountryCallingCodeAsync = exports.getCountryNameAsync = exports.getImageFlagAsync = exports.getEmojiFlagAsync = exports.loadDataAsync = void 0;
const types_1 = require("./types");
const fuse_js_1 = __importDefault(require("fuse.js"));
const imageJsonUrl = 'https://xcarpentier.github.io/react-native-country-picker-modal/countries/';
const localData = {
    emojiCountries: undefined,
    imageCountries: undefined,
};
exports.loadDataAsync = ((data) => (dataType = types_1.FlagType.EMOJI) => {
    return new Promise((resolve, reject) => {
        switch (dataType) {
            case types_1.FlagType.FLAT:
                if (!data.imageCountries) {
                    fetch(imageJsonUrl)
                        .then((response) => response.json())
                        .then((remoteData) => {
                        data.imageCountries = remoteData;
                        resolve(data.imageCountries);
                    })
                        .catch(reject);
                }
                else {
                    resolve(data.imageCountries);
                }
                break;
            default:
                if (!data.emojiCountries) {
                    data.emojiCountries = require('./assets/data/countries-emoji.json');
                    resolve(data.emojiCountries);
                }
                else {
                    resolve(data.emojiCountries);
                }
                break;
        }
    });
})(localData);
const getEmojiFlagAsync = async (countryCode = 'FR') => {
    const countries = await (0, exports.loadDataAsync)();
    if (!countries) {
        throw new Error('Unable to find emoji because emojiCountries is undefined');
    }
    return countries[countryCode].flag;
};
exports.getEmojiFlagAsync = getEmojiFlagAsync;
const getImageFlagAsync = async (countryCode = 'FR') => {
    const countries = await (0, exports.loadDataAsync)(types_1.FlagType.FLAT);
    if (!countries) {
        throw new Error('Unable to find image because imageCountries is undefined');
    }
    return countries[countryCode].flag;
};
exports.getImageFlagAsync = getImageFlagAsync;
const getCountryNameAsync = async (countryCode = 'FR', translation = 'common') => {
    const countries = await (0, exports.loadDataAsync)();
    if (!countries) {
        throw new Error('Unable to find image because imageCountries is undefined');
    }
    return countries[countryCode].name
        ? countries[countryCode].name[translation]
        : countries[countryCode].name['common'];
};
exports.getCountryNameAsync = getCountryNameAsync;
const getCountryCallingCodeAsync = async (countryCode) => {
    const countries = await (0, exports.loadDataAsync)();
    if (!countries) {
        throw new Error('Unable to find image because imageCountries is undefined');
    }
    return countries[countryCode].callingCode[0];
};
exports.getCountryCallingCodeAsync = getCountryCallingCodeAsync;
const getCountryCurrencyAsync = async (countryCode) => {
    const countries = await (0, exports.loadDataAsync)();
    if (!countries) {
        throw new Error('Unable to find image because imageCountries is undefined');
    }
    return countries[countryCode].currency[0];
};
exports.getCountryCurrencyAsync = getCountryCurrencyAsync;
const isCountryPresent = (countries) => (countryCode) => !!countries[countryCode];
const isRegion = (region) => (country) => region ? country.region === region : true;
const isSubregion = (subregion) => (country) => subregion ? country.subregion === subregion : true;
const isIncluded = (countryCodes) => (country) => countryCodes && countryCodes.length > 0
    ? countryCodes.includes(country.cca2)
    : true;
const isExcluded = (excludeCountries) => (country) => excludeCountries && excludeCountries.length > 0
    ? !excludeCountries.includes(country.cca2)
    : true;
const getCountriesAsync = async (flagType, translation = 'common', region, subregion, countryCodes, excludeCountries, preferredCountries, withAlphaFilter) => {
    const countriesRaw = await (0, exports.loadDataAsync)(flagType);
    if (!countriesRaw) {
        return [];
    }
    if (preferredCountries && !withAlphaFilter) {
        const newCountryCodeList = [
            ...preferredCountries,
            ...types_1.CountryCodeList.filter((code) => !preferredCountries.includes(code)),
        ];
        const countries = newCountryCodeList
            .filter(isCountryPresent(countriesRaw))
            .map((cca2) => ({
            ...{
                ...countriesRaw[cca2],
                name: countriesRaw[cca2].name[translation] ||
                    countriesRaw[cca2].name['common'],
            },
            cca2,
        }))
            .filter(isRegion(region))
            .filter(isSubregion(subregion))
            .filter(isIncluded(countryCodes))
            .filter(isExcluded(excludeCountries));
        return countries;
    }
    else {
        const countries = types_1.CountryCodeList.filter(isCountryPresent(countriesRaw))
            .map((cca2) => ({
            ...{
                ...countriesRaw[cca2],
                name: countriesRaw[cca2].name[translation] ||
                    countriesRaw[cca2].name['common'],
            },
            cca2,
        }))
            .filter(isRegion(region))
            .filter(isSubregion(subregion))
            .filter(isIncluded(countryCodes))
            .filter(isExcluded(excludeCountries))
            .sort((country1, country2) => country1.name.localeCompare(country2.name));
        return countries;
    }
};
exports.getCountriesAsync = getCountriesAsync;
const DEFAULT_FUSE_OPTION = {
    shouldSort: true,
    threshold: 0.3,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['name', 'cca2', 'callingCode'],
};
let fuse;
const search = (filter = '', data = [], options = DEFAULT_FUSE_OPTION) => {
    if (data.length === 0) {
        return [];
    }
    if (!fuse) {
        fuse = new fuse_js_1.default(data, options);
    }
    if (filter && filter !== '') {
        const result = fuse.search(filter);
        return result;
    }
    else {
        return data;
    }
};
exports.search = search;
const uniq = (arr) => Array.from(new Set(arr));
const getLetters = (countries) => {
    return uniq(countries
        .map((country) => country.name.substr(0, 1).toLocaleUpperCase())
        .sort((l1, l2) => l1.localeCompare(l2)));
};
exports.getLetters = getLetters;
const getCountryInfoAsync = async ({ countryCode, translation, }) => {
    const countryName = await (0, exports.getCountryNameAsync)(countryCode, translation || 'common');
    const currency = await (0, exports.getCountryCurrencyAsync)(countryCode);
    const callingCode = await (0, exports.getCountryCallingCodeAsync)(countryCode);
    return { countryName, currency, callingCode };
};
exports.getCountryInfoAsync = getCountryInfoAsync;
