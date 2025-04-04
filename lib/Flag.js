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
exports.Flag = void 0;
const react_1 = __importStar(require("react"));
const Emoji_1 = require("./Emoji");
const CountryContext_1 = require("./CountryContext");
const react_async_hook_1 = require("react-async-hook");
const react_native_1 = require("react-native");
const styles = react_native_1.StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        marginRight: 10,
    },
    emojiFlag: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1 / react_native_1.PixelRatio.get(),
        borderColor: 'transparent',
        backgroundColor: 'transparent',
    },
    imageFlag: {
        resizeMode: 'contain',
        width: 25,
        height: 19,
        borderWidth: 1 / react_native_1.PixelRatio.get(),
        opacity: 0.8,
    },
});
const ImageFlag = (0, react_1.memo)(({ countryCode, flagSize }) => {
    const { getImageFlagAsync } = (0, CountryContext_1.useContext)();
    const asyncResult = (0, react_async_hook_1.useAsync)(getImageFlagAsync, [countryCode]);
    if (asyncResult.loading) {
        return react_1.default.createElement(react_native_1.ActivityIndicator, { size: 'small' });
    }
    return (react_1.default.createElement(react_native_1.Image, { resizeMode: 'contain', style: [
            styles.imageFlag,
            { borderColor: 'transparent', height: flagSize },
        ], source: { uri: asyncResult.result } }));
});
const EmojiFlag = (0, react_1.memo)(({ countryCode, flagSize }) => {
    const { getEmojiFlagAsync } = (0, CountryContext_1.useContext)();
    const asyncResult = (0, react_async_hook_1.useAsync)(getEmojiFlagAsync, [countryCode]);
    if (asyncResult.loading) {
        return react_1.default.createElement(react_native_1.ActivityIndicator, { size: 'small' });
    }
    return (react_1.default.createElement(react_native_1.Text, { style: [styles.emojiFlag, { fontSize: flagSize }], allowFontScaling: false },
        react_1.default.createElement(Emoji_1.Emoji, { name: asyncResult.result })));
});
const Flag = ({ countryCode, withEmoji, withFlagButton, flagSize, }) => withFlagButton ? (react_1.default.createElement(react_native_1.View, { style: styles.container }, withEmoji ? (react_1.default.createElement(EmojiFlag, { countryCode, flagSize })) : (react_1.default.createElement(ImageFlag, { countryCode, flagSize })))) : null;
exports.Flag = Flag;
exports.Flag.defaultProps = {
    withEmoji: true,
    withFlagButton: true,
};
