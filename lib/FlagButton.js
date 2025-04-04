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
exports.FlagButton = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const Flag_1 = require("./Flag");
const CountryContext_1 = require("./CountryContext");
const CountryText_1 = require("./CountryText");
const CountryTheme_1 = require("./CountryTheme");
const styles = react_native_1.StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    containerWithEmoji: {
        marginTop: 0,
    },
    containerWithoutEmoji: {
        marginTop: 5,
    },
    flagWithSomethingContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    something: { fontSize: 16 },
});
const FlagText = (props) => (react_1.default.createElement(CountryText_1.CountryText, { ...props, style: styles.something }));
const FlagWithSomething = (0, react_1.memo)(({ allowFontScaling, countryCode, withEmoji, withCountryNameButton, withCurrencyButton, withCallingCodeButton, withFlagButton, flagSize, placeholder, }) => {
    const { translation, getCountryInfoAsync } = (0, CountryContext_1.useContext)();
    const [state, setState] = (0, react_1.useState)({
        countryName: '',
        currency: '',
        callingCode: '',
    });
    const { countryName, currency, callingCode } = state;
    (0, react_1.useEffect)(() => {
        if (countryCode) {
            getCountryInfoAsync({ countryCode, translation })
                .then(setState)
                .catch(console.warn);
        }
    }, [
        countryCode,
        withCountryNameButton,
        withCurrencyButton,
        withCallingCodeButton,
    ]);
    return (react_1.default.createElement(react_native_1.View, { style: styles.flagWithSomethingContainer },
        countryCode ? (react_1.default.createElement(Flag_1.Flag, { withEmoji, countryCode, withFlagButton, flagSize })) : (react_1.default.createElement(FlagText, { allowFontScaling: allowFontScaling }, placeholder)),
        withCountryNameButton && countryName ? (react_1.default.createElement(FlagText, { allowFontScaling: allowFontScaling }, countryName + ' ')) : null,
        withCurrencyButton && currency ? (react_1.default.createElement(FlagText, { allowFontScaling: allowFontScaling }, `(${currency}) `)) : null,
        withCallingCodeButton && callingCode ? (react_1.default.createElement(FlagText, { allowFontScaling: allowFontScaling }, `+${callingCode}`)) : null));
});
const FlagButton = ({ allowFontScaling, withEmoji, withCountryNameButton, withCallingCodeButton, withCurrencyButton, withFlagButton, countryCode, containerButtonStyle, onOpen, placeholder, }) => {
    const { flagSizeButton: flagSize } = (0, CountryTheme_1.useTheme)();
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { activeOpacity: 0.7, onPress: onOpen },
        react_1.default.createElement(react_native_1.View, { style: [
                styles.container,
                withEmoji ? styles.containerWithEmoji : styles.containerWithoutEmoji,
                containerButtonStyle,
            ] },
            react_1.default.createElement(FlagWithSomething, { allowFontScaling,
                countryCode,
                withEmoji,
                withCountryNameButton,
                withCallingCodeButton,
                withCurrencyButton,
                withFlagButton,
                flagSize: flagSize,
                placeholder }))));
};
exports.FlagButton = FlagButton;
exports.FlagButton.defaultProps = {
    withEmoji: true,
    withCountryNameButton: false,
    withCallingCodeButton: false,
    withCurrencyButton: false,
    withFlagButton: true,
};
