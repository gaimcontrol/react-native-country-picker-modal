"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const CountryTheme_1 = require("./CountryTheme");
const styles = react_native_1.StyleSheet.create({
    container: {
        height: 48,
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
    },
});
const CloseButtonAndroid = (props) => {
    let closeImage = require('./assets/images/close.android.png');
    if (props.image) {
        closeImage = props.image;
    }
    const { onBackgroundTextColor } = (0, CountryTheme_1.useTheme)();
    return (react_1.default.createElement(react_native_1.View, { style: [styles.container, props.style] },
        react_1.default.createElement(react_native_1.TouchableNativeFeedback, { background: typeof react_native_1.Platform.Version === 'number' && react_native_1.Platform.Version < 21
                ? react_native_1.TouchableNativeFeedback.SelectableBackground()
                : react_native_1.TouchableNativeFeedback.SelectableBackgroundBorderless(), onPress: props.onPress },
            react_1.default.createElement(react_native_1.View, null,
                react_1.default.createElement(react_native_1.Image, { source: closeImage, style: [
                        styles.imageStyle,
                        props.imageStyle,
                        { tintColor: onBackgroundTextColor },
                    ] })))));
};
const CloseButtonIOS = (props) => {
    let closeImage = require('./assets/images/close.ios.png');
    if (props.image) {
        closeImage = props.image;
    }
    const { onBackgroundTextColor } = (0, CountryTheme_1.useTheme)();
    return (react_1.default.createElement(react_native_1.View, { style: [styles.container, props.style] },
        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: props.onPress },
            react_1.default.createElement(react_native_1.Image, { source: closeImage, style: [
                    styles.imageStyle,
                    props.imageStyle,
                    { tintColor: onBackgroundTextColor },
                ] }))));
};
exports.default = react_native_1.Platform.select({
    ios: CloseButtonIOS,
    android: CloseButtonAndroid,
    web: CloseButtonIOS,
    default: CloseButtonIOS,
});
